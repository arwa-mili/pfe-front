## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)

## About the Project

This project is the front part of a mobile application designed to help users manage their health proactively. It allows tracking of key health indicators, managing nutritional plans, and communicating securely with healthcare professionals. The application is intended for both patients and doctors, with distinct interfaces and functionalities for each role.

find backend at : https://github.com/arwa-mili/pfe_backend

video demo : https://www.youtube.com/watch?v=xJJml1CSDeQ

## Features

- **Authentication Management:** Secure registration, login, and password reset with Deep Linking.
- **Complete User Profile:** Management of personal information, medical history, and preferences.
- **Health Data Tracking:** Recording and visualization of key measurements such as weight, BMI, blood glucose, etc.
- **Nutrition Plan Management:** Creation, tracking, and customization of dietary plans.
- **Meal Tracking:** Daily meal logging for better dietary control.
- **Instant Messaging:** Real-time and secure communication with doctors, including file sharing.
- **Doctor Search:** Directory of healthcare professionals with the ability to book appointments.
- **Push Notifications:** Reminders for medication intake, appointments, and other important notifications.
- **Medical Records Management:** Secure storage and consultation of medical documents.

## Getting Started

To run the project locally, follow the steps below.

### Prerequisites

Make sure you have the following tools installed on your machine:

- **Node.js** (>= 18) - [Download Node.js](https://nodejs.org/)
- **npm** or **yarn** (package manager)
- **React Native CLI**
- **JDK** (Java Development Kit) version 11 or higher
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **CocoaPods** (for iOS, macOS only)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/arwa-mili/pfe-front.git
cd pfe-front
```

#### 2. Install dependencies

```bash

yarn install
```

#### 3. Android Configuration

##### Install Android Studio

1. Download and install [Android Studio](https://developer.android.com/studio)
2. Open Android Studio and install the necessary SDKs:
   - Android SDK Platform 33 (or higher)
   - Android SDK Build-Tools
   - Android Emulator

##### Configure environment variables

Add the following lines to your `~/.bashrc`, `~/.zshrc`, or `~/.bash_profile` file:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk  

export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Then reload your configuration:

```bash
source ~/.bashrc  # or ~/.zshrc
```


#### 4. Run the application

##### For Android & IOS

```bash

# or
yarn start

# or
yarn android
```

#### 5. Available scripts

```bash
# Start the Metro bundler
yarn start

# Run on Android
yarn run android



# Check code with ESLint
yarn run lint
```

### Troubleshooting

#### Common issues

**Error: "Unable to load script"**
```bash
# Clear cache and restart
npm start -- --reset-cache
```

**Android build error**
```bash
# Clean the Android project
cd android
./gradlew clean
cd ..
```



**Reinstall all dependencies**
```bash
# Remove node_modules and reinstall
rm -rf node_modules
yarn install
```

## Architecture

The project architecture is designed to be modular, scalable, and maintainable. It is based on the following principles:

- **Feature-based project structure:** The source code is organized in the `src/features` folder, where each major application feature (authentication, profile, chat, etc.) has its own directory. This allows for better separation of concerns and facilitates maintenance.
- **Centralized state management with Redux:** The global application state is managed by Redux Toolkit, which provides a simplified and efficient way to manage state. Redux Persist is used to save certain parts of the state (such as user information and authentication token) in the device's local storage.
- **API layer with RTK Query:** Communication with the backend is handled by RTK Query, a powerful data fetching and caching library for Redux. It simplifies API request management, data caching, and error handling.
- **Navigation with React Navigation:** Navigation between different application screens is managed by React Navigation. The application is divided into several navigation stacks (for authentication, main flow, and doctor flow) for clear screen organization.
- **Reusable components:** Reusable UI components are placed in the `src/components` folder, which promotes visual consistency and code reuse.
- **Internationalization:** The application is designed to be multilingual using the `i18next` library.

## Technologies Used

The project uses a set of modern technologies for mobile application development:

| Category              | Technology                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------- |
| **Framework**         | [React Native](https://reactnative.dev/)                                                                |
| **Language**          | [TypeScript](https://www.typescriptlang.org/)                                                           |
| **State Management**  | [Redux Toolkit](https://redux-toolkit.js.org/), [Redux Persist](https://github.com/rt2zz/redux-persist) |
| **Navigation**        | [React Navigation](https://reactnavigation.org/)                                                        |
| **UI**                | [React Native Elements](https://reactnativeelements.com/), [React Native Paper](https://reactnativepaper.com/) |
| **API Communication** | [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)                                              |
| **Notifications**     | [@notifee/react-native](https://notifee.app/)                                                           |
| **Real-time**         | [Pusher](https://pusher.com/), [Socket.io](https://socket.io/)                                           |
| **Internationalization**| [i18next](https://www.i18next.com/)                                                                     |
| **Forms**             | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)                                 |
| **Charts**            | [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit)                         |
| **Local Storage**     | [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)                             |
