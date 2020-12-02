/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BluetoothSerial from 'react-native-bluetooth-serial';
const MyHeadlessTask = async () => {
  BluetoothSerial.readFromDevice()
    .then((res) => {
      if (res.length > 1) {
        console.log('SMS sent');
      } else {
        console.log(res);
      }
      // console.log(res);
    })
    .catch((err) => console.log(err));
};

AppRegistry.registerHeadlessTask('Location', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => App);
