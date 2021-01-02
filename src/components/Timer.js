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

  const sendNotif = () => {
    console.log('Sending notif');
    PushNotification.localNotification({
      vibrate: true, // (optional) default: true
      priority: 'high',
      vibration: 1000, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
      message: 'Signal received ! SMS will be sent',
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
