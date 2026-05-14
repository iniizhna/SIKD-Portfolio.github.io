// ─────────────────────────────────────────────
//  PORTFOLIO — script.js
// ─────────────────────────────────────────────

// ── 1. NAVBAR: add shadow on scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── 2. MOBILE MENU: burger toggle ──
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ── 3. SCROLL REVEAL: fade sections in as you scroll ──
// Add the 'reveal' class to elements you want to animate in
const revealTargets = [
  '.about-grid',
  '.pub-item',
  '.project-card',
  '.cv-col',
  '.contact-grid',
  '.info-card',
];

revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('reveal');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger the animation slightly for multiple items
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (entry.target.dataset.delay || 0));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Add stagger delay to siblings
document.querySelectorAll('.pub-item, .project-card, .info-card').forEach((el, i) => {
  el.dataset.delay = i % 4; // resets every 4 items
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── 4. ACTIVE NAV LINK: highlight current section ──
const sections = document.querySelectorAll('section[id]');
const navAnchor = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navAnchor.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = 'var(--ink)';
    }
  });
});

// ── 5. CONTACT FORM: simple submit handler ──
// To make the form actually send emails, sign up free at formspree.io
// Then replace the action URL in the form tag, or use the fetch method below.
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const successMsg = document.getElementById('form-success');

  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate a send (replace this block with real Formspree fetch if needed)
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.disabled = false;
    successMsg.style.display = 'block';
    e.target.reset();
    setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
  }, 1000);

  /* ── Real Formspree integration (uncomment when ready) ──
  fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new FormData(e.target)
  }).then(res => {
    if (res.ok) {
      successMsg.style.display = 'block';
      e.target.reset();
    }
  }).finally(() => {
    btn.textContent = 'Send Message';
    btn.disabled = false;
  });
  */
}
