import {CONTACTS, LOGGED_IN, SET_CONTACTS} from '../types';

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

export const contacts = (state = {contacts: []}, action) => {
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

export const setContacts = (state = {chosenContacts: []}, action) => {
  if (action.type === undefined) {
    return state;
  }
  switch (action.type) {
    case SET_CONTACTS:
      return {
        ...state,
        chosenContacts: state.chosenContacts.concat(action.payload),
      };
    default:
      return state;
  }
};
