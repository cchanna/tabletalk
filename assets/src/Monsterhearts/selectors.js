const here = state => state.monsterhearts;

export const getMe = state => here(state).me;
const getPlayer = (state, id) => here(state).playersById[id];

const getCharactersById = state => here(state).charactersById;
export const getCharacters = state => here(state).characters;
export const getCharacter = (state, id) => getCharactersById(state)[id];

export const getMyCharacters = state => {
  const me = getMe(state);
  return getCharacters(state)
    .filter(id => {
      const { mainCharacter } = getCharacter(state, id);
      return (mainCharacter && mainCharacter.playerId === me);
    });
}

export const getReadOnly = (state, id) => {
  const me = getMe(state);
  const player = getPlayer(state, me);
  if (player.isGM) return false;
  const { mainCharacter } = getCharacter(state, id);
  return (!mainCharacter || mainCharacter.playerId !== me);
}

export const getDefinitions = state => here(state).definitions;
export const getPlaybooks = state => getDefinitions(state).playbooks;
export const getPlaybookDefinition = (state, playbook) => getDefinitions(state).playbooksByName[playbook]; 
const getMovesByName = state => getDefinitions(state).movesByName;
const getAdvancementsById = state => getDefinitions(state).advancementsById;

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

// export const getSeasonFinale = state => here(state).seasonFinale;
export const getIsSeasonFinale = state => {
  const seasonAdvancements = getSeasonAdvancements(state);
  return getCharacters(state)
    .map(id => getCharacter(state, id))
    .filter(character => character.mainCharacter)
    .some(character => character.mainCharacter.advancements
      .some(advancement => seasonAdvancements.includes(advancement))
    );
}

export const getCharacterTabs = (state, {retired = false} = {}) => {
  const characters = getCharacters(state);
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
        name: name ? name : ("The\u00A0"+ mainCharacter.playbook), 
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