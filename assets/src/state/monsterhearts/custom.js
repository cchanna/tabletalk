import { socketActions } from "../socketActions";
import { combineReducers } from "redux";
import update from "immutability-helper";

const PLAYBOOK_EDIT = "PLAYBOOK_EDIT";
const PLAYBOOK_DELETE = "PLAYBOOK_DELETE";
const MOVE_EDIT = "MOVE_EDIT";
const MOVE_DELETE = "MOVE_DELETE";

export const actions = {
  ...socketActions({
    editCustomPlaybook: [PLAYBOOK_EDIT, "name"],
    deleteCustomPlaybook: [PLAYBOOK_DELETE, "name"],
    deleteCustomMove: [MOVE_DELETE, "name"],
    editCustomMove: [MOVE_EDIT, "name", "text", "notes", "playbook"]
  })
};

export const messages = {};

export const reducer = combineReducers({
  playbookNames: (state = [], action) => {
    switch (action.type) {
      case "LOAD":
        return action.custom.playbookNames;
      case "PLAYBOOK_EDIT": {
        const name = action.name
          .split(" ")
          .map(x => x[0].toUpperCase() + x.slice(1))
          .join(" ");
        return state.includes(name) ? state : [...state, name];
      }
      case "PLAYBOOK_DELETE":
        return state.filter(n => n !== action.name);
      default:
        return state;
    }
  },
  moveNames: (state = [], action) => {
    switch (action.type) {
      case "LOAD":
        return action.custom.moveNames;
      case MOVE_EDIT:
        return state.includes(action.name) ? state : [...state, action.name];
      case MOVE_DELETE:
        return state.filter(m => m !== action.name);
      default:
        return state;
    }
  },
  movesByName: (state = {}, action) => {
    switch (action.type) {
      case "LOAD":
        return action.custom.movesByName;
      case MOVE_EDIT:
        return update(state, {
          [action.name]: {
            $set: {
              name: action.name,
              playbook: action.playbook,
              text: action.text,
              notes: action.notes
            }
          }
        });
      default:
        return state;
    }
  }
});

export const selectors = {
  getCustomMoveNames: state => state.moveNames,
  getCustomMoveNamesByPlaybook: state => {
    const result = {};
    for (const name of state.moveNames) {
      const { playbook } = state.movesByName[name];
      if (result[playbook]) {
        result[playbook].push(name);
      } else {
        result[playbook] = [name];
      }
    }
    return result;
  },
  getCustomPlaybookNames: state => state.playbookNames,
  getCustomMovesByName: state => state.movesByName
};
