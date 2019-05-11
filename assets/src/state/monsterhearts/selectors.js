import { selectors as characterSelectors } from "./characters";
import { selectors as stringSelectors } from "./strings";
import { selectors as chatboxSelectors } from "../chatbox";
import { selectors as customSelectors } from "./custom";
import { prefixedSelectors } from "redux-state-tools";
import { createSelector } from "reselect";
import mapObject from "utils/mapObject";

const fromCustom = prefixedSelectors("custom", customSelectors);

const fromCharacters = prefixedSelectors("characters", characterSelectors);

const fromStrings = prefixedSelectors("strings", stringSelectors);

const getStringsById = fromStrings.getById;

const { getIsChatboxCollapsed } = prefixedSelectors(
  "chatbox",
  chatboxSelectors
);

const getMe = state => state.me;
const getPlayerNamesById = state =>
  mapObject(state.playersById, player => player.name);
const getPlayer = (state, id) => state.playersById[id];

const characterName = character =>
  character.name || `The\u00A0${character.mainCharacter.playbook}`;

const getCharacter = (state, id) => fromCharacters.getCharactersById(state)[id];

const getMyCharacters = state => {
  const me = getMe(state);
  return fromCharacters.getCharacterIds(state).filter(id => {
    const { mainCharacter } = getCharacter(state, id);
    return mainCharacter && mainCharacter.playerId === me;
  });
};

const getSideCharacterIds = state => {
  const charactersById = fromCharacters.getCharactersById(state);
  const characterIds = fromCharacters.getCharacterIds(state);
  return characterIds.filter(id => !charactersById[id].mainCharacter);
};

const getCharacterNames = state => {
  const result = {};
  fromCharacters.getCharacterIds(state).forEach(id => {
    const { name, mainCharacter } = getCharacter(state, id);
    if (name) {
      result[id] = name;
    } else if (mainCharacter) {
      result[id] = "The " + mainCharacter.playbook;
    }
  });
  return result;
};

const getAmIGM = state => {
  const me = getMe(state);
  return getPlayer(state, me).isGM;
};

const getReadOnly = (state, id = null) => {
  if (getAmIGM(state)) return false;
  if (!id) return true;
  const me = getMe(state);
  const { mainCharacter } = getCharacter(state, id);
  return !mainCharacter || mainCharacter.playerId !== me;
};

const fromDefinitions = prefixedSelectors("definitions", {
  getMovesByName: state => state.movesByName,
  getPlaybooks: state => state.playbooks,
  getPlaybooksByName: state => state.playbooksByName
});

const getMovesByName = createSelector(
  fromDefinitions.getMovesByName,
  fromCustom.getCustomMovesByName,
  (defs, custom) => ({
    ...defs,
    ...custom
  })
);

const getPlaybookNames = createSelector(
  fromDefinitions.getPlaybooks,
  fromCustom.getCustomPlaybookNames,
  (normal, custom) =>
    [...normal, ...custom.filter(x => !normal.includes(x))].sort()
);

const getMoveNamesByPlaybook = createSelector(
  fromDefinitions.getPlaybooks,
  fromDefinitions.getPlaybooksByName,
  fromCustom.getCustomMoveNamesByPlaybook,
  (playbookNames, playbooksByName, custom) => {
    const result = { ...custom };
    playbookNames.forEach(name => {
      const { moves } = playbooksByName[name];
      if (!result[name]) result[name] = moves;
      else result[name] = [...moves, ...result[name]];
    });
    return result;
  }
);

const getDefinitions = state => state.definitions;
const getPlaybookDefinition = (state, playbook) =>
  getDefinitions(state).playbooksByName[playbook];
const getCharacterPlaybookDefinition = (state, id) =>
  getPlaybookDefinition(state, getCharacter(state, id).mainCharacter.playbook);
const getAdvancementsById = state => getDefinitions(state).advancementsById;
const getGrowingUpMoves = state => getDefinitions(state).growingUpMoves;
const getCharacterGrowingUpMoves = (state, id) => {
  const growingUpMoves = getGrowingUpMoves(state);
  const { moves } = getCharacter(state, id).mainCharacter;
  return moves.filter(name => growingUpMoves.includes(name));
};

const getUnchosenGrowingUpMoves = (state, id) => {
  const growingUpMoves = getGrowingUpMoves(state);
  const { moves } = getCharacter(state, id).mainCharacter;
  return growingUpMoves.filter(name => !moves.includes(name));
};

