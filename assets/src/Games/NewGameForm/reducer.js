import { combineReducers } from 'redux';
import {
  GAMES_NEW_SET_INPUT,
  GAMES_NEW_SET_KIND,
  GAMES_NEW_SET_NAME,
  GAMES_NEW_STEP_BACK,
  GAMES_NEW_RESET,
  GAMES_NEW_SUBMIT,
  GAMES_NEW_SUBMIT_FAIL
} from "common/actions";

// const setter = (actionType, property, defaultValue = null) => (state = defaultValue, action) => {
//   switch (action.type) {
//     case actionType:
//       return action[property];
//     default:
//       return state;
//   }
// } 

const initialState = {
  input: "",
  name: null,
  player: null,
  kind: null,
};

export default combineReducers({
  form: (state = initialState, action) => {
    switch (action.type) {
      case GAMES_NEW_SET_INPUT:
        return {
          ...state,
          input: action.input
        };
      case GAMES_NEW_SET_KIND:
        return {
          ...state,
          kind: action.kind,
          input: (state.name === null) ? "" : state.name,
          name: null
        };
      case GAMES_NEW_SET_NAME:
        return {
          ...state,
          name: state.input,
          input: (state.player === null) ? "" : state.player,
          player: null
        }
      case GAMES_NEW_STEP_BACK:
        if (state.name !== null) return {
          ...state,
          player: (state.input !== "") ? state.input : null,
          input: state.name,
          name: null
        }
        else if (state.kind !== null) return {
          ...state,
          name: (state.input !== "") ? state.input : null,
          input: "",
          kind: null
        }
        else return state;
      case GAMES_NEW_RESET:
        return initialState;
      default:
        return state;
    }
  },

  loading: (state = false, action) => {
    switch(action.type) {
      case GAMES_NEW_SUBMIT:
        return true;
      case GAMES_NEW_RESET:
        return false;
      default:
        return state;
    }
  },

  failed: (state = false, action) => {
    switch(action.type) {
      case GAMES_NEW_SUBMIT_FAIL:
        return true;
      case GAMES_NEW_RESET:
      case GAMES_NEW_SUBMIT:
        return false;
      default:
        return state;
    }
  }
})