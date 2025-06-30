export function initSnailVision() {
    const filterStyle = document.createElement('style');
    filterStyle.id = '__snailVisionStyle';
  
    filterStyle.textContent = `
      html {
        filter: grayscale(1) blur(3px) brightness(0.8) contrast(0.8);
        transition: filter 0.5s ease;
      }
      ::selection {
        background: rgba(150,150,150,0.4) !important;
      }
    `;
    document.head.appendChild(filterStyle);
  }
  