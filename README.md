# 📱 ParkDay Orlando — Final Project

## 🎡 App Overview

**ParkDay Orlando** is a mobile planner for Disney & Universal trips.
Users can configure their vacation dates, add travel days, assign parks, add notes, and save multiple trips to their device.

## Key Features

 - 🎉 Custom splash screen
 - 🏠 Trip setup form (start date, park days, travel days)
 - 📅 Auto-generated trip calendar
 - ✏️ Editable park-day details with notes
 - 💾 Trip saving via AsyncStorage
 - 🧭 Stack + tab navigation
 - 🌙 Dark mode support
 - 📲 Device haptics
 - 🌐 Network call support (e.g., wait times)
 - 📸 Park & attraction image cards

## 📦 Libraries Used
- react-native-paper — UI components
- @react-native-async-storage/async-storage — persistent storage
- expo-haptics — device haptics
- @react-navigation/native, stack & tabs — app navigation
- @react-native-community/datetimepicker — date selection
- expo-font — custom fonts
- react-native-safe-area-context — safe area spacing

## How to Use the App
1. Trip Setup
- Choose your resort (Disney, Universal, or Both)
- Select your start date
- Enter total park days
- Select travel days (arrival, departure, both, or none)
- Tap Generate My Trip

2. Your Trip
- View all generated days
- Tap a day to (In Edit existing trip or in Initial trip setup):
- Pick a park
- Add/edit notes

3. My Trips
- See previously saved trips
- Edit dates or plans
- Open/Print/Save week itinerary snapshot
- Delete trips

4. Parks
- Browse parks and read attraction details; see wait times
- Tap to see park descriptions and images

5. Tips
- Browse helpful travel tips and advice

6. Settings
- Switch themes and adjust preferences

## 📈 Performance Considerations
One potential performance bottleneck in my app occurs in the **WeekViewScreen**, where a large list of DayCards is rendered and updated based on user interactions. Each DayCard contains an image, text, and props that can trigger extra re-renders when the parent component updates. This can impact UI smoothness and cause minor jank on lower-end devices. I inspected render frequency using the **React DevTools Profiler**, which showed which components were re-rendering more often than expected. To improve performance, I wrapped the DayCard component in `React.memo()` to prevent unnecessary updates when props do not change. In the future, I would also consider using list virtualization (FlashList or FlatList) and lazy-loading attraction images to further optimize rendering.

---

# 🛠️ Installation & Setup

## Install dependencies 
```bash
npm install
```
or
```bash
yarn install
```
## 🚀✨ Running a Custom Dev Build (iOS)
```bash
npx expo run:ios
```
## ⭐ After first build
```bash
npx expo run:ios
```
