/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const MyHeadlessTask = async () => {
  navigator.geolocation.getCurrentPosition((location) =>
    console.log(location.coords),
  );
};

AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => App);
