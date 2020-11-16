import {CONTACTS, LOGGED_IN} from '../types';

export const loggedIN = (state = {isLoggedIN: false}, action) => {
  if (action.type === undefined) {
    return state;
  }
  switch (action.type) {
    case LOGGED_IN:
      return {...state, isLoggedIN: true};
    default:
      return state;
  }
};

export const setContacts = (state = {contacts: []}, action) => {
  if (action.type === undefined) {
    return state;
  }
  switch (action.type) {
    case CONTACTS:
      return {...state, contacts: action.payload};
    default:
      return state;
  }
};
