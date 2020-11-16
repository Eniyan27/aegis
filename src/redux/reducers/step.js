import {INCREMENT_STEP, DECREMENT_STEP} from '../actions';

const initialState = {step: 1};

export const nextStep = (state = initialState, action) => {
  if (action.type === undefined) {
    return state;
  }
  switch (action.type) {
    case INCREMENT_STEP:
      return {
        ...state,
        step: state.step + 1,
      };
    default:
      return state;
  }
};

export const prevStep = (state = initialState, action) => {
  if (action.type === undefined) {
    return state;
  }
  switch (action.type) {
    case DECREMENT_STEP:
      return {
        ...state,
        step: state.step - 1,
      };
    default:
      return state;
  }
};
