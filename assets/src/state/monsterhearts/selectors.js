import { selectors as characterSelectors } from './characters';
import { selectors as stringSelectors } from './strings';
import { prefixedSelectors } from 'redux-state-tools';


const fromCharacters = prefixedSelectors('characters', characterSelectors);
const { getCharactersById, getCharacterIds } = fromCharacters;
export { getCharactersById, getCharacterIds };

const fromStrings = prefixedSelectors('strings', stringSelectors);


export const getMe = state => state.me;
export const getPlayersById = state => state.playersById;
const getPlayer = (state, id) => getPlayersById(state)[id];

const characterName = character => character.name || `The\u00A0${character.mainCharacter.playbook}`;

export const getCharacter = (state, id) => getCharactersById(state)[id];

export const getMyCharacters = state => {
  const me = getMe(state);
  return getCharacterIds(state)
    .filter(id => {
      const { mainCharacter } = getCharacter(state, id);
      return (mainCharacter && mainCharacter.playerId === me);
    });
}

export const getSideCharacterIds = state => {
  const charactersById = getCharactersById(state);
  const characterIds = getCharacterIds(state);
  return characterIds.filter(id => !charactersById[id].mainCharacter);
}

export const getAmIGM = state => {
  const me = getMe(state);
  return getPlayer(state, me).isGM;
}

export const getReadOnly = (state, id = null) => {
  if (getAmIGM(state)) return false;
  if (!id) return true;
  const me = getMe(state);
  const { mainCharacter } = getCharacter(state, id);
  return (!mainCharacter || mainCharacter.playerId !== me);
}

export const getDefinitions = state => state.definitions;
export const getPlaybooks = state => getDefinitions(state).playbooks;
export const getPlaybookDefinition = (state, playbook) => getDefinitions(state).playbooksByName[playbook]; 
export const getCharacterPlaybookDefinition = (state, id) => getPlaybookDefinition(state, getCharacter(state, id).mainCharacter.playbook);
const getMovesByName = state => getDefinitions(state).movesByName;
const getAdvancementsById = state => getDefinitions(state).advancementsById;
export const getGrowingUpMoves = state => getDefinitions(state).growingUpMoves;
export const getCharacterGrowingUpMoves = (state, id) => {
  const growingUpMoves = getGrowingUpMoves(state);
  const { moves } = getCharacter(state, id).mainCharacter;
  return moves.filter(name => growingUpMoves.includes(name));
}
export const getUnchosenGrowingUpMoves = (state, id) => {
  const growingUpMoves = getGrowingUpMoves(state);
  const { moves } = getCharacter(state, id).mainCharacter;
  return growingUpMoves.filter(name => !moves.includes(name));
}

export const getPlaybookAdvancements = (state, playbook) => {
  const advancementsById = getAdvancementsById(state);
  return getPlaybookDefinition(state, playbook).advancements
  .map(id => ({
    id,
    ...advancementsById[id]
  }));
}

const getSeasonAdvancements = state => getDefinitions(state).seasonAdvances;
export const listSeasonAdvancements = state => {
  const advancementsById = getAdvancementsById(state);
  return getSeasonAdvancements(state).map(id => ({
    id,
    ...advancementsById[id]
  }));
}

export const getPlaybookMoves = (state, playbook) => {
  const movesByName = getMovesByName(state);
  return getPlaybookDefinition(state, playbook).moves
    .map(name => ({
      name,
      text: movesByName[name].text
    }))
}

// export const getSeasonFinale = state => state.seasonFinale;
export const getIsSeasonFinale = state => {
  const seasonAdvancements = getSeasonAdvancements(state);
  return getCharacterIds(state)
    .map(id => getCharacter(state, id))
    .filter(character => character.mainCharacter)
    .some(character => character.mainCharacter.advancements
      .some(advancement => seasonAdvancements.includes(advancement))
    );
}

export const getCharacterTabs = (state, {retired = false} = {}) => {
  const characters = getCharacterIds(state);
  const me = getMe(state);

  const mainCharacters = characters
    .map(id => ({id, ...getCharacter(state, id)}))
    .filter(({mainCharacter}) => mainCharacter);

  
  const tabs = mainCharacters
    .filter(({mainCharacter}) => mainCharacter.isRetired === retired)
    .map(({id, name, mainCharacter}) => {
      const { playerId } = mainCharacter;
      return {
        id: id.toString(), 
        name: characterName({name, mainCharacter}), 
        mine: (playerId === me)
      };
    });
  
  if (retired) return tabs;
  
  tabs.push({
    id: "side",
    name : "side\u00A0characters",
    mine: false
  })
  
  if (tabs.length - 1 < mainCharacters.length) {
    tabs.push({
      id: "retired",
      name: "retired\u00A0characters",
      mine: false
    })
  }

  return tabs;
}

