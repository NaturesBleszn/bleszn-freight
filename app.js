// BLESZN FREIGHT - JavaScript

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu if open
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      }
    }
  });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 80) {
    navbar.style.padding = '0.8rem 0';
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
  } else {
    navbar.style.padding = '1.2rem 0';
    navbar.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// Tracking Function
function trackShipment() {
  const input = document.getElementById('trackInput');
  const result = document.getElementById('trackResult');
  const trackingNumber = input.value.trim();
  
  if (!trackingNumber) {
    result.style.display = 'block';
    result.innerHTML = '⚠️ Please enter a tracking number or BOL number.';
    result.style.background = 'rgba(255,165,0,0.1)';
    result.style.borderColor = '#FFA500';
    result.style.color = '#FFA500';
    return;
  }
  
  // Simulate tracking result
  result.style.display = 'block';
  result.innerHTML = `
    <strong>✓ Tracking Number: ${trackingNumber}</strong><br/>
    <span style="font-size: 0.9rem; opacity: 0.9;">Status: In Transit | ETA: 2 days | Last Update: Memphis, TN</span>
  `;
  result.style.background = 'rgba(255,107,53,0.1)';
  result.style.borderColor = 'var(--primary)';
  result.style.color = 'var(--primary)';
  
  // Activate all tracking steps for demo
  document.querySelectorAll('.track-step').forEach((step, index) => {
    if (index <= 1) step.classList.add('active');
  });
}

// Form Submit Handler
function submitForm(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  
  // Get form data
  const formData = new FormData(form);
  
  // Show loading state
  const originalText = btn.innerHTML;
  btn.innerHTML = 'Sending...';
  btn.disabled = true;
  
  // Simulate form submission
  setTimeout(() => {
    btn.innerHTML = '✓ Request Sent!';
    btn.style.background = '#10B981';
    
    // Reset form
    form.reset();
    
    // Reset button after delay
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.disabled = false;
      
      // Show success message
      alert('Thank you for your quote request! Our dispatch team will contact you within 24 hours.');
    }, 2000);
  }, 1500);
}

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.service-card, .pillar, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// Counter Animation
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + (element.dataset.suffix || '');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + (element.dataset.suffix || '');
    }
  }, 16);
}

// Trigger counters when hero is in view
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-number').forEach(stat => {
        const text = stat.textContent.replace(/[^0-9]/g, '');
        const number = parseInt(text);
        if (number && !stat.dataset.animated) {
          stat.dataset.animated = 'true';
          stat.dataset.suffix = stat.textContent.replace(text, '');
          animateCounter(stat, number);
        }
      });
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const hero = document.querySelector('.hero');
if (hero) heroObserver.observe(hero);

console.log('BLESZN FREIGHT website loaded successfully!');
