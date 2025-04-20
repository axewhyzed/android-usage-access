# Android Usage Access React Native App
A React Native application that demonstrates how to request and utilize Android's Usage Access permission to display screen time usage for apps installed on the device. This project includes custom native modules and showcases how to bridge Android usage statistics into a React Native app.

# About
This app demonstrates how to access and display screen time usage statistics for Android apps by leveraging the Usage Access permission. It includes a custom native module written in Kotlin, bridged to React Native, allowing JavaScript code to access device usage stats.

# Features
- Requests and manages Android Usage Access permission
- Displays screen time usage for installed apps with last used time
- Custom React Native native module for accessing usage stats

# Installation
bash
git clone https://github.com/yourusername/android_usage_access.git
cd android_usage_access
npm install
Running the App
bash
npx react-native run-android
Usage
Launch the app on your Android device or emulator.

The app will prompt you to grant Usage Access permission.

Grant the permission in Android settings when prompted.

The app will display screen time usage statistics for installed apps.

Project Structure
File/Folder	Description
src/native/AndroidUsageAccess.ts	JS interface for the native usage access module
android/app/src/main/java/.../AndroidUsageAccessModule.kt	Kotlin native module implementation
android/app/src/main/java/.../AndroidUsageAccessPackage.kt	Package provider for the native module
android/app/src/main/AndroidManifest.xml	Declares required permissions and services
android/app/src/main/java/.../MainApplication.kt	Registers the native package
Permissions
This app requires the Usage Access permission to retrieve app usage statistics. Users will be prompted to grant this permission, which can also be managed via:

Settings > Apps > Special app access > Usage Access > [Your App] > Allow usage access.

Contributing
Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

License
MIT

Note:
This app is intended for educational and demonstration purposes only. Usage Access permission allows apps to access sensitive device usage data; always inform users and handle data responsibly.

Inspired by best practices from open-source React Native templates and Android permission management guides.