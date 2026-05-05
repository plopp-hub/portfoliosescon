/* ── Custom Cursor ─────────────────────────────────────── */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

document.addEventListener('mousemove', e => {
  cursor.style.left    = e.clientX + 'px';
  cursor.style.top     = e.clientY + 'px';
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, button, .skill-card, .contact-form-card, .org-card, .timeline-item, .photo-frame, .project-card, .project-btn')
  .forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

/* ── Scroll Progress Bar ───────────────────────────────── */
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
  const total = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = (window.scrollY / total * 100) + '%';
});

/* ── Generate Stars ────────────────────────────────────── */
const starsEl = document.getElementById('stars');
for (let i = 0; i < 60; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  s.style.left              = Math.random() * 100 + '%';
  s.style.top               = Math.random() * 100 + '%';
  s.style.animationDuration = (2 + Math.random() * 4) + 's';
  s.style.animationDelay    = (Math.random() * 5) + 's';
  s.style.width = s.style.height = (Math.random() > .7 ? 3 : 2) + 'px';
  starsEl.appendChild(s);
}

/* ── Theme Toggle ──────────────────────────────────────── */
const html        = document.documentElement;
const toggleBtn   = document.getElementById('theme-toggle');
const toggleIcon  = document.getElementById('toggle-icon');
const toggleLabel = document.getElementById('toggle-label');

let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(isDark);

toggleBtn.addEventListener('click', () => { isDark = !isDark; applyTheme(isDark); });

function applyTheme(dark) {
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  toggleIcon.textContent  = dark ? '🌙' : '☀️';
  toggleLabel.textContent = dark ? 'Light' : 'Dark';
}

/* ── Intersection Observer ─────────────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .timeline-item, .skill-card').forEach(el => observer.observe(el));

/* ── Active Nav on Scroll ──────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.45 });

sections.forEach(s => secObs.observe(s));

/* ── Mobile Hamburger Menu ─────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

document.addEventListener('click', e => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  }
});

/* ── Contact Form ──────────────────────────────────────── */
const btnSend  = document.getElementById('btn-send');
const feedback = document.getElementById('send-feedback');

btnSend.addEventListener('click', () => {
  const name  = document.getElementById('c-name').value.trim();
  const email = document.getElementById('c-email').value.trim();
  const msg   = document.getElementById('c-msg').value.trim();

  if (!name || !email || !msg) {
    feedback.textContent = '♦ Please fill in all fields.';
    feedback.className   = 'send-feedback error';
    return;
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    feedback.textContent = '♦ Please enter a valid email address.';
    feedback.className   = 'send-feedback error';
    return;
  }

  feedback.textContent = '✓ Message sent! Thank you, ' + name + '.';
  feedback.className   = 'send-feedback success';

  document.getElementById('c-name').value  = '';
  document.getElementById('c-email').value = '';
  document.getElementById('c-msg').value   = '';

  setTimeout(() => { feedback.textContent = ''; feedback.className = 'send-feedback'; }, 5000);
});