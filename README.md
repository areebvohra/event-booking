# Event Booking App

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

This application is a simple event booking app that takes basig information like email, username and number of tickets and sends you a confirmation email on your email.

## Strp 1: Make sure your API server is running

Check you API server is running and you will have to change your `baseURL`, goto `/src/constants/index.ts` and replace `localhost` with your system IP.

```bash
export const baseURL = 'http://localhost:3000';

# replace with you system IP e.g.
export const baseURL = 'http://192.168.100.127:3000';
```

## Step 2: Start your Application

Before starting your application run `npm install` in your root folder.

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

From you project folder goto your ios folder and run `pod install`. After pods are install move back to the project folder and run the following command.

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
