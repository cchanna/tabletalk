import { combineReducers } from 'redux';
import * as chatbox from '../chatbox';
import * as colors from './colors';
import * as characters from './characters';
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
const OVERTONE_FLIP = "OVERTONE_FLIP";
const PLAYER_JOIN = "PLAYER_JOIN";
const MOTIF_EDIT = "MOTIF_EDIT";
const THREAD_CREATE = "THREAD_CREATE";
const THREAD_DELETE = "THREAD_DELETE";
const THREAD_UPDATE = "THREAD_UPDATE";

export const actions = {
  load: [
    LOAD, 
    "playersById", "playerIds", "me", "overplayer", "diceHolder",
    "charactersById", "characterIds", "dice", "overtone",
    "jovialColors", "isJovialTextDark", "glumColors", "isGlumTextDark",
    "motifs", "threadsById", "threadIds"
  ],
  join: ["PLAYER_JOIN", "player", "character"],
  ...socketActions({
    flipOvertone: OVERTONE_FLIP,
    makeGlum: MOOD_GLUM,
    makeJovial: MOOD_JOVIAL,
    pickUpDice: DICE_PICK_UP,
    setDownDice: DICE_SET_DOWN,
    giveDice: [DICE_GIVE, "id"],
    takeDice: DICE_TAKE,
    editMotif: [MOTIF_EDIT, "index", "item", "value"],
    updateThread: [THREAD_UPDATE, "id", "text"],
    deleteThread: [THREAD_DELETE, "id"]
  }),
  ...slowSocketActions({
    chat: [CHAT, "text"],
    roll: DICE_ROLL,
    createThread: [THREAD_CREATE, "text"]
  }),
  ...prefixedActions("CHATBOX", chatbox.actions),
  ...prefixedActions("COLOR", colors.actions),
  ...prefixedActions("CHARACTER", characters.actions)
}

export const types = {
  LOAD,
}

export const messages = {
  [DICE_PICK_UP]: "Picked up the dice.",
  [DICE_GIVE]: "Gave the dice to {player:id}.", 
  [DICE_TAKE]: "Took the dice.",
  [DICE_SET_DOWN]: "Set down the dice.",
  [OVERTONE_FLIP]: "Flipped the overtone.",
  [PLAYER_JOIN]: "Joined the game.",
  [MOTIF_EDIT]: ({value}) => value ? `Recorded a motif: "${value}"` : `Erased a motif.`,
  [THREAD_CREATE]: ({thread}) => `Recorded a new thread: "${thread.text}"`,
  [THREAD_DELETE]: "Deleted a thread.",
  [THREAD_UPDATE]: `Updated a thread. It now reads: "{text}"`,
  ...prefixedMessages("COLOR", colors.messages),
  ...prefixedMessages("CHARACTER", characters.messages)
}



export const reducer = combineReducers({
  chatbox: prefixedReducer("CHATBOX", chatbox.reducer),
  colors: prefixedReducer("COLOR", colors.reducer, [LOAD]),
  characters: prefixedReducer("CHARACTER", characters.reducer, [LOAD, PLAYER_JOIN]),
  dice: (state = {glum: 0, jovial: 0}, action) => {
    switch(action.type) {
      case LOAD:
        return action.dice;
      case DICE_PICK_UP:
        return null;
      case DICE_ROLL:
        return {
          glum: action.glum,
          jovial: action.jovial,
          tone: (action.glum === action.jovial) 
            ? null
            : (action.jovial > action.glum) 
        };
      case DICE_SET_DOWN:
        return {
          glum: 0,
          jovial: 0,
          tone: null
        }
      case OVERTONE_FLIP:
        return state && update(state, {
          tone: {$set: null}
        });
      default:
        return state;
    }
  },
  overplayer: (state = null, action) => {
    switch(action.type) {
      case LOAD:
        return {
          id: action.overplayer,
          tone: action.overtone
        }
      case DICE_ROLL: 
        if (action.jovial === action.glum) {
          return update(state, {
            tone: tone => !tone
          });
        }
        if (action.playerId === state.id)  {
          return update(state, {
            tone: {$set: action.jovial > action.glum}
          });
        }
        return state;
      case OVERTONE_FLIP:
        return update(state, {
          tone: tone => !tone
        });
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
      case LOAD:
        return action.playersById;
      case PLAYER_JOIN:
        return {
          ...state,
          [action.player.id]: action.player
        }
      default:
        return state;
    }
  },
  motifs: (state = null, action) => {
    switch(action.type) {
      case LOAD:
        return action.motifs;
      case MOTIF_EDIT:
        return update(state, {
          [action.index]: {
            items: {
              [action.item]: {$set: action.value}
            }
          }
        })
      default: 
        return state;
    } 
  },
  threadIds: (state = null, action) => {
    switch(action.type) {
      case LOAD:
        return action.threadIds;
      case THREAD_CREATE:
        return [...state, action.thread.id];
      case THREAD_DELETE:
        return state.filter(id => id !== action.id);
      default: 
        return state;
    } 
  },
  threadsById: (state = null, action) => {
    switch(action.type) { 
      case LOAD:
        return action.threadsById;
      case THREAD_CREATE:
        return {
          ...state,
          [action.thread.id]: action.thread
        }
      case THREAD_DELETE:
        return update(state, {
          $unset: [action.id]
        });
      case THREAD_UPDATE:
        return update(state, {
          [action.id]: {
            text: {$set: action.text}
          }
        })
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
const getOverplayerId = state => state.overplayer.id;
const getPlayer = (state, id) => state.playersById[id];
const getPlayerIds = state => state.playerIds;
const getRoguePlayerIds = state => state
  .playerIds
  .filter(id => state.playersById[id].character);
const getActiveCharacterIds = state => getRoguePlayerIds(state)
  .map(id => state.playersById[id].character);
const getOvertone = state => state.overplayer.tone;
const getDiceTone = state => {
  const dice = getDice(state);
  if (!dice || dice.tone === null) return getOvertone(state);
  return dice.tone; 
}

const fromCharacters = prefixedSelectors("characters", characters.selectors);

const getCharacterName = (state, id) => {
  const character = fromCharacters.getCharacter(state, id);
  if (character.name) return character.name;
  const player = getPlayer(state, character.playerId);
  return `${player.name}'s Rogue`;
}

const getMotifs = state => state.motifs.map(({items, reincorporatedBy}) => ({
  items,
  reincorporatedBy: reincorporatedBy && getCharacterName(reincorporatedBy)
}));
const getThreads = state => state.threadIds.map(id => {
  const { text, reincorporatedBy } = state.threadsById[id];
  return {
    text, id,
    reincorporatedBy: reincorporatedBy && getCharacterName(reincorporatedBy)
  }
})

export const selectors = {
  getActiveCharacterIds,
  getCharacterName,
  getDice,
  getIsLoaded,
  getDiceHolder,
  getMe,
  getMotifs,
  getOverplayerId,
  getPlayer,
  getPlayerIds,
  getPlayerNames,
  getThreads,
  getOvertone,
  getDiceTone,
  ...prefixedSelectors("colors", colors.selectors),
  ...prefixedSelectors("chatbox", chatbox.selectors),
  ...fromCharacters
};