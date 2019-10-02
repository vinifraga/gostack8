import Reactotron from 'reactotron-react-native';

// run adb reverse tcp:9090 tcp:9090 if not connecting
if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
