# Welcome to Dead on Board MTG Deck Builder

This is a lightweight application for compiliing lists of cards from the tcg Magic the Gathering to build decks or save for later.

## Information

This applications uses the scryfall.com/api

## Notable Library

 - react-native-animated
 - zustand
 - react-native-async-storage/async-storage

## Performance

I used Android Studio's native "Profile" feature to record and optimize performance. Originally, prior to adding zustand, attempting to do API searches were occasionally failing or having slow image loads. Using zustand allowed the app to process queries as a much faster speed. Additionally, memoizing the images returned the the queries helped with the single card modal renders significantly. One bottleneck in performance could be the advanced tab that can return very large queries of data. Magic the Gathering is a tcg that has over 27,000 unique cards and it is constantly growing. This can balloon memory for zustand and my cause slow updates as time goes. Given more time I'd add pagination to the query outputs to help with loading better and improve the zustand and reduce the amount of memory needed for searches.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).
