import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {loggedIn} from '../utils/helpers';
import LoginComps from './LoginComps';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PhoneSignIn, {CodeConfirmation} from './PhoneSignIn';

// import Firebase from '../utils/firebase';

const Stack = createStackNavigator();
function Login() {
  if (!loggedIn()) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Getting started</Text>
        <LoginComps />
      </View>
    );
  } else {
    return (
      <View>
        <Text>Aegis</Text>
      </View>
    );
  }
}

function LoginPage() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Phone Number sign in" component={PhoneSignIn} />
        <Stack.Screen name="Confirm Code" component={CodeConfirmation} />
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
});

export default LoginPage;
