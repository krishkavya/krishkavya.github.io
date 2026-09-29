// Portfolio Interactive Scripts for Kavya Krishnan

document.addEventListener('DOMContentLoaded', () => {
  // 1. Typing effect for hero headline
  const phrases = [
    "Software Engineer @ Schneider Electric",
    "Microservices & Distributed Systems",
    "Large-Scale Telemetry & Cloud Platforms",
    "FOSS@Amrita Alum & Open Source Contributor",
    "Java, Spring Boot & Azure Developer"
  ];
  
  const typingElement = document.getElementById('typing-text');
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 90;

  function typeEffect() {
    if (!typingElement) return;
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 40;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingDelay = 1800; // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingDelay = 400; // Pause before typing next phrase
    }

    setTimeout(typeEffect, typingDelay);
  }
  typeEffect();

  // 2. Theme Toggle (Dark / Light)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIconDark = document.getElementById('theme-icon-dark');
  const themeIconLight = document.getElementById('theme-icon-light');

  // Check saved theme or default to dark
  const savedTheme = localStorage.getItem('kavya-portfolio-theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.classList.add('light');
    if (themeIconDark) themeIconDark.classList.remove('hidden');
    if (themeIconLight) themeIconLight.classList.add('hidden');
  } else {
    document.documentElement.classList.remove('light');
    if (themeIconDark) themeIconDark.classList.add('hidden');
    if (themeIconLight) themeIconLight.classList.remove('hidden');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.classList.toggle('light');
      localStorage.setItem('kavya-portfolio-theme', isLight ? 'light' : 'dark');
      
      if (themeIconDark && themeIconLight) {
        if (isLight) {
          themeIconDark.classList.remove('hidden');
          themeIconLight.classList.add('hidden');
        } else {
          themeIconDark.classList.add('hidden');
          themeIconLight.classList.remove('hidden');
        }
      }
      showToast(isLight ? 'Switched to Light mode' : 'Switched to Dark mode');
    });
  }

  // 3. Copy Email to Clipboard
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'krishkavya03@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Copied krishkavya03@gmail.com to clipboard! 📋');
        // Visual indicator
        const iconSpan = btn.querySelector('.copy-icon');
        if (iconSpan) {
          const original = iconSpan.innerHTML;
          iconSpan.innerHTML = '✓ Copied';
          setTimeout(() => { iconSpan.innerHTML = original; }, 2000);
        }
      }).catch(err => {
        showToast('Email: krishkavya03@gmail.com');
      });
    });
  });

  // 4. Toast Notification Utility
  const toast = document.getElementById('toast');
  let toastTimeout;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
  window.showToast = showToast;

  // 5. Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/40');
        b.classList.add('bg-slate-800/40', 'text-slate-400', 'border-slate-700/50');
      });
      btn.classList.add('active', 'bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/40');
      btn.classList.remove('bg-slate-800/40', 'text-slate-400', 'border-slate-700/50');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'block';
          card.classList.add('animate-fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Mobile Hamburger Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    // Close mobile menu on clicking any link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 7. Active Navigation Spy on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-emerald-400', 'font-semibold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-emerald-400', 'font-semibold');
      }
    });
  });

  // 8. Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name')?.value || '';
      const email = document.getElementById('sender-email')?.value || '';
      const subject = document.getElementById('sender-subject')?.value || 'Message from Portfolio';
      const message = document.getElementById('sender-message')?.value || '';

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.');
        return;
      }

      // Compose mailto link as direct fallback
      const mailtoUrl = `mailto:krishkavya03@gmail.com?subject=${encodeURIComponent(subject + ' - via ' + name)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
      
      showToast('Opening email client to send message... 🚀');
      setTimeout(() => {
        window.location.href = mailtoUrl;
        contactForm.reset();
      }, 700);
    });
  }
});
