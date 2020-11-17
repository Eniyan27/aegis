import {combineReducers} from 'redux';
import {loggedIN, contacts, setContacts} from './login';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
export const allReducers = combineReducers({
  loggedIN,
  contacts,
  setContacts,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
