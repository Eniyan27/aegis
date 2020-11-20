/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import LoginPage from './src/components/LoginPage';
import {store} from './src/redux';
// import firebase from '@react-native-firebase/app';
import firebase from 'firebase/app';
// import firestore from '@react-native-firebase/firestore';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import FirebaseApp from '@react-native-firebase/app';
import {createFirestoreInstance} from 'redux-firestore';

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
