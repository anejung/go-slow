const SCROLL_STEP = 200;      // pixels to scroll per wheel event
const SCROLL_DURATION = 5000;  // ms duration of each scroll animation

let isScrolling = false;      // lock flag
let scrollTarget = 0;         // where we want to scroll to

function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  let startTime = null;

  return new Promise(resolve => {
    function step(time) {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;  // easeInOutQuad

      window.scrollTo(0, startY + distance * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }
    requestAnimationFrame(step);
  });
}

window.addEventListener('wheel', async e => {
  e.preventDefault();

  if (isScrolling) {
    // ignore input while animating
    return;
  }

  // Decide scroll direction: positive deltaY means scroll down
  const direction = Math.sign(e.deltaY);

  // Calculate new target position clamped to scrollable range
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  scrollTarget = Math.min(Math.max(scrollTarget + direction * SCROLL_STEP, 0), maxScroll);

  isScrolling = true;
  await smoothScrollTo(scrollTarget, SCROLL_DURATION);
  isScrolling = false;
}, { passive: false });

// Initialize target position on load
scrollTarget = window.scrollY || window.pageYOffset;
