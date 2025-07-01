# go‑slow 🐌

## What is it?

**go‑slow** is an art‑tech experiment that lets you experience what browsing the modern internet might feel like if you were moving hundreds of times more slowly. It combines:

1. **A lightweight browser extension** that hides the native cursor and renders a fake one that moves slowly.
2. **System‑level speed hacks** using a tool called LinearMouse to reduce pointer and scrolling speed to nearly zero.

The result is a new kind of *slow media* — a (frustratingly) contemplative way to scroll, click, and watch.

## 🔧 How it works

### 1 / Browser extension

The browser extension disables the native cursor and shows a custom fake cursor that moves toward the real one slowly. This creates a visible lag that simulates slow thinking or response.

To try it yourself:

* Save the extension files (including `manifest.json`, `content.js`, and `cursor.js`).
* Open Chrome and go to `chrome://extensions`.
* Enable **Developer mode** (top right).
* Click **Load unpacked** and select the folder with your extension files.

More info here: [Chrome Extension Docs – Load Unpacked](https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked)

### 2 / System pointer slowdown

At first, I tried to slow the mouse at the operating system level using macOS Terminal commands. However, on macOS Sonoma, the system silently resets extreme values. That method no longer works reliably.

Instead, I used **LinearMouse**, a free and open-source tool for macOS. It allows you to:

* Disable pointer acceleration
* Reduce pointer speed to `0.001`
* Reduce scroll speed for full slowness

This makes both the real and fake cursors behave more consistently.

## 🖥️ Tested environment

* macOS Sonoma on Mac M1 (2020)
* Chrome browser
* [LinearMouse](https://linearmouse.app)

## 🚀 How to try it

1. Clone or download the project files.
2. Load the browser extension through Chrome’s Developer mode.
3. Install and configure LinearMouse to slow everything down.

You’ll feel like a snail using the internet — slow, patient, and hyper-aware.


## 🐞 Known issues

* On high-DPI displays, the fake cursor may lag behind unless LinearMouse is active.
* Some websites (like WebGL games) ignore cursor styling.
* Future versions of Chrome may require Manifest V3 for extensions.


## 📜 License

MIT © 2025 Ami Photralux

Enjoy the stillness. 🐌
