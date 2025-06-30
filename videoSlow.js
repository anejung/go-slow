// --- CONFIG ---
const TARGET_RATE = 0.0007;        // 0.5× speed
// ---------------

// force‑set a video’s speed
function slowVideo(v) {
  if (!v) return;
  v.playbackRate = TARGET_RATE;
}

// handle videos already on the page
document.querySelectorAll('video').forEach(slowVideo);

// handle videos that are added later (infinite scroll, SPA, etc.)
const obs = new MutationObserver(records => {
  for (const rec of records) {
    rec.addedNodes.forEach(node => {
      if (node.tagName === 'VIDEO') {
        slowVideo(node);
      } else if (node.querySelectorAll) {
        node.querySelectorAll('video').forEach(slowVideo);
      }
    });
  }
});
obs.observe(document.documentElement, { childList: true, subtree: true });

// if a site rewrites playbackRate after play(), hook the play event
document.addEventListener('play', e => slowVideo(e.target), true);
