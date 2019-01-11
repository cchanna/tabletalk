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
  moveNamesByPlaybook: (state = {}, action) => {
    switch (action.type) {
      case "LOAD":
        return action.custom.moveNamesByPlaybook;
      case "PLAYBOOK_DELETE":
        return update(state, { $unset: [action.name] });
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
              text: action.text,
              notes: action.notes
            }
          }
        });
      case MOVE_DELETE:
        return update(state, {
          $unset: [action.name]
        });
      default:
        return state;
    }
  }
});

export const selectors = {
  getCustomMoveNamesByPlaybook: state => state.moveNamesByPlaybook,
  getCustomPlaybookNames: state => state.playbookNames,
  getCustomMovesByName: state => state.movesByName
};
