import {createStore} from 'redux';
import {allReducers} from './reducers';

const store = createStore(allReducers);
console.log(store.getState());
export {store};
