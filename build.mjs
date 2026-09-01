#!/usr/bin/env node
// ---------------------------------------------------------------------------
// Static site build. No dependencies — plain Node ESM.
//
//   node build.mjs            build to dist/
//   node build.mjs --serve    build, then serve dist/ on :4173
//   node build.mjs --watch    rebuild on source change (pairs with --serve)
// ---------------------------------------------------------------------------

import { readdir, readFile, writeFile, mkdir, rm, rmdir, copyFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { extname, join, dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { watch } from 'node:fs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, 'src');
const OUT = join(ROOT, 'dist');

const argv = new Set(process.argv.slice(2));
const WATCH = argv.has('--watch');
const SERVE = argv.has('--serve');
const PORT = Number(process.env.PORT || 4173);

// --- old WordPress URLs -> new URLs (301) ----------------------------------

function redirectMap(makes, services) {
  const map = new Map([['/service/', '/services/']]);
  for (const s of services) map.set(`/service/${s.slug}/`, `/services/${s.slug}/`);
  for (const m of makes) map.set(`/service-repair-${m.slug}/`, `/vehicles-we-service/${m.slug}/`);
  // /appointments/, /specials/, /rebates/, /reviews/, /contact/, /privacy-policy/
  // and /sitemap/ keep their original paths, so they need no redirect.

  // Guard against self-redirects, which loop.
  for (const [from, to] of map) if (from === to) map.delete(from);
  return map;
}

// --- build -----------------------------------------------------------------

async function build() {
  const t0 = Date.now();

  // cache-bust module graph so --watch picks up edits
  const bust = `?t=${Date.now()}`;
  const { site, makes, services } = await import(pathToFileURL(join(SRC, 'data/site.js')).href + bust);
  const { layout } = await import(pathToFileURL(join(SRC, 'templates/layout.js')).href + bust);
  const pages = (await import(pathToFileURL(join(SRC, 'pages.js')).href + bust)).default;

  // Content-hashed CSS/JS filenames. Without these, a cached stylesheet can be
  // paired with newly deployed HTML and the page renders unstyled until the
  // cache expires -- which is exactly what happened on the first Vercel deploy.
  const hashOf = async (f) =>
    createHash('sha256').update(await readFile(f)).digest('hex').slice(0, 10);
  const cssHash = await hashOf(join(SRC, 'assets/css/site.css'));
  const jsHash = await hashOf(join(SRC, 'assets/js/site.js'));
  const CSS_HREF = `/assets/css/site.${cssHash}.css`;
  const JS_SRC = `/assets/js/site.${jsHash}.js`;

  // Every file this pass produces. Anything already in dist/ and absent from
  // this set is pruned at the end. We deliberately do NOT rm -rf dist/ first:
  // on Windows the dev server holds handles inside it, and a wholesale delete
  // leaves the site briefly (or, if a concurrent build interleaves, durably)
  // empty.
  const written = new Set();

  const emit = async (file, data) => {
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, data);
    written.add(resolve(file));
  };

  await mkdir(OUT, { recursive: true });

  // 1. pages
  for (const p of pages) {
    const html = layout(p)
      .split('/assets/css/site.css').join(CSS_HREF)
      .split('/assets/js/site.js').join(JS_SRC);
    const file = p.path.endsWith('.html')
      ? join(OUT, p.path)
      : join(OUT, p.path, 'index.html');
    await emit(file, html);
  }

  // 2. assets — copy only what changed, so the server keeps serving the rest
  const copyTree = async (from, to) => {
    for (const entry of await readdir(from, { withFileTypes: true })) {
      const src = join(from, entry.name);
      const dst = join(to, entry.name);
      if (entry.isDirectory()) {
        await copyTree(src, dst);
        continue;
      }
      // the hashed copies are emitted separately, below
      if (dst.endsWith(join('assets', 'css', 'site.css')) ||
          dst.endsWith(join('assets', 'js', 'site.js'))) continue;
      const [a, b] = await Promise.all([stat(src), stat(dst).catch(() => null)]);
      if (!b || b.mtimeMs < a.mtimeMs || b.size !== a.size) {
        await mkdir(dirname(dst), { recursive: true });
        await copyFile(src, dst);
      }
      written.add(resolve(dst));
    }
  };
  await copyTree(join(SRC, 'assets'), join(OUT, 'assets'));
  await emit(join(OUT, 'assets/css', `site.${cssHash}.css`), await readFile(join(SRC, 'assets/css/site.css')));
  await emit(join(OUT, 'assets/js', `site.${jsHash}.js`), await readFile(join(SRC, 'assets/js/site.js')));

  // 3. sitemap.xml
  const today = new Date().toISOString().slice(0, 10);
  const indexable = pages.filter((p) => !p.noindex);
  const priority = (path) =>
    path === '/' ? '1.0'
      : /^\/(services|vehicles-we-service|appointments)\/$/.test(path) ? '0.9'
      : /^\/(specials|rebates|reviews|contact)\/$/.test(path) ? '0.8'
      : path.split('/').filter(Boolean).length > 1 ? '0.7'
      : '0.5';

  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    indexable
      .map(
        (p) =>
          `  <url>\n    <loc>${site.origin}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority(p.path)}</priority>\n  </url>`
      )
      .join('\n') +
    `\n</urlset>\n`;
  await emit(join(OUT, 'sitemap.xml'), sitemap);

  // 4. robots.txt
  await emit(join(OUT, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`);

  // 5. redirects, in the two formats most hosts want
  const redirects = redirectMap(makes, services);
  const netlify = [...redirects].map(([from, to]) => `${from}  ${to}  301!`).join('\n');
  await emit(join(OUT, '_redirects'), netlify + '\n');

  const htaccess =
    `# 301 redirects from the previous WordPress URLs\n` +
    `<IfModule mod_rewrite.c>\n  RewriteEngine On\n` +
    [...redirects]
      .map(([from, to]) => `  RewriteRule ^${from.slice(1).replace(/\/$/, '')}/?$ ${to} [R=301,L]`)
      .join('\n') +
    `\n</IfModule>\n\nErrorDocument 404 /404.html\n`;
  await emit(join(OUT, '.htaccess'), htaccess);

  // Vercel reads vercel.json from the REPOSITORY ROOT, never from the output
  // directory, so this one is written to ROOT (and committed) rather than to
  // dist/. Written outside OUT, it is also untouched by prune().
  //
  // No cleanUrls: every page is already <dir>/index.html, and combining it with
  // trailingSlash produces redirect loops on some paths.
  await writeFile(
    join(ROOT, 'vercel.json'),
    JSON.stringify(
      {
        $schema: 'https://openapi.vercel.sh/vercel.json',
        buildCommand: 'npm run build',
        outputDirectory: 'dist',
        trailingSlash: true,
        redirects: [...redirects].map(([source, destination]) => ({ source, destination, permanent: true })),
        headers: [
          {
            // Everything under css/ and js/ carries a content hash in its
            // filename, so pinning it is safe: a change produces a new URL.
            source: '/assets/css/(.*)',
            headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
          },
          {
            source: '/assets/js/(.*)',
            headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
          },
          {
            // Images are not hashed: keep them revalidating so a replaced photo
            // cannot linger, and so HTML can never outrun its assets again.
            source: '/assets/img/(.*)',
            headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }],
          },
        ],
      },
      null,
      2
    ) + '\n',
    'utf8'
  );


  // 6. prune anything left over from a previous build
  await prune(OUT, written);
  const bytes = await dirSize(OUT);
  console.log(
    `built ${pages.length} pages + ${redirects.size} redirects -> dist/ ` +
      `(${(bytes / 1024).toFixed(0)} KB) in ${Date.now() - t0}ms`
  );
  return pages.length;
}

/**
 * Delete every file under `dir` that this build pass did not produce, then
 * remove the directories left empty. Replaces `rm -rf dist` so the output
 * directory is never momentarily empty and never fights the dev server for
 * handles on Windows.
 */
async function prune(dir, keep) {
  let kept = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      kept += await prune(p, keep);
      continue;
    }
    if (keep.has(resolve(p))) kept++;
    else await rm(p, { force: true });
  }
  if (kept === 0 && resolve(dir) !== resolve(OUT)) {
    await rmdir(dir).catch(() => {});
  }
  return kept;
}

