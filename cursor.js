// // 
// function startFakeCursor() {
//   console.log('[FakeCursor] script started');

//   // 1) ซ่อนเคอร์เซอร์จริง
//   const hide = document.createElement('style');
//   hide.textContent = `html,body,*,*::before,*::after { cursor: none !important; }`;
//   document.documentElement.appendChild(hide);

//   // 2) สร้างเคอร์เซอร์ปลอม (แดง+เหลืองจะเห็นง่าย)
//   const dot = document.createElement('div');
//   dot.id = 'debug-fake-cursor';
//   dot.style.cssText = `
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 30px;
//     height: 30px;
//     border-radius: 50%;
//     background: red;
//     border: 0;
//     pointer-events: none;
//     z-index: 999999;
//   `;
//   document.body.appendChild(dot);

//   // Variables to store current position of fake cursor
//   let currentX = 0;
//   let currentY = 0;

//   // Target mouse position (updated on mousemove)
//   let targetX = 0;
//   let targetY = 0;

//   // Listen to real mousemove and update target positions
//   document.addEventListener('mousemove', e => {
//     targetX = e.clientX;
//     targetY = e.clientY;
//   });

//   // Animation loop to smoothly move fake cursor
//   function animate() {
//     // Speed factor: 0.05 means 5% closer per frame
//     const speed = 0.005;

//     // Move current position closer to target position
//     currentX += (targetX - currentX) * speed;
//     currentY += (targetY - currentY) * speed;

//     // Update fake cursor position
//     dot.style.left = `${currentX}px`;
//     dot.style.top  = `${currentY}px`;

//     requestAnimationFrame(animate);
//   }

//   // Start animation
//   requestAnimationFrame(animate);

//   console.log('[FakeCursor] dot created and animation started');
// }

// if (document.body) {
//   startFakeCursor();
// } else {
//   addEventListener('DOMContentLoaded', startFakeCursor);
// }

//////////////////


// function startFakeCursor() {
//   console.log('[FakeCursor] script started');

//   // 1) ซ่อนเคอร์เซอร์จริง
//   const hide = document.createElement('style');
//   hide.textContent = `html,body,*,*::before,*::after { cursor: none !important; }`;
//   document.documentElement.appendChild(hide);

//   // 2) สร้างเคอร์เซอร์ปลอม (แดง+เหลืองจะเห็นง่าย)
//   const dot = document.createElement('div');
//   dot.id = 'debug-fake-cursor';
//   dot.style.cssText = `
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 30px;
//     height: 30px;
//     border-radius: 50%;
//     background: red;
//     border: 0;
//     pointer-events: none;
//     z-index: 999999;
//   `;
//   document.body.appendChild(dot);

//   let currentX = 0;
//   let currentY = 0;
//   let targetX = 0;
//   let targetY = 0;

//   document.addEventListener('mousemove', e => {
//     targetX = e.clientX;
//     targetY = e.clientY;
//   });

//   // Animation loop to move fake cursor smoothly
//   function animate() {
//     const speed = 0.05;
//     currentX += (targetX - currentX) * speed;
//     currentY += (targetY - currentY) * speed;
//     dot.style.left = `${currentX}px`;
//     dot.style.top = `${currentY}px`;
//     requestAnimationFrame(animate);
//   }
//   requestAnimationFrame(animate);

//   // ← Insert click redirect code here!
//   document.addEventListener('click', e => {
//     e.preventDefault();
//     e.stopImmediatePropagation();

//     const fakeClick = new MouseEvent('click', {
//       bubbles: true,
//       cancelable: true,
//       clientX: currentX,
//       clientY: currentY,
//       view: window,
//     });

//     const elem = document.elementFromPoint(currentX, currentY);
//     if (elem) {
//       elem.dispatchEvent(fakeClick);
//     }
//   }, true);

//   console.log('[FakeCursor] dot created and click redirect enabled');
// }

////////////
function startFakeCursor() {
  console.log('[FakeCursor] script started');

  // 1) Hide the real cursor everywhere
  const hide = document.createElement('style');
  hide.textContent = `html,body,*,*::before,*::after { cursor: none !important; }`;
  document.documentElement.appendChild(hide);

  // 2) Create the fake cursor (red circle)
  const dot = document.createElement('div');
  dot.id = 'debug-fake-cursor';
  dot.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: red;
    border: 0;
    pointer-events: none;
    z-index: 999999;
    transform: translate(-50%, -50%); /* center dot on position */
  `;
  document.body.appendChild(dot);

  // Variables for positions
  let currentX = window.innerWidth / 2;
  let currentY = window.innerHeight / 2;
  let targetX = currentX;
  let targetY = currentY;

  // Update target position on real mouse move
  document.addEventListener('mousemove', e => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  // Animate fake cursor moving slowly towards real cursor
  function animate() {
    const speed = 0.05; // adjust speed here, smaller = slower

    currentX += (targetX - currentX) * speed;
    currentY += (targetY - currentY) * speed;

    dot.style.left = `${currentX}px`;
    dot.style.top = `${currentY}px`;

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // Block clicks unless fake cursor is near real cursor
  document.addEventListener('click', e => {
    const dx = currentX - e.clientX;
    const dy = currentY - e.clientY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 10) { // tolerance distance in px; adjust as needed
      e.preventDefault();
      e.stopImmediatePropagation();
      console.log('[FakeCursor] Click blocked: fake cursor not aligned');
    } else {
      console.log('[FakeCursor] Click allowed');
      // Click allowed to pass through normally
    }
  }, true);

  console.log('[FakeCursor] fake cursor created and click control enabled');
}

// Run when DOM ready
if (document.body) {
  startFakeCursor();
} else {
  addEventListener('DOMContentLoaded', startFakeCursor);
}
