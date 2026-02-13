# 📺 Video Player

A high-performance, responsive YouTube clone built with **React**, **Tailwind CSS**, and **Framer Motion**. This project features a sophisticated global player state allowing for seamless video playback, "drag-to-minimize" gestures, and a custom UI shell.

## ✨ Features

* **Global Playback Layer**: Videos continue playing seamlessly even when navigating the feed or minimizing the player.
* **Drag-to-Minimize**: Smooth, mobile-native gestures (powered by Framer Motion) to switch between full-screen and mini-player modes.
* **Smart Aspect-Ratio**: Maintains a perfect `16:9` ratio across all devices while ensuring UI controls remain visible.
* **Interactive Video Portal**: A unique layering system using `z-index` and `pointer-events` to allow direct interaction with the YouTube iframe while maintaining a custom UI shell.
* **Fully Responsive Feed**: A categorized video feed that adjusts its grid layout from mobile to desktop.
* **Custom Control Suite**: Tailored playback controls including a custom progress bar and playback toggles.

## 🚀 Tech Stack

* **Framework**: React (Vite)
* **Styling**: Tailwind CSS
* **Animations/Gestures**: Framer Motion
* **Player Engine**: `react-youtube` (YouTube IFrame Player API)
* **State Management**: Zustand

## 🛠️ Installation

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/Kavita539/video-player.git](https://github.com/Kavita539/video-player.git)
    cd youtube-clone
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

## 🏗️ Project Architecture

To solve the "cut-off" issues and "interaction" conflicts, the project follows a layered architecture:

* **`App.tsx`**: Manages the global stack. It places the `VideoFeed` at the bottom, the `VideoSurface` in the middle, and the `PlayerShell` on top.
* **`PlayerShell.tsx`**: Acts as a "UI Frame" with a transparent hole for the video. It handles the drag gestures and contains the `Controls` and `RelatedSheet`.
* **`VideoSurface.tsx`**: A specialized component that forces the YouTube Iframe to fill its container while maintaining a responsive height using `vh` and `dvh` units.

## 🎨 Key CSS Implementations

This project utilizes specific CSS resets to ensure a native-app feel:

```css
/* Critical Reset for Mobile Viewports */
html, body, #root {
  height: 100%;
  overflow: hidden; /* Prevents background scrolling when player is open */
}

/* Modern Viewport Units */
.player-container {
  height: 100dvh; /* Dynamic Viewport Height for mobile browsers */
}