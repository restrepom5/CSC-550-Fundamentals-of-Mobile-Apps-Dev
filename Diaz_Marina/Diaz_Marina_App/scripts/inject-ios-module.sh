#!/usr/bin/env bash
set -euo pipefail

IOS_DIR="ios"
if [ ! -d "$IOS_DIR" ]; then
  echo "❌ No ios/ folder found. Run: npx expo prebuild -p ios"
  exit 1
fi

TARGET_DIR="$(ls -1 "$IOS_DIR" | grep -vE 'Pods|build|\.xcworkspace$|\.xcodeproj$' | head -n1)"

if [ -z "${TARGET_DIR:-}" ] || [ ! -d "$IOS_DIR/$TARGET_DIR" ]; then
  echo "❌ Can't find the iOS target folder under ios/. Open ios/ and locate your app target (blue icon in Xcode)."
  exit 1
fi

DEST="$IOS_DIR/$TARGET_DIR/NativeAppearance"
mkdir -p "$DEST"
cp native/ios/NativeAppearance/* "$DEST/"

echo "✅ Copied native files into: $DEST"
echo "👉 Open ios/$TARGET_DIR.xcworkspace in Xcode, right-click the app target → New Group 'NativeAppearance',"
echo " then Add Files… and select the four files in $DEST (check 'Add to targets'). Ensure RCTNativeAppearance.mm is Objective-C++."


