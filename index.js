/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import BluetoothSerial from 'react-native-bluetooth-serial';
import PushNotification from 'react-native-push-notification';
import {notificationHandler} from './src/utils/helpers';
import {timer} from './src/components/Timer';
import {getBTpercent} from './src/redux/actions';
import {store} from './src/redux';

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    notificationHandler(notification, timer);
    console.log('NOTIFICATION:', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

// const sendNotif = () => {
//   console.log('Sending notif');
//   PushNotification.localNotification({
//     // channelId: 'AEGIS', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
//     ticker: 'My Notification Ticker', // (optional)
//     showWhen: true, // (optional) default: true
//     autoCancel: true, // (optional) default: true
//     largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
//     smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
//     vibrate: true, // (optional) default: true
//     vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
//     priority: 'high', // (optional) set notification priority, default: high
//     visibility: 'public', // (optional) set notification visibility, default: private
//     ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
//     shortcutId: 'shortcut-id', // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
//     onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
//     when: null, // (optional) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
//     usesChronometer: true, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
//     timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
//     actions: 'Yes', // (Android only) See the doc for notification actions to know more
//     invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
//     message: 'Signal received ! SMS will be sent in 30 seconds',
//   });
// };

const MyHeadlessTask = async () => {
  BluetoothSerial.readFromDevice()
    .then((res) => {
      if (res.includes('EMERGENCY')) {
        // sendNotif();
        PushNotification.localNotification({
          channelId: 'AEGIS',
          vibrate: true, // (optional) default: true
          priority: 'high',
          ticker: 'Tick tick tick',
          playSound: true,
          importance: 'high',
          soundName: 'default',
          visibility: 'public',
          vibration: 1000, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
          actions: ['Cancel'], // (Android only) See the doc for notification actions to know more
          message: 'Signal received ! SMS will be sent',
          showWhen: true,
          when: Date.now(),
          timeoutAfter: 30000,
          usesChronometer: true, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
        });
        console.log('SMS sent');
      } else if (res == parseInt(res)) {
        console.log(res);
        store.dispatch(getBTpercent(res));
      } else {
        console.log(res);
      }
      console.log(res);
    })
    .catch((err) => console.log(err));
};

AppRegistry.registerHeadlessTask('Location', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => App);