async function dirSize(dir) {
  let total = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    total += entry.isDirectory() ? await dirSize(p) : (await stat(p)).size;
  }
  return total;
}

// --- dev server ------------------------------------------------------------

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

function serve() {
  createServer(async (req, res) => {
    try {
      const url = decodeURIComponent(req.url.split('?')[0]);
      let file = join(OUT, url);
      if (!resolve(file).startsWith(resolve(OUT))) {
        res.writeHead(403).end('Forbidden');
        return;
      }
      if (url.endsWith('/')) file = join(file, 'index.html');
      let body;
      try {
        body = await readFile(file);
      } catch {
        try {
          body = await readFile(join(file, 'index.html'));
          file += '/index.html';
        } catch {
          res.writeHead(404, { 'content-type': MIME['.html'] });
          res.end(await readFile(join(OUT, '404.html')).catch(() => 'Not found'));
          return;
        }
      }
      res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
      res.end(body);
    } catch (err) {
      res.writeHead(500).end(String(err));
    }
  }).listen(PORT, () => console.log(`serving dist/ -> http://localhost:${PORT}`));
}

// --- run -------------------------------------------------------------------

// Builds are serialised: two passes writing and pruning dist/ at the same time
// will delete each other's output. A change arriving mid-build sets a flag and
// runs exactly one more pass afterwards.
let building = null;
let queued = false;

function schedule() {
  if (building) {
    queued = true;
    return building;
  }
  building = build()
    .catch((e) => console.error('build failed:', e.message))
    .finally(() => {
      building = null;
      if (queued) {
        queued = false;
        schedule();
      }
    });
  return building;
}

await schedule();
if (SERVE) serve();
if (WATCH) {
  let timer = null;
  watch(SRC, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(schedule, 120);
  });
  console.log('watching src/ for changes');
}
