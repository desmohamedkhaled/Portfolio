// Theme management
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
function applyTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light');
    themeToggle.textContent = '☀️';
  } else {
    body.classList.remove('light');
    themeToggle.textContent = '🌙';
  }
  localStorage.setItem('theme', theme);
}
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);
themeToggle.addEventListener('click', function () {
  const currentTheme = body.classList.contains('light') ? 'light' : 'dark';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
  this.style.transform = 'scale(0.9) rotate(180deg)';
  setTimeout(() => { this.style.transform = ''; }, 200);
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Copy email functionality
const email = 'eng.moahamedkhaledx@gmail.com';
const copyEmailBtn = document.getElementById('copyEmail');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', async function () {
    try {
      await navigator.clipboard.writeText(email);
      const originalText = this.innerHTML;
      this.innerHTML = '✅ Copied!';
      this.style.background = 'var(--accent)';
      this.style.color = 'white';
      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.background = '';
        this.style.color = '';
      }, 2000);
    } catch (e) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      const originalText = this.innerHTML;
      this.innerHTML = '✅ Copied!';
      setTimeout(() => { this.innerHTML = originalText; }, 2000);
    }
  });
}

// Scroll-to-top button
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Enhanced sparkle effect
function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = Math.random() * 100 + '%';
  sparkle.style.top = Math.random() * 100 + '%';
  sparkle.style.animationDelay = Math.random() * 2 + 's';
  document.body.appendChild(sparkle);
  setTimeout(() => { if (sparkle.parentNode) sparkle.remove(); }, 2000);
}
setInterval(createSparkle, 3000);

// Enhanced floating particles effect (disabled on mobile for performance)
function createFloatingParticle() {
  // Check if device is mobile
  const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) return; // Skip particles on mobile devices
  
  const particle = document.createElement('div');
  const colors = ['rgba(255, 215, 0, 0.6)', 'rgba(255, 237, 78, 0.6)', 'rgba(251, 191, 36, 0.6)', 'rgba(255, 193, 7, 0.6)'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  particle.style.position = 'fixed';
  particle.style.width = Math.random() * 12 + 6 + 'px';
  particle.style.height = particle.style.width;
  particle.style.background = randomColor;
  particle.style.borderRadius = '50%';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = '100%';
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = '-1';
  particle.style.animation = 'particleFloat 12s linear infinite';
  particle.style.boxShadow = `0 0 20px ${randomColor}`;
  document.body.appendChild(particle);
  setTimeout(() => { if (particle.parentNode) particle.remove(); }, 12000);
}
if (!document.getElementById('particleStyles')) {
  const particleStyles = document.createElement('style');
  particleStyles.id = 'particleStyles';
  particleStyles.textContent = `
    @keyframes particleFloat {
      to {
        transform: translateY(-100vh) rotate(720deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(particleStyles);
}
setInterval(createFloatingParticle, 2500);

// Enhanced hover effects for buttons
document.querySelectorAll('.btn, .tag').forEach(element => {
  element.addEventListener('mouseenter', function (e) {
    if (this.querySelector('.ripple')) return;
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    ripple.style.marginLeft = '-50px';
    ripple.style.marginTop = '-50px';
    ripple.style.pointerEvents = 'none';
    this.appendChild(ripple);
    setTimeout(() => { if (ripple.parentNode) ripple.remove(); }, 600);
  });
});
if (!document.getElementById('rippleStyles')) {
  const rippleStyles = document.createElement('style');
  rippleStyles.id = 'rippleStyles';
  rippleStyles.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyles);
}

// Parallax effect for particles
let ticking = false;
window.addEventListener('mousemove', (e) => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const particles = document.querySelectorAll('.particle');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        particle.style.transform = `translate(${x}px, ${y}px) rotate(${x + y}deg)`;
      });
      ticking = false;
    });
    ticking = true;
  }
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Intersection Observer for animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);
document.querySelectorAll('.panel').forEach(panel => {
  observer.observe(panel);
});

// Enhanced mouse cursor animation (trail effect) - disabled on mobile
document.addEventListener('mousemove', function (e) {
  // Check if device is mobile or touch device
  const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
  
  if (isMobile) return; // Skip mouse trail on mobile devices
  
  const trail = document.createElement('div');
  const colors = ['#ffd700', '#ffed4e', '#fbbf24', '#ffc107'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  trail.style.position = 'fixed';
  trail.style.left = (e.clientX - 6) + 'px';
  trail.style.top = (e.clientY - 6) + 'px';
  trail.style.width = '12px';
  trail.style.height = '12px';
  trail.style.borderRadius = '50%';
  trail.style.background = `radial-gradient(circle, ${randomColor} 60%, transparent 100%)`;
  trail.style.pointerEvents = 'none';
  trail.style.zIndex = '9999';
  trail.style.opacity = '0.8';
  trail.style.transition = 'opacity 0.6s, transform 0.6s';
  trail.style.boxShadow = `0 0 15px ${randomColor}`;
  document.body.appendChild(trail);
  setTimeout(() => {
    trail.style.opacity = '0';
    trail.style.transform = 'scale(3)';
  }, 10);
  setTimeout(() => {
    if (trail.parentNode) trail.remove();
  }, 600);
});

// Add typing effect to the name
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', function() {
  const nameElement = document.querySelector('h1');
  if (nameElement) {
    const originalText = nameElement.textContent;
    setTimeout(() => {
      typeWriter(nameElement, originalText, 150);
    }, 1000);
  }
});

// Add floating hearts animation
function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.innerHTML = '💖';
  heart.style.position = 'fixed';
  heart.style.left = Math.random() * 100 + '%';
  heart.style.top = '100%';
  heart.style.fontSize = '20px';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '-1';
  heart.style.animation = 'heartFloat 8s linear infinite';
  heart.style.opacity = '0.7';
  document.body.appendChild(heart);
  setTimeout(() => { if (heart.parentNode) heart.remove(); }, 8000);
}

// Add heart float animation styles
if (!document.getElementById('heartStyles')) {
  const heartStyles = document.createElement('style');
  heartStyles.id = 'heartStyles';
  heartStyles.textContent = `
    @keyframes heartFloat {
      to {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(heartStyles);
}

// Create floating hearts occasionally
setInterval(createFloatingHeart, 8000);
