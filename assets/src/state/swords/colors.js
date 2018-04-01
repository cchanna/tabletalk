import { combineReducers } from "redux";
import { socketActions } from '../socketActions';

const GLUM_SUGGEST = "GLUM_SUGGEST"
const JOVIAL_SUGGEST = "JOVIAL_SUGGEST"

export const actions = {
  ...socketActions({
    suggestGlum: [GLUM_SUGGEST, "color", "textIsDark"],
    suggestJovial: [JOVIAL_SUGGEST, "color", "textIsDark"],
  })
}

export const reducer = combineReducers({
  glum: (state = null, action) => {
    switch(action.type) {
      case "LOAD":
        return action.glumColors;
      case GLUM_SUGGEST:
        return action.color;
      default:
        return state;
    }
  },
  isGlumTextDark: (state = false, action) => {
    switch(action.type) {
      case "LOAD":
        return action.isGlumTextDark
      case GLUM_SUGGEST:
        return action.textIsDark;
      default:
        return state;
    }
  },
  jovial: (state = null, action) => {
    switch(action.type) {
      case "LOAD":
        return action.jovialColors;
      case JOVIAL_SUGGEST:
        return action.color;
      default:
        return state;
    }
  },
  isJovialTextDark: (state = true, action) => {
    switch(action.type) {
      case "LOAD":
        return action.isJovialTextDark;
      case JOVIAL_SUGGEST:
        return action.textIsDark;
      default:
        return state;
    }
  },
});

export const messages = {
  [GLUM_SUGGEST]: "Suggested a new glum color.",
  [JOVIAL_SUGGEST]: "Suggested a new jovial color."
}

const getGlumColor = state => state.glum;
const getJovialColor = state => state.jovial;
const getGlumText = state => state.isGlumTextDark ? "rgba(0, 0, 0, .75)" : "white";
const getJovialText = state => state.isJovialTextDark ? "rgba(0, 0, 0, .75)" : "white";
const getAreColorsSet = state => !!state.glum && !!state.jovial;

export const selectors = {
  getGlumColor,
  getJovialColor,
  getGlumText,
  getJovialText,
  getAreColorsSet
}