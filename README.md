# Cloud-Computing
## Requirement
### Environment [IMPORTANT]

***Please follow this [tutorial](https://facebook.github.io/react-native/docs/getting-started) react-native-cli to build and test the environment.***

### Installation


First, clone the project.
```
git clone git@github.com:demoswx/Cloud-Computing.git
cd Cloud-Computing
```


Second, build the environment.

`npm install` or `yarn`



Last, make sure the project is clean and build it with a mobile device or virtual machine connected by adb or lan.
> You can run `adb devices` to check the connectivity.

```
npm run clean
npm run android
```
or
```
yarn clean
yarn android
```
## IOS


Please make a double check for ios environment setup (https://facebook.github.io/react-native/docs/getting-started).

Then,

```
cd ios && pod install && cd ..
npm run ios
```
or
```
cd ios && pod install && cd ..
yarn ios
```

or `npm` can be replaced by newest `npx` version
