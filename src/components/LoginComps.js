import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import {loginWithFB, loginWithGoogle} from '../utils/helpers';
import {useNavigation} from '@react-navigation/native';
function LoginComps() {
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
              .then((result) => console.log(result))
              .catch((err) => console.log(err))
          }
        />
        <Button
          title="Login with Google"
          onPress={() =>
            loginWithGoogle()
              .then(() => console.log('Google login success !'))
              .catch((err) => console.error(err))
          }
        />
        <Button
          onPress={() => {
            navigation.navigate('Phone Number sign in');
          }}
          title="Phone Number sign in"
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
    backgroundColor: '#6A097D',
    zIndex: 1,
  },
  container: {
    width: '100%',
    height: '100%',
  },
});

export default LoginComps;
