import { combineReducers } from 'redux';
import * as chatbox from '../chatbox';
import * as colors from './colors';
import prefixedMessages from 'utils/prefixedMessages';
import { prefixedActions, prefixedReducer, prefixedSelectors } from 'redux-state-tools';
import { slowSocketActions, socketActions } from '../socketActions';
import mapObject from 'utils/mapObject';
import update from 'immutability-helper';

const LOAD = "LOAD";
const CHAT = "CHAT";
const MOOD_GLUM = "MOOD_GLUM";
const MOOD_JOVIAL = "MOOD_JOVIAL";
const DICE_PICK_UP = "DICE_PICK_UP";
const DICE_ROLL = "DICE_ROLL";
const DICE_SET_DOWN = "DICE_SET_DOWN";
const DICE_GIVE = "DICE_GIVE";
const DICE_TAKE = "DICE_TAKE";
const PLAYER_TONE_FLIP = "PLAYER_TONE_FLIP";
const PLAYER_JOIN = "PLAYER_JOIN";

export const actions = {
  load: [
    LOAD, 
    "playersById", "playerIds", "me", "overplayer", "diceHolder",
    "charactersById", "characterIds", "dice",
    "jovialColors", "isJovialTextDark", "glumColors", "isGlumTextDark"
  ],
  join: ["PLAYER_JOIN", "player", "character"],
  ...socketActions({
    flipTone: PLAYER_TONE_FLIP,
    makeGlum: MOOD_GLUM,
    makeJovial: MOOD_JOVIAL,
    pickUpDice: DICE_PICK_UP,
    setDownDice: DICE_SET_DOWN,
    giveDice: [DICE_GIVE, "id"],
    takeDice: DICE_TAKE
  }),
  ...slowSocketActions({
    chat: [CHAT, "text"],
    roll: DICE_ROLL
  }),
  ...prefixedActions("CHATBOX", chatbox.actions),
  ...prefixedActions("COLOR", colors.actions)
}

export const types = {
  LOAD,
}

export const messages = {
  [DICE_PICK_UP]: "Picked up the dice.",
  [DICE_GIVE]: "Gave the dice to {player:id}.", 
  [DICE_TAKE]: "Took the dice.",
  [DICE_SET_DOWN]: "Set down the dice.",
  [PLAYER_TONE_FLIP]: "Flipped their tone.",
  [PLAYER_JOIN]: "Joined the game.",
  ...prefixedMessages("COLOR", colors.messages)
}



export const reducer = combineReducers({
  chatbox: prefixedReducer("CHATBOX", chatbox.reducer),
  colors: prefixedReducer("COLOR", colors.reducer, [LOAD]),
  dice: (state = {glum: 0, jovial: 0}, action) => {
    switch(action.type) {
      case LOAD:
        return action.dice;
      case DICE_PICK_UP:
        return null;
      case DICE_ROLL:
        return {
          glum: action.glum,
          jovial: action.jovial
        };
      case DICE_SET_DOWN:
        return {
          glum: 0,
          jovial: 0
        }
      default:
        return state;
    }
  },
  diceHolder: (state = 10, action) => {
    switch(action.type) {
      case LOAD:
        return action.diceHolder;
      case DICE_GIVE:
        return action.id;
      case DICE_TAKE:
        return action.playerId;
      default:
        return state;
    }
  },
  loaded: (state = false, action) => {
    switch(action.type) {
      case LOAD:
        return true;
      case "SOCKET_DISCONNECT":
        return false;
      default:
        return state;
    }
  },
  characterIds: (state = null, action) => {
    switch(action.type) {
      case LOAD:
        return action.characterIds;
      case PLAYER_JOIN:
        return [...state, action.character.id]
      default:
        return state;
    } 
  },
  charactersById: (state = null, action) => {
    switch(action.type) {
      case LOAD:
        return action.charactersById;
      case PLAYER_JOIN:
        return {
          ...state,
          [action.character.id]: action.character
        }
      default:
        return state;
    } 
  },
  playerIds: (state = null, action) => {
    switch(action.type) {
      case LOAD:
        return action.playerIds;
      case PLAYER_JOIN:
        return [...state, action.player.id]
      default: 
        return state;
    } 
  },
  playersById: (state = null, action) => {
    switch(action.type) { 
      case DICE_ROLL: {
        const player = state[action.playerId];
        if (!player.character) {
          return mapObject(state, player => ({
            ...player,
            tone: player.character === null 
              ? ((action.jovial === action.glum) ? !player.tone : (action.jovial > action.glum)) 
              : null
          }));
        }
        if (action.glum === action.jovial) {
          return mapObject(state, player => ({
            ...player,
            tone: player.character === null ? !player.tone : player.tone
          }))
        }
        return update(state, {
          [action.playerId]: {
            tone: {$set: (action.jovial > action.glum)}
          }
        })
      }
      case LOAD:
        return action.playersById;
      case PLAYER_JOIN:
        return {
          ...state,
          [action.player.id]: action.player
        }
      case PLAYER_TONE_FLIP:
        return update(state, {
          [action.playerId]: {
            tone: tone => !tone
          }
        })
      default:
        return state;
    }
  },
  overplayer: (state = 10, action) => {
    switch(action.type) {
      case LOAD:
        return action.overplayer;
      default:
        return state;
    }
  },
  me: (state = null, action) => {
    switch(action.type) {
      case LOAD:
        return action.me;
      default:
        return state;
    }
  },
});

const getIsLoaded = state => state.loaded;
const getMe = state => state.me;
const getPlayerNames = state => mapObject(state.playersById, p => p.name);
const getDice = state => state.dice;
const getDiceHolder = state => state.diceHolder;
const getOverplayerId = state => state.overplayer;
const getPlayer = (state, id) => state.playersById[id];
const getPlayerIds = state => state.playerIds;
const getRoguePlayerIds = state => state
  .playerIds
  .filter(id => state.playersById[id].character);
const getTone = (state, playerId = null) => {
  const overtone = !!getPlayer(state, getOverplayerId(state)).tone;
  if (!playerId) return overtone;
  const tone = getPlayer(state, playerId).tone;
  if (tone === null) return overtone;
  return tone;
}
const getCharacter = (state, id) => state.charactersById[id];
const getCharacterName = (state, id) => {
  const player = getPlayer(state, id);
  if (!player.character) return "Overplayer";
  const { name } = getCharacter(state, player.character);
  return name || `%{player.name}'s Rogue`;
}

export const selectors = {
  getDice,
  getCharacterName,
  getIsLoaded,
  getDiceHolder,
  getMe,
  getOverplayerId,
  getPlayer,
  getPlayerIds,
  getPlayerNames,
  getRoguePlayerIds,
  getTone,
  ...prefixedSelectors("colors", colors.selectors),
  ...prefixedSelectors("chatbox", chatbox.selectors)
};