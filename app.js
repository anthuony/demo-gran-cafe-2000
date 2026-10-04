const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const heroPhoto = document.querySelector('.hero-photo-main');

const setHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 26);
  if (heroPhoto && window.innerWidth > 800) {
    heroPhoto.style.transform = `scale(1.03) translateY(${Math.min(window.scrollY * 0.045, 18)}px)`;
  }
};

window.addEventListener('scroll', setHeader, { passive: true });
setHeader();

menuButton.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  mobileMenu.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('menu-open', open);
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Make first viewport content visible immediately when motion observers are delayed.
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('visible'));
});
