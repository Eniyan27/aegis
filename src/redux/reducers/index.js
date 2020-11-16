import {combineReducers} from 'redux';
import {loggedIN, setContacts} from './login';
import {nextStep, prevStep} from './step';

export const allReducers = combineReducers({
  loggedIN,
  setContacts,
  nextStep,
  prevStep,
});
