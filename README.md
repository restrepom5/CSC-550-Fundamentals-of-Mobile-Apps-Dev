## Creating a React Native App and adding an iOS native module on it:

## On the Terminal - start by creating the app folder

- sudo npm i -g expo cli
- expo init `name_of_my_app`
- Choose template: expo -template -blank (or just press enter)
- cd into the `name_of_my_app`

---

## On VS Code, or any IDE

- Open the folder in VS code and check your files:
- assets - where images, videos would go.
- App.js - the code goes here, and later we will edit so that react native can call our native modules in a function with an object

---

## Back to the terminal

- create the ios project: npx expo prebuild -p ios
- we are creating the ios folder because our app is ios

---

## On Xcode

Open xcode and open the `workspace` of the `name_of_my_app` **(don't open the project. open the workspace)**
Open the name_of_my_app folder under the name_of_my_app blue xcode icon and create the following files: (create all these 4 files in the same directory that AppDelegate.swift lives)

- Create the .swift file
- Create the Bridge.m file
- Crate the -Bridging-Header.h
- Create the ContentViewUI.swift - this file is the one we will copy paste our own code written in swift

Inside Bridge.m file add:
`#import <React/RCTBridgeModule.h>`
@interface RCT_EXTERN_MODULE(ContentViewMarina, NSObject)
// Expose the SwiftUI method to React Native
RCT_EXTERN_METHOD(showSwiftUIView)

`RCT_EXTERN_METHOD(showMessage:(NSString \*)message)`
@end

Inside ContentViewUI.swift - add your swift code that you wrote for your app

Inside ContentView_Marina.swift add:
`import Foundation`
`import SwiftUI`
`import UIKit`
@objc(ContentViewMarina)
class ContentViewMarina: NSObject {

@objc
`func showMessage(\_ message: String) {`
`print("Message from JS: \(message)")`
}
// Showing SwiftUI view
@objc
func showSwiftUIView() {
DispatchQueue.main.async {
// Use UIWindowScene.windows instead of deprecated UIApplication.shared.windows
guard let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
let rootVC = windowScene.windows.first?.rootViewController else { return }
let contentView = ContentView() // Your SwiftUI view
let hostingController = UIHostingController(rootView: contentView)
rootVC.present(hostingController, animated: true, completion: nil)
}
}
`}`

Inside Bridging-Header.h add:
`#import <React/RCTBridgeModule.h>`
Make sure all files are targeting your app under "Target Membership".
To check if the Bridging.Header.h file is targeting your app: Click the name_of_your_app blue xcode icon >build settings > find Objective-c Bridging Header and make sure it has the path for our app.

---

## On VS Code

In App.js add this:
`import { StatusBar } from 'expo-status-bar';`
`import { NativeModules, View, Button, StyleSheet } from 'react-native';`
`const { ContentViewMarina } = NativeModules;`
`export default function App() {`
`return (`
`<View style={styles.container}>`
`<Button`
`title="Show SwiftUI View"`
`onPress={() => ContentViewMarina.showSwiftUIView()}`
`/>`
`</View>`
`);`
`}`
`const styles = StyleSheet.create({`
`container: { flex: 1, justifyContent: 'center', alignItems: 'center' },`
`});`

---

## Back to the terminal

Finally, open the terminal to run the build:

- cd ios
- pod install
- cd ..
- npx expo run:ios
