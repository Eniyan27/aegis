/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import LoginPage from './src/components/LoginPage';
import {store} from './src/redux';
import firebase from 'firebase/app';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import {createFirestoreInstance} from 'redux-firestore';
import PERMISSIONS from 'react-native-permissions';

export var firebaseConfig = {
  apiKey: 'AIzaSyALXisGgBIp3rGrpt9dI-4kS5CqyHlM1xo',
  authDomain: 'aegis-fbe56.firebaseapp.com',
  databaseURL: 'https://aegis-fbe56.firebaseio.com',
  projectId: 'aegis-fbe56',
  storageBucket: 'aegis-fbe56.appspot.com',
  messagingSenderId: '977661298541',
  appId: '1:977661298541:web:27a245764ff1470a52bc64',
  measurementId: 'G-136JVFHXKD',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

const App = () => {
  useEffect(() => {
    async () => {
      try {
        const perm = await PermissionsAndroid.request(
          PERMISSIONS.PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        );
        if (perm === 'granted') {
          Geolocation.getCurrentPosition(
            (pos) => console.log(pos),
            (err) => console.error(err),
          );
        }
      } catch (error) {
        console.warn(error);
      }
    };
  });
  return (
    <>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <LoginPage />
        </ReactReduxFirebaseProvider>
      </Provider>
    </>
  );
};

export default App;
