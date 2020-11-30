/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import Geolocation from 'react-native-geolocation-service';

const MyHeadlessTask = async () => {
  // Geolocation.getCurrentPosition(
  //   (pos) => console.log(pos),
  //   (err) => console.error(err),
  // );
  console.log('Listening for Bluetooth signal !');
};

AppRegistry.registerHeadlessTask('Location', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => App);
