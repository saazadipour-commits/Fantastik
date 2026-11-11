/* ============================================
   LUXORA — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  /* ============ 1. NAVBAR SCROLL EFFECT ============ */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run on page load


  /* ============ 2. SCROLL REVEAL ANIMATION ============ */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));


  /* ============ 3. SMOOTH SCROLL FOR NAV LINKS ============ */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });


  /* ============ 4. NEWSLETTER FORM ============ */
  const newsletterForm = document.querySelector('.newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const input = newsletterForm.querySelector('input');
      const button = newsletterForm.querySelector('button');
      const email = input.value.trim();

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        button.textContent = 'Invalid email ✗';
        button.style.background = 'linear-gradient(135deg, #d84a4a, #a82828)';

        setTimeout(() => {
          button.textContent = 'Subscribe';
          button.style.background = '';
        }, 2000);
        return;
      }

      // Success feedback
      button.textContent = 'Subscribed ✓';
      button.style.background = 'linear-gradient(135deg, #4ad86b, #28a848)';
      input.value = '';

      setTimeout(() => {
        button.textContent = 'Subscribe';
        button.style.background = '';
      }, 3000);
    });
  }


  /* ============ 5. HERO SEARCH BAR ============ */
  const heroSearch = document.querySelector('.hero-search');

  if (heroSearch) {
    const searchInput = heroSearch.querySelector('input');
    const searchButton = heroSearch.querySelector('button');

    function performSearch() {
      const query = searchInput.value.trim();
      if (!query) {
        searchInput.focus();
        return;
      }

      // Visual feedback (replace with real search logic)
      searchButton.textContent = 'Searching…';
      searchButton.disabled = true;

      setTimeout(() => {
        searchButton.textContent = 'Search';
        searchButton.disabled = false;
        console.log('Searching for:', query);
        // TODO: connect to your backend / search page
      }, 900);
    }

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
      }
    });
  }


  /* ============ 6. ANIMATED COUNTERS (Stats Section) ============ */
  const statNumbers = document.querySelectorAll('.stat h3');

  function animateCounter(el) {
    const originalText = el.textContent;
    const numericMatch = originalText.match(/[\d.]+/);

    if (!numericMatch) return;

    const targetValue = parseFloat(numericMatch[0]);
    const suffix = originalText.replace(numericMatch[0], '');
    const duration = 1800;
    const startTime = performance.now();
    const isDecimal = numericMatch[0].includes('.');

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      const currentValue = targetValue * eased;

      el.textContent = (isDecimal ? currentValue.toFixed(1) : Math.floor(currentValue)) + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = originalText;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => counterObserver.observe(stat));


  /* ============ 7. CART BUTTON (placeholder) ============ */
  const cartButton = document.querySelector('.icon-btn[aria-label="Cart"]');

  if (cartButton) {
    cartButton.addEventListener('click', () => {
      // Placeholder for cart drawer
      cartButton.style.transform = 'scale(0.9)';
      setTimeout(() => {
        cartButton.style.transform = '';
      }, 150);
    });
  }


  /* ============ 8. PRODUCT CARD TILT EFFECT (subtle) ============ */
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ============ 9. LOG ============ */
  console.log('%c LUXORA ', 'background: linear-gradient(135deg, #f4e4a6, #d4af37); color: #0a0a0a; font-size: 16px; font-weight: bold; padding: 6px 14px; border-radius: 4px;');
  console.log('%c The World\'s Most Exclusive Marketplace ', 'color: #d4af37; font-size: 12px; letter-spacing: 2px;');

})();
