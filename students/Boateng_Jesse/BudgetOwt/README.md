## BudegetOwt Mobile Savings & Goal Tracker

BudgetOwt is a React Native mobile app that helps users save money towards goals using envelops. Each category show progress bars, and users can deposit money into each goal. The app includes an animated splash screen, network API call, device haptics, and full navigation using Expo Router.




# Features

- Animated splash screen


- Home Screen
- shows all saving categories
- shows progress bar
- recent deposits list

- Add Screen
- Money mindset quote feteched fronm an API
- autofilled category when tapped from Home
- Add money to goal


- History Screen 
- list of all deposits
- Navigate to detail page (history/[id])

- Setting Screen
- clear all savings (AsyncStorage)
- About app


## Framework

- react native
- Expo
- Expo router

### Libraries Used
- 'expo-haptics'- device vibration feedback when saved
- '@react-native-async-storage/async-storage' storage for deposits
- '@react-native-safe-area-context' - safe screen layout around status bar
- Expo-router' - file-based naigation  
- Fetch Api - for quotes 


#### Insallation & running 
- npm install
- npx expo start

Use the CLI to open: 
- IOS simulator 
- Android Emulator


## PERFORMANCE

To evaluate performance, I used the React Native Performace Overlay, which shows the UI thread and Js thread frame rates. My app was consitently running at 60 FPS on both, meaning no dropped frames and smooth animations. One potential bottleneck in my app is the calculation of goal totals on the home screen. Every time the expesnse update, the totals for each category have to recalculate.  I used rhe React DEvTools Profiler to confirm that the Home component was re-rendering often. To optomize this, i wrapped the totals calculation inside useMemo so it only recalculates when the expenses actually changes. This reduces unnecssary work keeps the js thread light and helps maintain 60 FPS performance