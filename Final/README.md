# Final Project: Travel & Mood Explorer

This is a custom mobile application built with React Native and Expo, combining a travel exploration theme with a personal mood tracking feature.

## Key Features

- **Tab Navigation:** A clean tab bar for navigating between Home, Explore, Profile, and the Mood Tracker.
- **Dynamic Backgrounds:** An animated slideshow background on the Home and Profile pages.
- **Atmospheric Music:** Features background music (`ashitaka.mp3`) with a mute/unmute control conveniently located on the Home screen header.
- **Interactive Maps:** The destination detail pages for *Princess Mononoke* and *A Silent Voice* display an interactive, embedded map showing their real-world locations on mobile. For the web, it gracefully falls back to a clickable link to Google Maps.
- **Persistent Mood Tracker:** Users can log their mood (Happy, Sad, Calm, etc.) and an optional note. The last 5 entries are saved permanently to the device's local storage using `AsyncStorage`.
- **State Management with Context:** Mood data is managed globally and efficiently using React's Context API, avoiding unnecessary re-renders.
- **Performance Optimized:** The animated background was profiled and optimized by extracting it into a self-contained component, preventing wasted renders on the parent screens.

## Getting Started

To get this project running on your local machine, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version is recommended)
- **Android Studio** with a configured **Android Emulator**.
- **JAVA_HOME Environment Variable:** You must have the `JAVA_HOME` environment variable set correctly. (See Troubleshooting section below).

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

### 2. Start the App

Because this project uses native libraries (`react-native-maps`), you must run it as a development build on a native emulator or device.

In your terminal, run:

```bash
npx expo run:android
```

This command will build the native Android app, install it on your running emulator, and start the development server.

--- 

## Troubleshooting

- **`JAVA_HOME is not set` Error:** This is a common setup issue. It means your computer can't find the Java Development Kit. To fix it, you must set the `JAVA_HOME` environment variable on your system to point to the `jbr` folder inside your Android Studio installation directory (e.g., `C:\Program Files\Android\Android Studio\jbr`).
