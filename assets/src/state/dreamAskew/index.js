import { combineReducers } from "redux";
import * as chatbox from "../chatbox";
import {
  prefixedActions,
  prefixedReducer,
  prefixedSelectors
} from "redux-state-tools";
import { slowSocketActions, socketActions } from "../socketActions";
import mapObject from "utils/mapObject";
import {
  createSelector,
  createSelectorCreator,
  defaultMemoize
} from "reselect";
import update from "immutability-helper";
import pronounSets from "common/pronouns.json";
import isEqual from "lodash.isequal";

const LOAD = "LOAD";
const CHAT = "CHAT";
const CHARACTER_CREATE = "CHARACTER_CREATE";
const CHARACTER_NAME_SET = "CHARACTER_NAME_SET";
const CHARACTER_LOOK_1_SET = "CHARACTER_LOOK_1_SET";
const CHARACTER_LOOK_2_SET = "CHARACTER_LOOK_2_SET";
const CHARACTER_PRONOUNS_SET = "CHARACTER_PRONOUNS_SET";
const CHARACTER_GENDER_SET = "CHARACTER_GENDER_SET";
const CHARACTER_STYLES_SET = "CHARACTER_STYLES_SET";
const CHARACTER_CHOICES_1_SET = "CHARACTER_CHOICES_1_SET";
const CHARACTER_CHOICES_2_SET = "CHARACTER_CHOICES_2_SET";
const CHARACTER_KEY_RELATIONSHIPS_SET = "CHARACTER_KEY_RELATIONSHIPS_SET";
const CHARACTER_NOTES_SET = "CHARACTER_NOTES_SET";
const PLAYER_JOIN = "PLAYER_JOIN";
const PLAYER_TOKEN_GAIN = "PLAYER_TOKEN_GAIN";
const PLAYER_TOKEN_SPEND = "PLAYER_TOKEN_SPEND";
const SETTING_CREATE = "SETTING_CREATE";
const SETTING_PICK_UP = "SETTING_PICK_UP";
const SETTING_GIVE_AWAY = "SETTING_GIVE_AWAY";
const SETTING_DESIRES_SET = "SETTING_DESIRES_SET";
const SETTING_NOTES_SET = "SETTING_NOTES_SET";
const ENCLAVE_VISUALS_SET = "ENCLAVE_VISUALS_SET";
const ENCLAVE_CONFLICTS_SET = "ENCLAVE_CONFLICTS_SET";
const MINOR_CHARACTER_CREATE = "MINOR_CHARACTER_CREATE";
const MINOR_CHARACTER_NAME_SET = "MINOR_CHARACTER_NAME_SET";
const MINOR_CHARACTER_NOTES_SET = "MINOR_CHARACTER_NOTES_SET";

export const actions = {
  load: [
    LOAD,
    "playersById",
    "playerIds",
    "me",
    "eventsById",
    "eventIds",
    "charactersById",
    "characterIds",
    "minorCharactersById",
    "minorCharacterIds",
    "visuals",
    "conflicts",
    "settingsByName",
    "definitions"
  ],
  join: ["PLAYER_JOIN", "player", "character"],
  ...socketActions({
    setName: [CHARACTER_NAME_SET, "id", "value"],
    setLook1: [CHARACTER_LOOK_1_SET, "id", "value"],
    setLook2: [CHARACTER_LOOK_2_SET, "id", "value"],
    setPronouns: [CHARACTER_PRONOUNS_SET, "id", "value"],
    setGender: [CHARACTER_GENDER_SET, "id", "value"],
    setStyles: [CHARACTER_STYLES_SET, "id", "value"],
    setChoices1: [CHARACTER_CHOICES_1_SET, "id", "value"],
    setChoices2: [CHARACTER_CHOICES_2_SET, "id", "value"],
    setKeyRelationships: [CHARACTER_KEY_RELATIONSHIPS_SET, "id", "value"],
    setCharacterNotes: [CHARACTER_NOTES_SET, "id", "value"],
    gainToken: [PLAYER_TOKEN_GAIN],
    spendToken: [PLAYER_TOKEN_SPEND],
    pickUpSetting: [SETTING_PICK_UP, "name"],
    giveAwaySetting: [SETTING_GIVE_AWAY, "name"],
    setSettingDesires: [SETTING_DESIRES_SET, "name", "value"],
    setSettingNotes: [SETTING_NOTES_SET, "name", "value"],
    setEnclaveVisuals: [ENCLAVE_VISUALS_SET, "value"],
    setEnclaveConflicts: [ENCLAVE_CONFLICTS_SET, "value"],
    setMinorCharacterName: [MINOR_CHARACTER_NAME_SET, "id", "value"],
    setMinorCharacterNotes: [MINOR_CHARACTER_NOTES_SET, "id", "value"]
  }),
  ...slowSocketActions({
    chat: [CHAT, "text"],
    createCharacter: [CHARACTER_CREATE, "role"],
    createSetting: [SETTING_CREATE, "name"],
    createMinorCharacter: [MINOR_CHARACTER_CREATE, "name", "notes"]
  }),
  ...prefixedActions("CHATBOX", chatbox.actions)
};

