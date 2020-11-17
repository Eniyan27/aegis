import {LOGGED_IN, CONTACTS, SET_CONTACTS} from '../types';

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

export const updateContacts = (contact) => {
  return {
    type: SET_CONTACTS,
    payload: contact,
  };
};
