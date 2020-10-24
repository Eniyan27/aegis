import firebase from '@react-native-firebase/app';

var firebaseConfig = {
  apiKey: 'AIzaSyALXisGgBIp3rGrpt9dI-4kS5CqyHlM1xo',
  authDomain: 'aegis-fbe56.firebaseapp.com',
  databaseURL: 'https://aegis-fbe56.firebaseio.com',
  projectId: 'aegis-fbe56',
  storageBucket: 'aegis-fbe56.appspot.com',
  messagingSenderId: '977661298541',
  appId: '1:977661298541:web:27a245764ff1470a52bc64',
  measurementId: 'G-136JVFHXKD',
};

const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;
