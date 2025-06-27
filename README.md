# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

## Step 3: Challenges and Fixes

📍 1. React Native Maps & Geolocation on Android 12+
• Background Permissions: Android 12+ enforces strict location permission policies.
Must handle ACCESS_FINE_LOCATION and ACCESS_COARSE_LOCATION with runtime prompts.
• Background Execution: Apps targeting API 31+ need android:exported for certain components.
• Google Maps API Keys needed to be configured properly to work both on android and ios.
• App Crashes: If permissions are not granted at runtime, react-native-maps and react-native-geolocation-service can fail silently or crash. So used @react-native-community/geolocation library.

⸻

🧩 2. Integrating Native Modules
• Header Search Paths: Common build errors like Yoga.h not found if HEADER_SEARCH_PATHS or modular_headers not handled.
• Manual Linking: Custom native modules require extra Swift bridging files or Objective-C .h/.m files to expose to JS.

⸻

🗂️ 3. FlashList: Duplicating & Filtering Product Lists
• Duplication: Needed to filter out the duplicated list comes from the server and maintain unique list.
• Performance: Using FlashList improved render performance over FlatList but required careful key extraction.
• State Sync: Filtering logic needed to sync well with useState and useMemo to prevent unnecessary re-renders.
• Empty State: Had to handle scenarios where filter returned zero results without crashing list rendering.

⸻

✅ Summary

This project demonstrates React Native setup for modern Android/iOS development with:
• React Native Maps
• Native Modules
• FlashList for high-performance product lists
