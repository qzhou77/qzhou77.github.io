// Keep the compact navigation in sync with the section being read.
const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
const navSections = navLinks.map(link => document.querySelector(link.hash));
let updateQueued = false;
function updateNavigation() {
  let current = navSections[0];
  for (const section of navSections) {
    if (section.getBoundingClientRect().top <= 150) current = section;
  }
  for (const link of navLinks) {
    if (link.hash === `#${current.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  updateQueued = false;
}
window.addEventListener('scroll', () => {
  if (!updateQueued) {
    updateQueued = true;
    requestAnimationFrame(updateNavigation);
  }
}, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();
