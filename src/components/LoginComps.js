import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements';
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
        <Button
          title="Login with Facebook"
          onPress={() =>
            loginWithFB()
              .then(() => {
                navigation.navigate('Success');
              })
              .catch((err) => console.log(err))
          }
          icon={{
            type: 'material',
            name: 'facebook',
          }}
        />
        <GoogleSigninButton
          style={styles.fb}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
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
    paddingTop: '80%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
  },
  fb: {
    marginTop: 10,
    paddingTop: '13%',
    width: 205,
    height: 48,
  },
});

export default LoginComps;