export const types = {
  LOAD
};

export const messages = {
  [PLAYER_JOIN]: "Joined the game.",
  [CHARACTER_CREATE]: "Chose the {character.role}.",
  [CHARACTER_NAME_SET]: 'Chose the name "{value}".',
  [CHARACTER_LOOK_1_SET]: 'Chose "{value}" for {pronouns:id:their} first look.',
  [CHARACTER_LOOK_2_SET]:
    'Chose "{value}" for {pronouns:id:their} second look.',
  [CHARACTER_GENDER_SET]: 'Chose "{value}" for {pronouns:id:their} gender.',
  [CHARACTER_PRONOUNS_SET]: 'Chose "{value}" pronouns.',
  [CHARACTER_STYLES_SET]: "{array} {pronouns:id:their} wardrobe.",
  [CHARACTER_CHOICES_1_SET]:
    "{array} {pronouns:id:their} first role-specific choice.",
  [CHARACTER_CHOICES_2_SET]:
    "{array} {pronouns:id:their} second role-specific choice.",
  [CHARACTER_KEY_RELATIONSHIPS_SET]:
    "{array} {pronouns:id:their} key relationships.",
  [CHARACTER_NOTES_SET]: "Updated {pronouns:id:their} notes.",
  [PLAYER_TOKEN_GAIN]: "Gained a token.",
  [PLAYER_TOKEN_SPEND]: "Spent a token.",
  [SETTING_CREATE]: "Picked up the {name}.",
  [SETTING_PICK_UP]: "Picked up the {name}.",
  [SETTING_GIVE_AWAY]: "Gave away the {name}.",
  [SETTING_DESIRES_SET]: "{array} the {name}'s desires.",
  [SETTING_NOTES_SET]: "Updated the {name}'s notes.",
  [ENCLAVE_CONFLICTS_SET]: "Updated the enclave's conflicts.",
  [ENCLAVE_VISUALS_SET]: "Updated the enclave's visuals.",
  [MINOR_CHARACTER_CREATE]:
    "Created a new minor character, {minorCharacter.name}",
  [MINOR_CHARACTER_NAME_SET]: "Renamed a minor character to {value}",
  [MINOR_CHARACTER_NOTES_SET]: "Updated a minor character's notes"
};

