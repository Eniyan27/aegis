import React, {useState, useEffect} from 'react';
import {View, Text, Button, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import KeyEvent from 'react-native-keyevent';
export var timer;
const Timer = ({props}) => {
  // const {initialMinute = 0, initialSeconds = 0} = props;
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(60);
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'AEGIS', // (required)
        channelName: 'Aegis companion', // (required)
        channelDescription: 'Emergency messages', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
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
    KeyEvent.onKeyDownListener((event) => console.log(event));
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  const sendNotif = () => {
    console.log('Sending notif');
    timer = setTimeout(() => {
      console.log('SMS sent');
    }, 30000);
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