const getPlaybookAdvancements = (state, playbook) => {
  const advancementsById = getAdvancementsById(state);
  return getPlaybookDefinition(state, playbook).advancements.map(id => ({
    id,
    ...advancementsById[id]
  }));
};

const getSeasonAdvancements = state => {
  const advancementsById = getAdvancementsById(state);
  return getDefinitions(state).seasonAdvances.map(id => ({
    id,
    ...advancementsById[id]
  }));
};

const getPlaybookMoves = (state, playbook) => {
  const movesByName = getMovesByName(state);
  return getPlaybookDefinition(state, playbook).moves.map(name => ({
    name,
    text: movesByName[name].text
  }));
};

// export const getSeasonFinale = state => state.seasonFinale;
const getIsSeasonFinale = state => {
  const seasonAdvancements = getSeasonAdvancements(state);
  return fromCharacters
    .getCharacterIds(state)
    .map(id => getCharacter(state, id))
    .filter(character => character.mainCharacter)
    .some(character =>
      character.mainCharacter.advancements.some(advancement =>
        seasonAdvancements.includes(advancement)
      )
    );
};

const getCanGetSeasonAdvancements = (state, id) => {
  const { mainCharacter } = getCharacter(state, id);
  const { advancements } = mainCharacter;
  return advancements.length >= 5 || getIsSeasonFinale(state);
};

const getCharacterTabs = (state, { retired = false } = {}) => {
  const characters = fromCharacters.getCharacterIds(state);
  const me = getMe(state);

  const mainCharacters = characters
    .map(id => ({ id, ...getCharacter(state, id) }))
    .filter(({ mainCharacter }) => mainCharacter);

  const tabs = mainCharacters
    .filter(({ mainCharacter }) => mainCharacter.isRetired === retired)
    .map(({ id, name, mainCharacter }) => {
      const { playerId } = mainCharacter;
      return {
        id: id.toString(),
        name: characterName({ name, mainCharacter }),
        mine: playerId === me
      };
    });

  if (retired) return tabs;

  tabs.push({
    id: "side",
    name: "side\u00A0characters",
    mine: false
  });

  if (tabs.length - 1 < mainCharacters.length) {
    tabs.push({
      id: "retired",
      name: "retired\u00A0characters",
      mine: false
    });
  }

  return tabs;
};

const getDarkestSelf = (state, id) => {
  const { mainCharacter } = getCharacter(state, id);
  if (!mainCharacter) return null;
  const { darkestSelf, playbook } = mainCharacter;
  if (darkestSelf !== null) return darkestSelf;
  const playbookDef = getPlaybookDefinition(state, playbook);
  if (!playbookDef) return null;
  return playbookDef.darkestSelf;
};

const getCanCustomizeDarkestSelf = (state, id) => {
  if (getReadOnly(state, id)) return false;
  const { mainCharacter } = getCharacter(state, id);
  if (!mainCharacter) return false;
  return mainCharacter.advancements.includes("rrds");
};

const getIsLoaded = state => state.loaded;
const getChats = state => {
  const chatsById = state.chatsById;
  return state.chats.map(id => ({
    id,
    ...chatsById[id]
  }));
};

const getMove = (state, name, characterId = null) => {
  const def = getMovesByName(state)[name];
  if (!def) {
    return {
      text: null,
      notes: false
    };
  }
  let notes = null;
  if (def.notes && characterId) {
    notes = "";
    const character = getCharacter(state, characterId);
    if (character) {
      const { mainCharacter } = character;
      if (mainCharacter) {
        const { moveNotesByName } = mainCharacter;
        const moveNotes = moveNotesByName[name];
        if (moveNotes) {
          notes = moveNotes;
        }
      }
    }
  }
  return {
    notes,
    text: def.text
  };
};

const getUnattachedCharacters = (state, id) => {
  const charactersById = fromCharacters.getCharactersById(state);
  const characters = fromCharacters.getCharacterIds(state);
  const strings = fromStrings.getIds(state);
  const stringsById = fromStrings.getById(state);

  const excludeFrom = strings
    .filter(s => stringsById[s].from === id)
    .map(s => stringsById[s].to);
  const excludeTo = strings
    .filter(
      s =>
        stringsById[s].to === id && !excludeFrom.includes(stringsById[s].from)
    )
    .map(s => stringsById[s].from);

  return characters
    .filter(c => c !== id && !excludeFrom.includes(c) && !excludeTo.includes(c))
    .map(c => {
      const { name, notes, mainCharacter } = charactersById[c];
      const playbook = mainCharacter ? mainCharacter.playbook : null;
      return { name, notes, playbook, id: c };
    })
    .sort((a, b) => {
      if (a.playbook) {
        if (b.playbook) {
          return a.playbook.localeCompare(b.playbook);
        } else {
          return -1;
        }
      } else if (b.playbook) return 1;
      else return a.name.localeCompare(b.name);
    });
};

