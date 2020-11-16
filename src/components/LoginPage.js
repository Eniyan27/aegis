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
import {Avatar, Button, Icon, ListItem} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

// Components
function Login() {
  if (isLoggedIn()) {
    return (
      <View>
        <Text>Aegis</Text>
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

function ContactsChooser() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    try {
      PermissionsAndroid.request(PERMISSIONS.ANDROID.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      }).then(() => {
        Contacts.getAll().then((res) => setContacts(res));
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <ScrollView>
      {contacts.map((contact) => (
        <ListItem key={contact.rawContactId}>
          {contact.hasThumbnail ? (
            <Avatar source={contact.thumbnailPath} />
          ) : (
            <Icon name="user" type="font-awesome-5" />
          )}

          <ListItem.Title>{contact.displayName}</ListItem.Title>
        </ListItem>
      ))}
    </ScrollView>
  );
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
});

export default LoginPage;
