import React, {useState} from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import {
  loginWithFB,
  loginWithGoogle,
  signOut,
  loggedIn,
} from '../utils/helpers';
import {LoginButton} from 'react-native-fbsdk';
import {useNavigation} from '@react-navigation/native';

function LoginComps() {
  const [user, setuser] = useState(null);
  const navigation = useNavigation();
  GoogleSignin.configure({
    webClientId:
      '977661298541-9badn5reg7loouepc0j9d45n20pebg9v.apps.googleusercontent.com',
  });
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <LoginButton
          title="Login with Facebook"
          onPress={() =>
            loginWithFB()
              .then(() => {
                navigation.navigate('Success');
              })
              .catch((err) => console.log(err))
          }
        />
        <GoogleSigninButton
          title="Login with Google"
          onPress={() =>
            loginWithGoogle()
              .then(() => {
                navigation.navigate('Success');
              })
              .catch((err) => console.error(err))
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  container: {
    width: '100%',
    height: '100%',
  },
});

export default LoginComps;
