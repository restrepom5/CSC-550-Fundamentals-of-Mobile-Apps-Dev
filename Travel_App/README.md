# Native Appearance Demo (Expo + React Native + iOS TurboModule)

This project demonstrates changing the app’s Light/Dark appearance through a **native iOS module** (`NativeAppearance`).  
We keep the repo lean (no `ios/` or `android/` committed). You’ll **generate** the iOS project locally and then **add 4 native files** that are already in this repo.

> ❗ **Do not use Expo Go.** This app contains custom native code and must run as a **Dev Build**.

---

## 🧰 Step 0 — Install Tools (one-time, on macOS)

> iOS builds require **macOS**.

1. **Xcode 15+**
   - Open Xcode once to finish setup.
   - Verify:
     ```bash
     xcodebuild -version
     ```
2. **CocoaPods**
   ```bash
   sudo gem install cocoapods
   pod --version
```

Node.js 18+ and npm

`node -v`
`npm -v`


If missing, install Node LTS (e.g. via https://nodejs.org
 or nvm).

## 🚀 Step 1 — Clone & Install
```
git clone <YOUR_REPO_URL>.git
cd <project-folder>
npm install
```

## 🧱 Step 2 — Generate the iOS project

This creates the ios/ folder from your JS config.

`npx expo prebuild -p ios`


If Expo asks to create/modify native files, choose Yes.

## 🧩 Step 3 — Add the iOS native module files

The 4 native source files are already in this repo at:

native/ios/NativeAppearance/
  ├─ RCTNativeAppearance.h
  ├─ RCTNativeAppearance.mm   (Objective-C++ — note the .mm extension)
  ├─ NativeAppearanceImpl.h
  └─ NativeAppearanceImpl.m

#### Option A — Use the helper script (easiest)
`npm run ios:inject-module`


This copies those files into:

`ios/<YourAppTarget>/NativeAppearance/`


Now add them to the Xcode project (one-time):

Open the workspace:

`open ios/<YourAppTarget>.xcworkspace`


In Xcode’s left panel, right-click your blue app target → New Group → name it NativeAppearance.

Right-click the new NativeAppearance group → Add Files to "<YourAppTarget>"…

Select the 4 files inside ios/<YourAppTarget>/NativeAppearance/ and click Add.

Ensure Add to targets ✅ your app.

Ensure RCTNativeAppearance.mm shows Type: Objective-C++ Source (because of .mm).

For each file, confirm Target Membership is checked for your app (right panel).

You do not need a Swift bridging header—the helper is Objective-C.

#### Option B — Copy manually (if you prefer)
# Replace <YourAppTarget> with the actual folder created under ios/
mkdir -p ios/<YourAppTarget>/NativeAppearance
cp native/ios/NativeAppearance/* ios/<YourAppTarget>/NativeAppearance/


Then perform the same Xcode steps (2–5) above.

### 🪄 Step 4 — Install CocoaPods (codegen step)
`cd ios`
`pod install`
`cd ..``


This generates the header our module implements at:

`ios/build/generated/ios/AppSpecs/AppSpecs.h`


(Our RCTNativeAppearance.h already imports it as <AppSpecs/AppSpecs.h>.)

### ▶️ Step 5 — Run the App (iOS Simulator)
`npx expo run:ios`


This builds the Dev Build and launches the Simulator.

Open the app named after the project (e.g., 250App) — not “Expo Go”.

### ✅ Step 6 — Use the Demo

On the Home screen you’ll see three big buttons:

Light — forces light mode

Dark — forces dark mode

System — follows the device’s appearance

A chip shows Current mode and another shows Simulator: Yes/No.
The preview card updates to match the chosen appearance.

## 🧠 How It’s Wired (for the curious)

JS spec: specs/NativeAppearance.ts

`import NativeAppearance from '../specs/NativeAppearance';`
`NativeAppearance.setStyle('light' | 'dark' | 'unspecified');`


iOS native files you added:
```
ios/<YourAppTarget>/NativeAppearance/
  ├─ RCTNativeAppearance.h        // conforms to NativeAppearanceSpec
  ├─ RCTNativeAppearance.mm       // TurboModule wrapper (Objective-C++)
  ├─ NativeAppearanceImpl.h/.m    // Objective-C helper to flip UIUserInterfaceStyle
```

Registration (already in package.json):

```
{
  "codegenConfig": {
    "name": "AppSpecs",
    "type": "modules",
    "jsSrcsDir": "specs",
    "android": { "javaPackageName": "com.app250.specs" },
    "ios": {
      "modules": {
        "NativeAppearance": { "className": "RCTNativeAppearance" }
      }
    }
  }
}
```

## 🛠️ Troubleshooting

I opened “Expo Go” and the buttons don’t work.

Don’t use Expo Go. Run the Dev Build:

`npx expo run:ios`


Error: “Cannot find native module 'NativeAppearance'”.

You likely skipped Step 3 (copy + add files to Xcode).

Or you didn’t run cd ios && pod install (Step 4).

Fix, then:

`npx expo run:ios`


Header not found <AppSpecs/AppSpecs.h>

Run:

`cd ios && pod install && cd ..`


Then a clean build in Xcode (Product → Clean Build Folder) or re-run:

`npx expo run:ios`


Buttons don’t change the look.

Try System, then change the device appearance in iOS Settings to see it follow.

Ensure you’re running the Dev Build app (e.g., 250App), not Expo Go.

### 📜 Useful Scripts

Start Metro (if the Dev Build app is already installed):

`npx expo start`


Build & run iOS:

`npx expo run:ios`


Re-copy native files after re-prebuild:

`npm run ios:inject-module`

### 📎 Appendix A — Helper Script (if missing)

If npm run ios:inject-module isn’t available, create scripts/inject-ios-module.sh:

#!/usr/bin/env bash
set -euo pipefail

IOS_DIR="ios"
if [ ! -d "$IOS_DIR" ]; then
  echo "❌ No ios/ folder found. Run: npx expo prebuild -p ios"
  exit 1
fi

# Pick the app target directory under ios/ (exclude Pods/build/workspaces)

```
TARGET_DIR="$(ls -1 "$IOS_DIR" | grep -vE 'Pods|build|\\.xcworkspace$|\\.xcodeproj$' | head -n1)"

if [ -z "${TARGET_DIR:-}" ] || [ ! -d "$IOS_DIR/$TARGET_DIR" ]; then
  echo "❌ Can't find the iOS target folder under ios/. Open ios/ and locate your app target (blue icon in Xcode)."
  exit 1
fi

DEST="$IOS_DIR/$TARGET_DIR/NativeAppearance"
mkdir -p "$DEST"
cp native/ios/NativeAppearance/* "$DEST/"

echo "✅ Copied native files into: $DEST"
echo "👉 Open ios/$TARGET_DIR.xcworkspace in Xcode, right-click the app target → New Group 'NativeAppearance',"
echo "   then Add Files… and select the four files in $DEST (check 'Add to targets'). Ensure RCTNativeAppearance.mm is Objective-C++."
```


Make it executable and wire it into package.json:

```
{
  "scripts": {
    "start": "expo start",
    "ios": "expo run:ios",
    "android": "expo run:android",
    "prebuild:ios": "expo prebuild -p ios",
    "ios:inject-module": "bash ./scripts/inject-ios-module.sh"
  }
}
```

Now you can run:

`npm run ios:inject-module`
