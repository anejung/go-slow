function startFakeCursor() {
  console.log('[FakeCursor] script started');

  // 1) ซ่อนเคอร์เซอร์จริง
  const hide = document.createElement('style');
  hide.textContent = `html,body,*,*::before,*::after { cursor: none !important; }`;
  document.documentElement.appendChild(hide);

  // 2) สร้างเคอร์เซอร์ปลอม (แดง+เหลืองจะเห็นง่าย)
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
    border: 3px solid yellow;
    pointer-events: none;
    z-index: 999999;
  `;
  document.body.appendChild(dot);

  // 3) ให้จุดตามเมาส์จริง
  document.addEventListener('mousemove', e => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top  = `${e.clientY}px`;
  });

  console.log('[FakeCursor] dot created');
}

// ถ้า <body> ยังไม่โหลด รอ DOM ก่อน
if (document.body) {
  startFakeCursor();
} else {
  addEventListener('DOMContentLoaded', startFakeCursor);
}

