import React from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import {getContactsMatchingString} from 'react-native-contacts';
import {useFirestore} from 'react-redux-firebase';
async function loginWithFB() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  // Sign-in the user with the credential
  return auth()
    .signInWithCredential(facebookCredential)
    .then((user) => {
      firestore().collection('users').doc(user.user.uid).set({
        user_id: user.user.uid,
        name: user.user.displayName,
        mail: user.user.email,
        contacts: [],
      });
    });
}

async function loginWithGoogle() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth()
    .signInWithCredential(googleCredential)
    .then((user) => {
      firestore().collection('users').doc(user.user.uid).set({
        user_id: user.user.uid,
        name: user.user.displayName,
        mail: user.user.email,
        contacts: [],
      });
    });
}

const loggedIn = () => {
  var user = firebase.auth().currentUser;
  if (user) {
    console.log(`The user : ${user}`);
    return {
      user: user.displayName,
      uid: user.uid,
    };
  } else {
    return null;
  }
};

const data = loggedIn();
console.log(data);

const isLoggedIn = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      return true;
    } else {
      return false;
    }
  });
};

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Signed out');
    })
    .catch((err) => console.error(err));
};

const notificationHandler = (notification, timer) => {
  if (notification.action === 'Cancel') {
    clearTimeout(timer);
    console.log('Cancelled sending sms');
  }
};

export {
  loginWithFB,
  loginWithGoogle,
  loggedIn,
  signOut,
  isLoggedIn,
  notificationHandler,
};
