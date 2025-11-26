# DJNeduSampler 🎧

A React Native / Expo sampler app that lets users trigger DJ sound effects, browse a remote “sound library,” favorite tracks, and download sample files for offline use.

This project is my final app for **CSC 550 – Fundamentals of Mobile App Development**.

---

## App Overview

**Main idea**

DJNeduSampler is a simple DJ helper app:

- The **Home / Sampler Pads** screen has four big pads (Airhorn, Siren, Riser, Impact) that play local audio files with haptic feedback.
- The **Sound Library** screen fetches a list of “remote samples” over the network, supports searching and filtering by category, and includes **Fav** and **Download** actions.
- The **Settings** screen is a placeholder for future options like theme, pad colors, and vibration toggles.

---

## Screens & Navigation

The app uses both **tabs** and **stack navigation**:

- **Tabs (bottom)**  
  - `Home` → Sampler Pads  
  - `Explore` → Entry point into the stack

- **Stack (inside Explore tab)**  
  - `/` — Home landing screen with navigation buttons  
  - `/explore` — Sampler Pads (pads screen)  
  - `/library` — Sound Library (remote list, search, filters, download, favorites)  
  - `/settings` — Settings placeholder screen  

This satisfies the requirement for **4+ screens** and the use of **both tabs and stack navigation** (via Expo Router).

---

## Device Capabilities Used

The app uses multiple device APIs via Expo libraries:

- **Audio playback** – `expo-av`  
  - Plays local `.mp3` files when tapping the sampler pads.
- **Haptics** – `expo-haptics`  
  - Light vibration on each pad press to enhance feedback.
- **File system** – `expo-file-system`  
  - Downloads a JSON representation of a remote “sample file” to `FileSystem.documentDirectory`.
  - Shows a success/failure alert so the user knows what happened.

---

## Network Call (Axios)

The **Sound Library** screen performs a real network request using **Axios**:

- Endpoint: `https://jsonplaceholder.typicode.com/posts?_limit=8`
- The response data is mapped into “tracks” that display:
  - Title
  - Description (body)
  - Category (e.g., “Hype” or “Transition”)
  - Fake remote URL used by the Download button

This fulfils the requirement for **at least one network call** using a library.

---

## Non-Core Libraries Used

At least **three non-React-Native-core libraries** are actively used:

1. **`axios`** – For the HTTP request on the Sound Library screen.  
2. **`expo-av`** – For local audio playback of the sampler pads.  
3. **`expo-haptics`** – For vibration feedback when tapping pads.  
4. **`expo-file-system`** – For saving a downloaded JSON file to local storage.

(There are more Expo/Router utilities, but these four easily satisfy the requirement.)

---

## User Input Feature (Form / Search / Controlled Component)

The **Sound Library** screen implements a working **search bar** using a controlled `TextInput`:

- Component state: `const [search, setSearch] = useState('');`
- The list of tracks is filtered based on the search text:
  - Matches are checked against both the sample **title** and **description**.
- The input updates state on every keystroke and immediately re-filters the list, which proves that the control is wired correctly.

✅ This satisfies the requirement for a **user input screen with a controlled component**.

---

## Favorites, Categories, and Download

- **Favorites**
  - Each card has a “⭐ Fav” button.
  - Tapping toggles the item’s `isFavorite` flag and updates UI text/state.
- **Categories**
  - Pills at the top: **All / Hype / Transition**.
  - Filtering is done in memory based on a `category` property added to each track.
- **Download**
  - “Download” triggers a function that:
    - Builds a small JSON object representing the selected sample.
    - Writes it to a file in the device document directory using `FileSystem.writeAsStringAsync`.
    - Shows an alert on success or failure.

This demonstrates app-level state management, simple filtering, and interaction with the file system.

---

## 📈 Performance Considerations

One potential performance bottleneck in this app is the **Sound Library** screen, which uses a `FlatList` that can re-filter and re-render many rows every time the user types in the search bar. On slower or older devices, constantly filtering a growing list of results and updating the UI on every keystroke can cause dropped frames and a noticeable lag in typing. To reason about this, I used Expo’s built-in performance monitor (FPS / JS thread usage) and added simple console logs to see how often rows re-rendered while interacting with the search bar and category filters. As an optimization, I wrapped the filtered list computation in `useMemo` and memoized event handlers like `handleToggleFavorite` and `handleDownload` with `useCallback`, which reduces unnecessary re-renders of each row. In the future, I would also debounce the search input and rely more heavily on `FlatList` virtualization or pagination if the API ever returns hundreds or thousands of samples.

---

## How to Run the App

From the `DJNeduSampler` directory:

```bash
npm install
npx expo start

