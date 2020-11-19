import {CONTACTS, DELETE_CONTACT, LOGGED_IN, SET_CONTACTS} from '../types';
// import {initialState} from '../index'

const initState = {
  isLoggedIN: false,
  contacts: [],
  chosenContacts: [],
};

export const user = (state = initState, action) => {
  if (action.type === undefined) {
    return state;
  }
  switch (action.type) {
    case LOGGED_IN:
      return {...state, isLoggedIN: true};
    case CONTACTS:
      return {...state, contacts: action.payload};
    case SET_CONTACTS:
      return {
        ...state,
        chosenContacts: state.chosenContacts.concat(action.payload),
      };
    case DELETE_CONTACT:
      return {
        ...state,
        chosenContacts: state.chosenContacts.filter(
          (contact) => contact !== action.payload,
        ),
      };
    default:
      return state;
  }
};

// export const loggedIN = (state = initState, action) => {
//   if (action.type === undefined) {
//     return state;
//   }
//   switch (action.type) {
//     case LOGGED_IN:
//       return {...state, isLoggedIN: true};
//     default:
//       return state;
//   }
// };

// export const contacts = (state = initState, action) => {
//   if (action.type === undefined) {
//     return state;
//   }
//   switch (action.type) {
//     case CONTACTS:
//       return {...state, contacts: action.payload};
//     default:
//       return state;
//   }
// };

// export const setContacts = (state = initState, action) => {
//   if (action.type === undefined) {
//     return state;
//   }
//   switch (action.type) {
//     case SET_CONTACTS:
//       return {
//         ...state,
//         chosenContacts: state.chosenContacts.concat(action.payload),
//       };
//     default:
//       return state;
//   }
// };

// export const deleteContacts = (state = initState, action) => {
//   if (action.type === undefined) {
//     return state;
//   }

//   switch (action.type) {
//     case DELETE_CONTACT:
//       return {
//         ...state,
//         chosenContacts: state.chosenContacts.filter(
//           (contact) => contact !== action.payload,
//         ),
//       };
//     default:
//       return state;
//   }
// };
