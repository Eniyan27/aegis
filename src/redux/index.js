import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {allReducers} from './reducers';
import {
  getFirebase,
  reactReduxFirebase,
  createFirebaseInstance,
} from 'react-redux-firebase';
import {getFirestore} from 'redux-firestore';
import {rrfConfig} from '../../App';
import firebase from '@react-native-firebase/app';

const store = createStore(
  allReducers,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    // createFirebaseInstance(firebase, rrfConfig),
  ),
);
export {store};
