## 🛵💨 How to run (Dev Build — not Expo Go)

- First-time:
```
cd Giugno_Maria/HelloWorld && npm i && npx expo prebuild -p ios && npm run ios:inject-module && (cd ios && pod install) && npx expo run:ios
         
```
- Following runs:
```
cd Giugno_Maria/HelloWorld && npm run ios:inject-module && (cd ios && pod install) && npx expo run:ios

         
```  

###  ✅ Verify

- Home screen has Light / Dark / System buttons.
- Tapping them changes appearance via the NativeAppearance iOS module.

### 📂 Where

- spec: Giugno_Maria/HelloWorld/specs/NativeAppearance.ts
- native iOS: Giugno_Maria/HelloWorld/native/ios/NativeAppearance/
- usage: Giugno_Maria/HelloWorld/app/(tabs)/index.tsx

### 🛟 Troubleshooting

1. Cannot find native module 'NativeAppearance'” → Run inject + pods, then Rebuild

```
npm run ios:inject-module
cd ios && pod install && cd ..
npx expo run:ios
```
2. If build fails with sandbox error, Disable Enable User Script Sandboxing in Xcode (Project & Target), Clean build, Retry

```
cd Giugno_Maria/HelloWorld
cd ios && pod install && cd ..
npx expo run:ios
```
