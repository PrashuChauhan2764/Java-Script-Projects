// ===== Lucky Children Public School — site script =====

document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  /* Footer year */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Gallery filter ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.getAttribute('data-filter');
        galleryItems.forEach(function (item) {
          if (cat === 'all' || item.getAttribute('data-cat') === cat) {
            item.hidden = false;
          } else {
            item.hidden = true;
          }
        });
      });
    });
  }

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbFrame = lightbox.querySelector('.lightbox-frame');
    var lbCap = lightbox.querySelector('.lightbox-cap');
    var closeBtn = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        var inner = item.querySelector('.tile-visual');
        var caption = item.getAttribute('data-caption') || '';
        lbFrame.innerHTML = inner ? inner.outerHTML : '';
        lbCap.textContent = caption;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ---------- Contact form validation ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    var successMsg = document.getElementById('form-success');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      var fields = [
        { id: 'name', check: function (v) { return v.trim().length > 1; } },
        { id: 'email', check: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } },
        { id: 'phone', check: function (v) { return /^[0-9+\-\s]{7,15}$/.test(v.trim()); } },
        { id: 'message', check: function (v) { return v.trim().length > 5; } }
      ];

      fields.forEach(function (f) {
        var input = document.getElementById(f.id);
        if (!input) return;
        var group = input.closest('.form-group');
        if (!f.check(input.value)) {
          group.classList.add('error');
          valid = false;
        } else {
          group.classList.remove('error');
        }
      });

      if (valid) {
        successMsg.classList.add('show');
        form.reset();
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function () { successMsg.classList.remove('show'); }, 6000);
      } else {
        successMsg.classList.remove('show');
      }
    });
  }

  /* ---------- Reveal-on-scroll (subtle) ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  }
});
