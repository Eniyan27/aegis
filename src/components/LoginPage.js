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
import Communications from 'react-native-communications';

const Stack = createStackNavigator();

// Components

function Login() {
  if (isLoggedIn()) {
    return (
      <View style={styles.main}>
        <Button title="Aegis" />
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
