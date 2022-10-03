This React Native app takes two locations that will take inputs either directly from your device's geolocation or from addresses provided by the user. The addresses are converted to coordinates by using the geocoding API from geocod.io.  The straight-line distance between the two locations is calculated using the Haversine formula.

Note that you need your own account and API key on geocod.io in order to make API calls from this app.  A placeholder for the API Key is hardcoded for the sake of convenience and simplicity in this demo app.  In a production environment, you must secure your API key using other methods instead of having the key hardcoded like in this app.  To use your API key with this app, edit src/components/apiSlice.js by changing API_KEY to the value of your key.

This app requires permission to access your device location if you would like to use your device's location in the app. If you do not want to give location permission or your device cannot return a location, a button is provided to simulate a successful location call. The simulated location is Demens Landing Park in downtown St. Petersburg.

Commands:
'npm install' - Get required packages.
'npx react-native run-android' - Run app on Android.
'npx react-native run-ios' - Run app on iOS.

Additonal commands that are necessary on Macs.
'cd ios' and then 'pod install' - Necessary before building the app for iOS.  Also make sure in XCode that you allow the app to make location permission requests before building it.
'cd android' and then 'chmod +x gradlew' - Necessary before building the app on Android.