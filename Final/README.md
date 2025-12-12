# Final Project: My Favorite Anime & Animation Collection

## Introduction

Welcome to my personal collection of favorite anime and animations. This mobile application, built with React Native and Expo, serves as an interactive showcase of influential films and series, complete with detailed descriptions and a personal mood tracking feature.

## Key Features

- **Tab Navigation:** A clean tab bar for navigating between Home, Explore, Profile, and the Mood Tracker.
- **Dynamic Theme Switching:** A button on the Explore page header allows the user to instantly toggle the entire app's color scheme between a light and dark mode.
- **Dynamic Backgrounds:** An animated slideshow background on the Home and Profile pages.
- **Atmospheric Music:** Features background music ("Lapis Philosophorum.mp3") with a mute/unmute control on the Home screen.
- **Interactive Maps:** The destination detail pages display an interactive, embedded map on mobile, gracefully falling back to a web link on other platforms
- **Performance Optimized:** The animated background was profiled and optimized by extracting it into a self-contained component.

## Getting Started

To get this project running on your local machine, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version is recommended)
- **Android Studio** with a configured **Android Emulator**.
- **JAVA_HOME Environment Variable:** You must have the `JAVA_HOME` environment variable set correctly.

### 1. Install Dependencies (The First Command)

This is the very first command you need to run. It installs all the required libraries for the project.

In your terminal, navigate to the `Final` project folder and run:

```bash
npm install
```

This will install all necessary libraries, including:
- `expo-router` (for navigation)
- `expo-av` (for audio)
- `@react-native-async-storage/async-storage` (for local storage)
- `react-native-maps` (for the interactive maps)
- `@expo/vector-icons` (for icons)

### 2. Start the App

Because this project uses native libraries (`react-native-maps`), you must run it as a development build on a native emulator or device.

In your terminal, run:

```bash
npx expo run:android
```

This command will build the native Android app, install it on your running emulator, and start the development server.

---

## 📈 Performance Considerations

A potential performance bottleneck was the animated image slideshow on the Home and Profile pages. Initially, the state for the animation was managed directly within these screens, which caused the entire screen component to re-render every four seconds. This is a problem as it creates "wasted renders" that consume CPU resources and battery life, even though only the background image was changing.
Using the **React DevTools Profiler**, these repeated re-renders were identified. The optimization applied was **Component Extraction**: the entire slideshow logic was moved into a self-contained `<AnimatedBackground />` component, which now manages its own state and prevents the parent screens from re-rendering unnecessarily.Additionally, for the loading screen I switched from multiple PNG files to a single GIF file. This reduced redundant renders and simplified asset management.

