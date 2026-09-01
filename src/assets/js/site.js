/* Well Done Worx — progressive enhancement only. The site works without it. */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- current year ---------------------------------------------------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---- mobile drawer --------------------------------------------------- */
  /* #drawer is a sibling of <header>, not a descendant: nesting a fixed panel
     inside the sticky header made WebKit clip it to the header box. */
  var burger = $('#burger');
  var drawer = $('#drawer');

  function setNav(open) {
    if (!burger || !drawer) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    drawer.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    if (open) {
      var close = drawer.querySelector('.drawer-close');
      if (close) close.focus();
    } else if (document.activeElement && drawer.contains(document.activeElement)) {
      burger.focus();
    }
  }
  var closeNav = function () { setNav(false); };

  if (burger && drawer) {
    burger.addEventListener('click', function () {
      setNav(burger.getAttribute('aria-expanded') !== 'true');
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a') || e.target.closest('[data-close]')) closeNav();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) closeNav(); });
  }

  /* ---- header shadow on scroll ---------------------------------------- */
  var head = $('#siteHead');
  if (head) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        head.classList.toggle('is-stuck', window.scrollY > 8);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- "open now" indicator ------------------------------------------- */
  (function () {
    var el = $('[data-openstate] span');
    if (!el) return;
    var now = new Date();
    var day = now.getDay();                       // 0 Sun .. 6 Sat
    var mins = now.getHours() * 60 + now.getMinutes();
    var weekday = day >= 1 && day <= 5;
    var open = weekday && mins >= 480 && mins < 990; // 08:00 – 16:30

    if (open) {
      el.textContent = 'Open now until 4:30pm';
    } else if (weekday && mins < 480) {
      el.textContent = 'Opens today at 8:00am';
    } else if (day === 6 || day === 0) {
      el.textContent = 'Closed weekends · opens Monday 8:00am';
    } else {
      el.textContent = day === 5 ? 'Closed · opens Monday 8:00am' : 'Closed · opens tomorrow 8:00am';
    }
  })();

  /* ---- prefill service / vehicle from the query string ----------------- */
  (function () {
    var q = new URLSearchParams(location.search);
    var svc = q.get('service');
    var veh = q.get('vehicle');
    if (svc) {
      var sel = $('#appt-service');
      if (sel) {
        var hit = Array.prototype.find.call(sel.options, function (o) { return o.value === svc; });
        if (hit) sel.value = svc;
      }
    }
    if (veh) {
      var v = $('#appt-vehicle');
      if (v && !v.value) { v.value = veh + ' '; v.placeholder = veh + ' — year and model?'; }
    }
  })();

  /* ---- form validation + submit ---------------------------------------- */
  var RULES = {
    name: function (v) { return v.trim().length >= 2 || 'Please tell us your name.'; },
    phone: function (v) { return (v.replace(/\D/g, '').length >= 10) || 'Please enter a 10-digit phone number.'; },
    email: function (v) { return v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'That email address does not look right.'; }
  };

  function validateField(input) {
    var rule = RULES[input.name];
    var slot = input.parentElement.querySelector('[data-err]');
    if (!rule) return true;
    var res = rule(input.value);
    var ok = res === true;
    input.setAttribute('aria-invalid', ok ? 'false' : 'true');
    if (slot) {
      slot.textContent = ok ? '' : res;
      slot.classList.toggle('is-shown', !ok);
    }
    return ok;
  }

  $$('form.form').forEach(function (form) {
    var status = form.querySelector('[data-status]');

    $$('input, textarea', form).forEach(function (input) {
      input.addEventListener('blur', function () { if (input.value) validateField(input); });
      input.addEventListener('input', function () {
        if (input.getAttribute('aria-invalid') === 'true') validateField(input);
      });
    });

    function say(msg, kind) {
      if (!status) return;
      status.innerHTML = msg;
      status.className = 'form-status ' + kind;
      status.hidden = false;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var fields = $$('input, textarea', form).filter(function (i) { return RULES[i.name]; });
      var bad = fields.filter(function (i) { return !validateField(i); });
      if (bad.length) {
        bad[0].focus();
        say('Please fix the highlighted fields and try again.', 'is-bad');
        return;
      }
      if (form.company && form.company.value) return; // honeypot

      var btn = form.querySelector('button[type="submit"]');
      var label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      var endpoint = form.dataset.endpoint || '/';
      var body = new URLSearchParams(new FormData(form)).toString();

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
        body: body
      })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          form.reset();
          say('<strong>Thank you.</strong> Your request is in. We will call or email during shop hours to confirm a time.', 'is-ok');
          if (status) status.focus && status.focus();
        })
        .catch(function () {
          say(
            'We could not send that from here. Please call us on ' +
              '<a href="tel:+15598013460">(559) 801-3460</a> and we will get you booked in.',
            'is-bad'
          );
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = label; }
        });
    });
  });

  /* ---- reveal on scroll ------------------------------------------------ */
  (function () {
    if (!('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var targets = $$('.sec-head, .card, .why-list li, .steps li, .amenities li, .offer-card');
    if (!targets.length) return;

    targets.forEach(function (el) { el.setAttribute('data-reveal', ''); });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    targets.forEach(function (el) { io.observe(el); });

    // anything already on screen at load should not wait for a scroll
    requestAnimationFrame(function () {
      targets.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in');
      });
    });
  })();
})();
