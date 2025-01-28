/**
 * @fileoverview Advanced Scroll to Top Button
 * @description Scroll-to-top button with complex logic, premium dynamic effects, and visibility only at specific scroll depth.
 */

(function renderScrollToTopButton() {
  const SCROLL_OFFSET_SHOW = 300;
  const SCROLL_OFFSET_HIDE = 150;

  let lastScrollY = 0;

  const scrollToTopButton = document.createElement('button');
  scrollToTopButton.className =
    'fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 text-white rounded-full shadow-lg flex items-center justify-center opacity-0 scale-0 pointer-events-none transition-all duration-300 ease-out hover:from-blue-600 hover:via-blue-500 hover:to-blue-400 focus:outline-none';
  scrollToTopButton.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>
        <path d="M31 22L24 15L17 22" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M31 31L24 24L17 31" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
  document.body.appendChild(scrollToTopButton);

  function showButton() {
    scrollToTopButton.style.opacity = '1';
    scrollToTopButton.style.transform = 'scale(1)';
    scrollToTopButton.style.pointerEvents = 'auto';
  }

  function hideButton() {
    scrollToTopButton.style.opacity = '0';
    scrollToTopButton.style.transform = 'scale(0)';
    scrollToTopButton.style.pointerEvents = 'none';
  }

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > SCROLL_OFFSET_SHOW && currentScrollY > lastScrollY) {
      showButton();
    } else if (
      currentScrollY < SCROLL_OFFSET_HIDE ||
      currentScrollY < lastScrollY
    ) {
      hideButton();
    }

    lastScrollY = currentScrollY;
  });

  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  hideButton();
})();