export const getDarkestSelf = (state, id) => {
  const { mainCharacter } = getCharacter(state, id);
  if (!mainCharacter) return null;
  const { darkestSelf, playbook } = mainCharacter;
  if (darkestSelf !== null) return darkestSelf;
  const playbookDef = getPlaybookDefinition(state, playbook);
  if (!playbookDef) return null;
  return playbookDef.darkestSelf;
}
export const getCanCustomizeDarkestSelf = (state, id) => {
  if (getReadOnly(state, id)) return false;
  const { mainCharacter } = getCharacter(state, id);
  if (!mainCharacter) return false;
  return mainCharacter.advancements.includes("rrds"); 
}

export const getIsLoaded = state => state.loaded;
export const getIsChatboxCollapsed = state => state.chatboxCollapsed;
export const getChats = state => {
  const chatsById = state.chatsById;
  const me = state.me;
  return state.chats.map(id => ({
    id,
    mine: chatsById[id].playerId === me,
    ...chatsById[id]
  }));
}
export const getMove = (state, name, characterId = null) => {
  const def = getMovesByName(state)[name];
  if (!def) {
    return {
      text: null,
      notes: false
    }
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
  }
}
export const getUnattachedCharacters = (state, id) => {
  const charactersById = getCharactersById(state);
  const characters = getCharacterIds(state);
  const strings = fromStrings.getIds(state);
  const stringsById = fromStrings.getById(state);

  const excludeFrom = strings
    .filter(s => stringsById[s].from === id)
    .map(s => stringsById[s].to);
  const excludeTo = strings
    .filter(s => stringsById[s].to === id && !excludeFrom.includes(stringsById[s].from))
    .map(s => stringsById[s].from)
    
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
        }
        else {
          return -1;
        }
      }
      else if (b.playbook) return 1;
      else return a.name.localeCompare(b.name);
    })
}
export const getCharacterStrings = (state, id) => {
  const stringsById = fromStrings.getById(state);
  const strings = fromStrings.getIds(state);
  const allStrings = {};
  
  strings
    .filter(string => stringsById[string].from === id)
    .forEach(id => {
      const {to, value} = stringsById[id]
      allStrings[to] = {
        to: value,
        from: 0,
        toStringId: id,
        fromStringId: null
      }
    });

  strings
    .filter(string => stringsById[string].to === id)
    .forEach(id => {
      const {from, value} = stringsById[id]
      if (allStrings[from]) {
        allStrings[from].from = value;
        allStrings[from].fromStringId = id;
      }
      else {
        allStrings[from] = {
          to: 0,
          from: value,
          toStringId: null,
          fromStringId: id
        }
      }
    });

  return Object.keys(allStrings)
    .map(them => {
      const { to, from, toStringId, fromStringId } = allStrings[them];
      const name = characterName(getCharacter(state, them));
      return {
        name,
        theirId: parseInt(them, 10),
        toStringId,
        fromStringId,
        myStrings: to,
        theirStrings: from
      }
    });
}


export const getUnchosenPlaybookMoves = (state, id) => {
  const { mainCharacter } = getCharacter(state, id);
  const { moves } = mainCharacter;
  const { playbooksByName, playbooks } = getDefinitions(state);
  
  return playbooks.map(name => ({
    name,
    moves: playbooksByName[name].moves
      .filter(move => !moves.includes(move))
  }))
}

export const getUnchosenSelfMoves = (state, id) => {
  const { moves, playbook } = getCharacter(state, id).mainCharacter;
  return getPlaybookDefinition(state, playbook).moves
    .filter(move => !moves.includes(move));
}

export const getEditDone = (state, id) => {
  const stringsById = fromStrings.getById(state);
  const strings = fromStrings.getIds(state);
  const character = getCharacter(state, id);
  const { name, mainCharacter } = character;
  const { look, eyes, origin, hot, cold, volatile, dark, moves, playbook } = mainCharacter;
  const { startingMoves, startingMoveChoices } = getPlaybookDefinition(state, playbook);
  const identityDone = !!(name && look && eyes && origin);
  const statsDone = (hot !== null && cold !== null && volatile !== null && dark !== null);
  const movesDone = moves.length >= (startingMoveChoices + startingMoves.length);
  const backstoryDone = strings.filter(s => {
    const string = stringsById[s];
    return (string.from === id || string.to === id)
  }).length > 0;
  return {
    identityDone, statsDone, movesDone, backstoryDone,
    allDone: (identityDone && statsDone && movesDone && backstoryDone)
  }
}