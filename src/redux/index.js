import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {allReducers} from './reducers';
import {getFirebase, createFirebaseInstance} from 'react-redux-firebase';
import {getFirestore} from 'redux-firestore';
import {rrfConfig} from '../../App';
import firebase from 'firebase/app';

const store = createStore(
  allReducers,
  // compose(
  //   createFirebaseInstance(firebase, rrfConfig),
  //   applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //     window.__REDUX_DEVTOOLS_EXTENSION__(),
  // ),
);
export {store};
