import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

// run adb reverse tcp:9090 tcp:9090 if not connecting
if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .setAsyncStorageHandler(AsyncStorage)
    .connect();

  // eslint-disable-next-line no-console
  console.tron = tron;

  tron.clear();
}
