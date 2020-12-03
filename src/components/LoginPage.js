import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import {isLoggedIn} from '../utils/helpers';
import LoginComps from './LoginComps';
import Contacts from 'react-native-contacts';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import anim from '../assets/8222-success.json';
import {createStackNavigator} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import {Avatar, Button, ListItem} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import ChooseContacts from './ChooseContacts';
import {hasContacts, updateContacts} from '../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import Allset from './Allset';
import firebase from 'firebase/app';
import Location from './Location';
import PushNotification from 'react-native-push-notification';
import BLE from './BLE';

const Stack = createStackNavigator();
// Components

function Login() {
  const sendNotif = () => {
    console.log('Sending notif');
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: 'AEGIS', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
      ticker: 'My Notification Ticker', // (optional)
      showWhen: true, // (optional) default: true
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      priority: 'high', // (optional) set notification priority, default: high
      visibility: 'public', // (optional) set notification visibility, default: private
      ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)
      shortcutId: 'shortcut-id', // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
      onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
      when: null, // (optional) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: true, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
      actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
      message: 'My Notification Message',
    });
  };
  if (!isLoggedIn()) {
    return (
      <View style={styles.main}>
        <BLE />
        <Button title="Aegis" onPress={() => Location.startService()} />
        <Button title="Send notif" onPress={() => sendNotif()} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Getting started</Text>
        <LoginComps />
      </View>
    );
  }
}
function Success() {
  const navigation = useNavigation();
  return (
    <View>
      <LottieView
        source={anim}
        loop={false}
        autoPlay={true}
        style={styles.success}
      />
      <Button
        type="outline"
        onPress={() => navigation.navigate('Choose contacts')}
        title="Let's Go"
      />
    </View>
  );
}

function ListContacts() {
  const contacts = useSelector((state) => state.user?.contacts);
  const dispatch = useDispatch();
  return (
    <ScrollView>
      {contacts.map((contact) => (
        <ListItem
          key={contact.rawContactId}
          onPress={() => dispatch(updateContacts(contact))}>
          {contact.hasThumbnail ? (
            <Avatar source={{uri: contact?.thumbnailPath}} />
          ) : (
            <Avatar
              rounded
              title={contact.displayName[0]}
              activeOpacity={0.7}
            />
          )}
          <ListItem.Content>
            <ListItem.Title>{contact.displayName}</ListItem.Title>
            <ListItem.Subtitle>
              {contact.phoneNumbers[0]?.number}
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </ScrollView>
  );
}

function ContactsChooser() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.user.contacts);
  const state = useSelector((state) => state);
  // console.log(state);
  const chosenContacts = useSelector((state) => state.user.chosenContacts);
  // console.log(chosenContacts);

  const [choosenContacts, setChoosenContacts] = useState([]);
  useEffect(() => {
    try {
      PermissionsAndroid.request(PERMISSIONS.ANDROID.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      }).then(() => {
        Contacts.getAll().then((res) => {
          const sortedData = res.sort(
            (a, b) => a.displayName.toLowerCase() > b.displayName.toLowerCase(),
          );
          dispatch(hasContacts(sortedData));
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (contacts.length === 0) {
    return (
      <View>
        <LottieView
          source={require('../assets/38290-loading-51-monoplane.json')}
          loop={true}
          autoPlay={true}
          style={styles.success}
        />
      </View>
    );
  } else {
    return (
      <View>
        <ListContacts />
        <ChooseContacts props={chosenContacts} styles={styles.badge} />
      </View>
    );
  }
}

function LoginPage() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Choose contacts" component={ContactsChooser} />
        <Stack.Screen name="Success" component={Success} />
        <Stack.Screen name="Final Page" component={Allset} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'HelveticaNeue',
    fontWeight: '300',
    fontSize: 40,
    color: 'rgba(255, 255, 255, 255)',
    marginStart: 57,
    textAlign: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'flex-start',
    paddingTop: 166,
    flex: 1,
    backgroundColor: '#423D3D',
  },
  success: {
    margin: 'auto',
    padding: 'auto',
    width: 'auto',
    height: 'auto',
    justifyContent: 'center',
    display: 'flex',
    alignContent: 'center',
  },
  badge: {
    // elevation: 2,
    flex: 1,
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  main: {
    margin: 'auto',
    padding: 'auto',
    width: 'auto',
    height: 'auto',
    justifyContent: 'center',
    display: 'flex',
    alignContent: 'center',
  },
});

export default LoginPage;
