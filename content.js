// content.js  – injected on every page (run_at: "document_idle")

/* 1  Slow, “snail” cursor */
import('./cursor.js')
  .then(m => m.initSnailCursor())
  .catch(err => console.error('[snail‑web] cursor failed:', err));

/* 2  Force every <video> to 0.5× speed + lower volume */
import('./videoSlow.js')
  .then(m => m.initVideoSlowMode())
  .catch(err => console.error('[snail‑web] videoSlow failed:', err));

/* 3  Snail‑vision page filter (grayscale + blur) */
import('./snailVision.js')
  .then(m => m.initSnailVision())
  .catch(err => console.error('[snail‑web] snailVision failed:', err));
