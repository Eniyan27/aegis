import {
  LOGGED_IN,
  CONTACTS,
  SET_CONTACTS,
  DELETE_CONTACT,
  UPDATE_CONTACTS,
} from '../types';

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

export const uploadContacts = (contacts) => {
  return (dispatch, getState, {getFirestore, getFirebase}) => {
    dispatch({type: UPDATE_CONTACTS, payload: contacts});
    const firestore = getFirestore();
    const firebase = getFirebase();
    firestore.collection('users').doc(firebase.auth.uid).update({
      contacts: contacts,
    });
  };
};

export const deleteContact = (contact) => {
  return {
    type: DELETE_CONTACT,
    payload: contact,
  };
};
