/* =====================================================
   IPI MISSION BIBLE COLLEGE — Main JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollReveal();
  initFAQ();
  initTestimonialSlider();
  initBackToTop();
  initCounterAnimation();
  initSmoothScroll();
});

/* =====================================================
   1. STICKY HEADER
   ===================================================== */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* =====================================================
   2. MOBILE MENU
   ===================================================== */
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      toggle.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* =====================================================
   3. SMOOTH SCROLL
   ===================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* =====================================================
   4. SCROLL REVEAL ANIMATIONS
   ===================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* =====================================================
   5. FAQ ACCORDION
   ===================================================== */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      items.forEach(i => {
        i.classList.remove('active');
        const a = i.querySelector('.faq-answer');
        if (a) a.style.maxHeight = null;
      });

      // Open clicked if it was closed
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* =====================================================
   6. TESTIMONIAL SLIDER
   ===================================================== */
function initTestimonialSlider() {
  const track = document.querySelector('.testimonials-track');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');
  const dots = document.querySelectorAll('.testimonial-dot');

  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  let currentIndex = 0;
  let slidesPerView = 1;
  let autoSlideInterval;

  function updateSlidesPerView() {
    slidesPerView = window.innerWidth >= 1024 ? 2 : 1;
  }

  function getMaxIndex() {
    return Math.max(0, cards.length - slidesPerView);
  }

  function goToSlide(index) {
    const maxIndex = getMaxIndex();
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    const percent = currentIndex * (100 / slidesPerView);
    track.style.transform = `translateX(-${percent}%)`;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function nextSlide() {
    const maxIndex = getMaxIndex();
    goToSlide(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  }

  function prevSlide() {
    const maxIndex = getMaxIndex();
    goToSlide(currentIndex <= 0 ? maxIndex : currentIndex - 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoSlide(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoSlide(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goToSlide(i); startAutoSlide(); });
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoSlide();
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    startAutoSlide();
  }, { passive: true });

  window.addEventListener('resize', () => {
    updateSlidesPerView();
    goToSlide(currentIndex);
  });

  updateSlidesPerView();
  goToSlide(0);
  startAutoSlide();
}

/* =====================================================
   7. BACK TO TOP
   ===================================================== */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =====================================================
   8. COUNTER ANIMATION
   ===================================================== */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    el.textContent = current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
