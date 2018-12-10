import { combineReducers } from "redux";
import { LOAD } from "./actions";
import { socketActions, slowSocketActions } from "../socketActions";

const ADD = "ADD";
const SPEND = "SPEND";
const CREATE = "CREATE";
const DELETE = "DELETE";

export const actions = {
  ...socketActions({
    addString: [ADD, "id"],
    spendString: [SPEND, "id"],
    deleteString: [DELETE, "id"]
  }),
  ...slowSocketActions({
    createString: [CREATE, "to", "from"]
  })
};

export const messages = {
  [ADD]: "{string:from:id} gained a string on {string:to:id}",
  [CREATE]: "{character:from} gained a string on {character:to}",
  [SPEND]: "{string:from:id} spent a string on {string:to:id}",
  [DELETE]: "{string:from:id} spent a strong on {string:to:id}"
};

export const reducer = combineReducers({
  ids: (state = null, action) => {
    switch (action.type) {
      case LOAD:
        return action.strings;
      case CREATE:
        return [...state, action.id];
      default:
        return state;
    }
  },
  byId: (state = null, action) => {
    switch (action.type) {
      case LOAD:
        return action.stringsById;
      case ADD: {
        const string = state[action.id];
        return {
          ...state,
          [action.id]: {
            ...string,
            value: string.value + 1
          }
        };
      }
      case SPEND: {
        const string = state[action.id];
        return {
          ...state,
          [action.id]: {
            ...string,
            value: string.value - 1
          }
        };
      }
      case CREATE:
        return {
          ...state,
          [action.id]: {
            to: action.to,
            from: action.from,
            value: action.value
          }
        };
      default:
        return state;
    }
  }
});

const getById = state => state.byId;
const getIds = state => state.ids;
const get = (state, id) => getById(state)[id];

export const selectors = {
  get,
  getIds,
  getById
};
