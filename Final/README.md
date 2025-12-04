# Final Project: Travel & Mood Explorer

This is a custom mobile application built with React Native and Expo, combining a travel exploration theme with a personal mood tracking feature.

## Key Features

- **UI Library:** Uses [Tamagui](https://tamagui.dev/) for a consistent and maintainable design system.
- **Tab Navigation:** A clean tab bar for navigating between Home, Explore, Profile, and the Mood Tracker.
- **Dynamic Backgrounds:** An animated slideshow background on the Home and Profile pages.
- **Atmospheric Music:** Features background music with a mute/unmute control on the Home screen.
- **Interactive Maps:** The destination detail pages display an interactive, embedded map on mobile, gracefully falling back to a web link on other platforms.
- **Persistent Mood Tracker:** Users can log their mood and an optional note, with the last 5 entries saved permanently to the device's local storage.
- **State Management:** Mood data is managed globally and efficiently using React's Context API.
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
- `expo-router`
- `expo-av`
- `@react-native-async-storage/async-storage`
- `react-native-maps`
- `tamagui`

### 2. Start the App

Because this project uses native libraries (`react-native-maps`), you must run it as a development build on a native emulator or device.

In your terminal, run:

```bash
npx expo run:android
```

This command will build the native Android app, install it on your running emulator, and start the development server.