const getCharacterStrings = (state, id) => {
  const stringsById = fromStrings.getById(state);
  const strings = fromStrings.getIds(state);
  const allStrings = {};

  strings
    .filter(string => stringsById[string].from === id)
    .forEach(id => {
      const { to, value } = stringsById[id];
      allStrings[to] = {
        to: value,
        from: 0,
        toStringId: id,
        fromStringId: null
      };
    });

  strings
    .filter(string => stringsById[string].to === id)
    .forEach(id => {
      const { from, value } = stringsById[id];
      if (allStrings[from]) {
        allStrings[from].from = value;
        allStrings[from].fromStringId = id;
      } else {
        allStrings[from] = {
          to: 0,
          from: value,
          toStringId: null,
          fromStringId: id
        };
      }
    });

  return Object.keys(allStrings).map(them => {
    const { to, from, toStringId, fromStringId } = allStrings[them];
    const name = characterName(getCharacter(state, them));
    return {
      name,
      theirId: parseInt(them, 10),
      toStringId,
      fromStringId,
      myStrings: to,
      theirStrings: from
    };
  });
};

const getUnchosenPlaybookMoves = (state, id) => {
  const { mainCharacter } = getCharacter(state, id);
  const { moves } = mainCharacter;
  const playbookNames = getPlaybookNames(state);
  const moveNamesByPlaybook = getMoveNamesByPlaybook(state);

  return playbookNames
    .filter(name => moveNamesByPlaybook[name])
    .map(name => ({
      name,
      moves: moveNamesByPlaybook[name].filter(move => !moves.includes(move))
    }));
};

const getUnchosenSelfMoves = (state, id) => {
  const { moves, playbook } = getCharacter(state, id).mainCharacter;
  const moveNamesByPlaybook = getMoveNamesByPlaybook(state);
  return moveNamesByPlaybook[playbook].filter(move => !moves.includes(move));
};

const getEditDone = (state, id) => {
  const stringsById = fromStrings.getById(state);
  const strings = fromStrings.getIds(state);
  const character = getCharacter(state, id);
  const { name, mainCharacter } = character;
  const {
    look,
    eyes,
    origin,
    hot,
    cold,
    volatile,
    dark,
    moves,
    playbook
  } = mainCharacter;
  const { startingMoves, startingMoveChoices } = getPlaybookDefinition(
    state,
    playbook
  );
  const identityDone = !!(name && look && eyes && origin);
  const statsDone =
    hot !== null && cold !== null && volatile !== null && dark !== null;
  const movesDone = moves.length >= startingMoveChoices + startingMoves.length;
  const backstoryDone =
    strings.filter(s => {
      const string = stringsById[s];
      return string.from === id || string.to === id;
    }).length > 0;
  return {
    identityDone,
    statsDone,
    movesDone,
    backstoryDone,
    allDone: identityDone && statsDone && movesDone && backstoryDone
  };
};

export default {
  ...fromCharacters,
  ...fromCustom,
  getEditDone,
  getUnchosenSelfMoves,
  getUnchosenPlaybookMoves,
  getCharacterStrings,
  getUnattachedCharacters,
  getMove,
  getChats,
  getIsLoaded,
  getCanCustomizeDarkestSelf,
  getDarkestSelf,
  getCharacterTabs,
  getCanGetSeasonAdvancements,
  getIsSeasonFinale,
  getPlaybookMoves,
  getSeasonAdvancements,
  getPlaybookAdvancements,
  getUnchosenGrowingUpMoves,
  getCharacterGrowingUpMoves,
  getGrowingUpMoves,
  getCharacterPlaybookDefinition,
  getPlaybookDefinition,
  getDefinitions,
  getReadOnly,
  getAmIGM,
  getCharacterNames,
  getSideCharacterIds,
  getCharacter,
  getPlayerNamesById,
  getMe,
  getIsChatboxCollapsed,
  getStringsById,
  getMyCharacters,
  getMoveNamesByPlaybook,
  getPlaybookNames
};