export const reducer = combineReducers({
  chatbox: prefixedReducer("CHATBOX", chatbox.reducer),
  loaded: (state = false, action) => {
    switch (action.type) {
      case LOAD:
        return true;
      case "SOCKET_DISCONNECT":
        return false;
      default:
        return state;
    }
  },
  playerIds: (state = null, action) => {
    switch (action.type) {
      case LOAD:
        return action.playerIds;
      case PLAYER_JOIN:
        return [...state, action.player.id];
      default:
        return state;
    }
  },
  playersById: (state = null, action) => {
    switch (action.type) {
      case LOAD:
        return action.playersById;
      case PLAYER_JOIN:
        return {
          ...state,
          [action.player.id]: action.player
        };
      case CHARACTER_CREATE:
        return update(state, {
          [action.playerId]: {
            character: { $set: action.character.id }
          }
        });
      case PLAYER_TOKEN_GAIN:
        return update(state, {
          [action.playerId]: {
            tokens: tokens => tokens + 1
          }
        });
      case PLAYER_TOKEN_SPEND:
        return update(state, {
          [action.playerId]: {
            tokens: tokens => Math.max(tokens - 1, 0)
          }
        });
      default:
        return state;
    }
  },
  me: (state = null, action) => {
    switch (action.type) {
      case LOAD:
        return action.me;
      default:
        return state;
    }
  },
  definitions: (state = null, action) => {
    switch (action.type) {
      case "LOAD":
        return action.definitions;
      default:
        return state;
    }
  },
  characterIds: (state = [], action) => {
    switch (action.type) {
      case "LOAD":
        return action.characterIds;
      case CHARACTER_CREATE:
        return [...state, action.character.id];
      default:
        return state;
    }
  },
  charactersById: (state = {}, action) => {
    switch (action.type) {
      case "LOAD":
        return action.charactersById;
      case CHARACTER_CREATE:
        return {
          ...state,
          [action.character.id]: action.character
        };
      case CHARACTER_NAME_SET:
        return update(state, {
          [action.id]: {
            name: { $set: action.value }
          }
        });
      case CHARACTER_LOOK_1_SET:
        return update(state, {
          [action.id]: {
            look1: { $set: action.value }
          }
        });
      case CHARACTER_LOOK_2_SET:
        return update(state, {
          [action.id]: {
            look2: { $set: action.value }
          }
        });
      case CHARACTER_PRONOUNS_SET:
        return update(state, {
          [action.id]: {
            pronouns: { $set: action.value }
          }
        });
      case CHARACTER_GENDER_SET:
        return update(state, {
          [action.id]: {
            gender: { $set: action.value }
          }
        });
      case CHARACTER_STYLES_SET:
        return update(state, {
          [action.id]: {
            styles: { $set: action.value }
          }
        });
      case CHARACTER_CHOICES_1_SET:
        return update(state, {
          [action.id]: {
            choices1: { $set: action.value }
          }
        });
      case CHARACTER_CHOICES_2_SET:
        return update(state, {
          [action.id]: {
            choices2: { $set: action.value }
          }
        });
      case CHARACTER_KEY_RELATIONSHIPS_SET:
        return update(state, {
          [action.id]: {
            keyRelationships: { $set: action.value }
          }
        });
      case CHARACTER_NOTES_SET:
        return update(state, {
          [action.id]: {
            notes: { $set: action.value }
          }
        });
      default:
        return state;
    }
  },
  minorCharacterIds: (state = [], action) => {
    switch (action.type) {
      case "LOAD":
        return action.minorCharacterIds;
      case MINOR_CHARACTER_CREATE:
        return [...state, action.minorCharacter.id];
      default:
        return state;
    }
  },
  minorCharactersById: (state = {}, action) => {
    switch (action.type) {
      case "LOAD":
        return action.minorCharactersById;
      case MINOR_CHARACTER_CREATE:
        return {
          ...state,
          [action.minorCharacter.id]: action.minorCharacter
        };
      case MINOR_CHARACTER_NAME_SET:
        return update(state, {
          [action.id]: {
            name: { $set: action.value }
          }
        });
      case MINOR_CHARACTER_NOTES_SET:
        return update(state, {
          [action.id]: {
            notes: { $set: action.value }
          }
        });
      default:
        return state;
    }
  },
  settingsByName: (state = {}, action) => {
    switch (action.type) {
      case "LOAD":
        return action.settingsByName;
      case SETTING_CREATE:
        return {
          ...state,
          [action.setting.name]: action.setting
        };
      case SETTING_PICK_UP:
        return update(state, {
          [action.name]: {
            player: { $set: action.playerId }
          }
        });
      case SETTING_GIVE_AWAY:
        return update(state, {
          [action.name]: {
            player: { $set: null }
          }
        });
      case SETTING_DESIRES_SET:
        return update(state, {
          [action.name]: {
            desires: { $set: action.value }
          }
        });
      case SETTING_NOTES_SET:
        return update(state, {
          [action.name]: {
            notes: { $set: action.value }
          }
        });
      default:
        return state;
    }
  },
  visuals: (state = [], action) => {
    switch (action.type) {
      case "LOAD":
        return action.visuals;
      case ENCLAVE_VISUALS_SET:
        return action.value;
      default:
        return state;
    }
  },
  conflicts: (state = [], action) => {
    switch (action.type) {
      case "LOAD":
        return action.conflicts;
      case ENCLAVE_CONFLICTS_SET:
        return action.value;
      default:
        return state;
    }
  }
});

const createDeepSelector = createSelectorCreator(defaultMemoize, isEqual);

const getIsLoaded = state => state.loaded;
const getMe = state => state.me;
const getPlayerNames = state => mapObject(state.playersById, p => p.name);
const getPlayer = (state, id) => state.playersById[id];
const getPlayerIds = state => state.playerIds;
const getPlayersById = state => state.playersById;

const getCharacter = (state, id) => state.charactersById[id];
const getCharacterNames = state => mapObject(state.charactersById, c => c.name);
const getCharacterPronouns = state =>
  mapObject(state.charactersById, c => c.pronouns);
const getVisuals = state => state.visuals;
const getConflicts = state => state.conflicts;
const getMinorCharacterIds = state => state.minorCharacterIds;
const getMinorCharacter = (state, id) => state.minorCharactersById[id];
// const getMinorCharacters = state => state.minorCharacterIds.map(id => state.minorCharactersById[id]);

const fromDefinitions = prefixedSelectors("definitions", {
  getRole: (state, name) => state.rolesByName[name],
  getRolesByName: state => state.rolesByName,
  getRoleNames: state => state.roleNames,
  getSettingNames: state => state.settingNames,
  getSettingDef: (state, name) => state.settingsByName[name],
  getSettingDefsByName: state => state.settingsByName,
  getAllVisuals: state => state.visuals,
  getAllConflicts: state => state.conflicts
});

