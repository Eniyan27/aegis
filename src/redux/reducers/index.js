import {combineReducers} from 'redux';
import {user} from './reducers';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
export const allReducers = combineReducers({
  user,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
