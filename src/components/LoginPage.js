import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  ImageBackground,
  Image,
} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import {isLoggedIn} from '../utils/helpers';
import LoginComps from './LoginComps';
import Contacts from 'react-native-contacts';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import anim from '../assets/8659-success-tick.json';
import {createStackNavigator} from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import {Avatar, Button, ListItem, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import ChooseContacts from './ChooseContacts';
import {hasContacts, updateContacts} from '../redux/actions';
import {useSelector, useDispatch} from 'react-redux';
import Allset from './Allset';
import Maps from './Maps';
import LinearGradient from 'react-native-linear-gradient';
import KeyEvent from 'react-native-keyevent';

const Stack = createStackNavigator();
// Components

function Login() {
  useEffect(() => {
    KeyEvent.onKeyDownListener((keyEvent) => {
      console.log(`onKeyDown keyCode: ${keyEvent.keyCode}`);
      console.log(`Action: ${keyEvent.action}`);
      console.log(`Key: ${keyEvent.pressedKey}`);
    });
  }, []);
  if (isLoggedIn()) {
    return (
      <View style={styles.main}>
        <Maps />
        {/* <BLE /> */}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri:
              'https://firebasestorage.googleapis.com/v0/b/aegis-fbe56.appspot.com/o/bg.jpg?alt=media&token=092c36d0-4d7b-4c5e-94d3-484641f63beb',
          }}
          style={styles.image}>
          <Text h1 style={styles.heading}>
            Getting started
          </Text>
          <LoginComps />
        </ImageBackground>
      </View>
    );
  }
}
function Success() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            'https://firebasestorage.googleapis.com/v0/b/aegis-fbe56.appspot.com/o/bg.jpg?alt=media&token=092c36d0-4d7b-4c5e-94d3-484641f63beb',
        }}
        style={styles.image}>
        <LottieView
          source={anim}
          loop={false}
          autoPlay={true}
          style={styles.success}
        />
        <Text style={styles.successText}>
          You are now successfully logged in !
        </Text>
        {/* <LinearGradient
        colors={['#4c669f', '#3b5
        998', '#192f6a']}
        style={styles.linearGradient}>
        <Text style={styles.buttonText}>Sign in with Facebook</Text>
      </LinearGradient> */}
        <Button
          type="outline"
          onPress={() => navigation.navigate('Choose contacts')}
          title="Let's Go"
        />
      </ImageBackground>
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
      })
        .then(() => {
          Contacts.getAll().then((res) => {
            const sortedData = res.sort((a, b) => {
              if (a === null) {
                return 1;
              } else if (b === null) {
                return -1;
              } else {
                return a.displayName.toLowerCase() > b.displayName.toLowerCase()
                  ? -1
                  : 1;
              }
            });
            dispatch(hasContacts(sortedData));
          });
        })
        .catch((err) => console.log(err));
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
    paddingTop: 270,
    textAlign: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  success: {
    margin: 'auto',
    padding: 'auto',
    width: '50%',
    height: '50%',
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

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  successText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
  },
});

export default LoginPage;
