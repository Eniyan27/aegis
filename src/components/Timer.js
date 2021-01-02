import React, {useState, useEffect} from 'react';
import {View, Text, Button, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

const Timer = ({props}) => {
  // const {initialMinute = 0, initialSeconds = 0} = props;
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(60);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  // Must be outside of any component LifeCycle (such as `componentDidMount`).
  PushNotification.configure({
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'android',
  });

  const sendNotif = () => {
    console.log('Sending notif');
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: 'AEGIS', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
      ticker: 'My Notification Ticker', // (optional)
      vibrate: true, // (optional) default: true
      priority: 'max',
      vibration: 1000, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
      message: 'Signal received ! SMS will be sent',
      playSound: true,
      soundName: 'default',
    });
  };

  return (
    <View>
      {minutes === 0 && seconds === 0 ? null : (
        <Text>
          {' '}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Text>
      )}
      <Button title="Press mee" onPress={() => sendNotif()} />
    </View>
  );
};

export default Timer;
