import {LOGGED_IN, CONTACTS, INCREMENT_STEP, DECREMENT_STEP} from '../types';

export const loggedIN = (uid) => {
  return {
    type: LOGGED_IN,
    payload: uid,
  };
};

export const hasContacts = (contacts) => {
  return {
    type: CONTACTS,
    payload: contacts,
  };
};

export const nextStep = (step) => {
  return {
    type: INCREMENT_STEP,
    payload: step,
  };
};

export const prevStep = (step) => {
  return {
    type: DECREMENT_STEP,
    payload: step,
  };
};