const getMyPlayer = createSelector(
  getPlayersById,
  getMe,
  (playersById, me) => playersById[me]
);
const getMyCharacterId = createSelector(
  getMyPlayer,
  player => player.character
);

const getOtherPlayerIds = createSelector(
  getMe,
  getPlayerIds,
  (me, playerIds) => playerIds.filter(id => id !== me)
);

const getCharacterIdsByPlayerId = createSelector(
  getPlayersById,
  playersById => mapObject(playersById, player => player.character)
);

const getOtherCharacterIds = createDeepSelector(
  getOtherPlayerIds,
  getCharacterIdsByPlayerId,
  (otherPlayerIds, characterIdsByPlayerId) => {
    return otherPlayerIds
      .map(id => characterIdsByPlayerId[id])
      .filter(id => !!id);
  }
);

const getSettingsByName = state => state.settingsByName;

const getMySettings = createSelector(
  getMe,
  fromDefinitions.getSettingNames,
  getSettingsByName,
  (me, settingNames, settingsByName) =>
    settingNames.filter(name => {
      const setting = settingsByName[name];
      return setting && setting.player && setting.player === me;
    })
);

const getCharacterSummaries = state => {
  const me = getMe(state);
  return getPlayerIds(state)
    .filter(id => id !== me)
    .map(id => {
      const player = getPlayer(state, id);
      const character = getCharacter(state, player.character);
      if (!character) return null;
      const role = fromDefinitions.getRole(state, character.role);
      const pronounSet = pronounSets[character.pronouns];
      const name = character.name || `The ${character.role}`;
      return {
        id: character.id,
        name: name,
        tokens: player.tokens,
        lure: role.theirLure
          .replace("{name}", name)
          .replace(
            /{(.+)}/g,
            (_match, pronoun) => (pronounSet && pronounSet[pronoun]) || pronoun
          )
      };
    })
    .filter(character => character !== null);
};

const getUnpickedRoles = state => {
  const chosenRoles = getPlayerIds(state)
    .map(id => {
      const player = getPlayer(state, id);
      const character = getCharacter(state, player.character);
      if (!character) return null;
      return character.role;
    })
    .filter(name => name !== null);
  return fromDefinitions
    .getRoleNames(state)
    .filter(name => !chosenRoles.includes(name))
    .map(name => ({
      description: fromDefinitions.getRole(state, name).description,
      name
    }));
};

const getSetting = (state, name) => state.settingsByName[name];

const getSettingSummaries = state =>
  fromDefinitions
    .getSettingNames(state)
    .map(name => {
      const { pickUpWhen } = fromDefinitions.getSettingDef(state, name);
      const setting = getSetting(state, name);
      if (setting && setting.player) return null;
      return {
        name,
        pickUpWhen
      };
    })
    .filter(setting => setting !== null);

const getCharacterSheet = createSelector(
  getCharacter,
  fromDefinitions.getRolesByName,
  (character, rolesByName) => {
    const definition = rolesByName[character.role];
    return {
      ...character,
      choices1: {
        choices: character.choices1,
        statement: definition.choice1.statement,
        complete: character.choices1.length >= definition.choice1.count
      },
      choices2: {
        choices: character.choices2,
        statement: definition.choice2.statement,
        complete: character.choices2.length >= definition.choice2.count
      },
      definition
    };
  }
);

const getSettingSheet = (state, name) => {
  const setting = getSetting(state, name);
  const {
    desires,
    lore,
    tips,
    pickUpWhen,
    giveAwayWhen,
    moves
  } = fromDefinitions.getSettingDef(state, name);
  return {
    name,
    mine: !!setting && setting.player === getMe(state),
    desires: setting && setting.desires,
    notes: setting && setting.notes,
    allDesires: desires,
    lore,
    tips,
    pickUpWhen,
    giveAwayWhen,
    moves
  };
};

export const selectors = {
  getCharacter,
  getCharacterNames,
  getCharacterPronouns,
  getCharacterSheet,
  getCharacterSummaries,
  getConflicts,
  getIsLoaded,
  getMe,
  getMinorCharacter,
  getMinorCharacterIds,
  getMyCharacterId,
  getMyPlayer,
  getMySettings,
  getOtherCharacterIds,
  getPlayer,
  getPlayerIds,
  getPlayerNames,
  getSettingSheet,
  getSettingSummaries,
  getUnpickedRoles,
  getVisuals,
  ...fromDefinitions,
  ...prefixedSelectors("chatbox", chatbox.selectors)
};
