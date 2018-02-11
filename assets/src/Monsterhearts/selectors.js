const here = state => state.monsterhearts;

const getMe = state => here(state).me;
const getPlayer = (state, id) => here(state).playersById[id];

const getCharactersById = state => here(state).charactersById;
const getCharacters = state => here(state).characters;
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
  if (player.isGM) return true;
  const { mainCharacter } = getCharacter(state, id);
  return (!mainCharacter || mainCharacter.playerId !== me);
}

export const getDefinitions = state => here(state).definitions;
export const getPlaybooks = state => getDefinitions(state).playbooks;
export const getPlaybookDefinition = (state, playbook) => getDefinitions(state).playbooksByName[playbook]; 
const getMovesByName = (state, name) => getDefinitions(state).movesByName;
const getAdvancementsById = (state, id) => getDefinitions(state).advancementsById;

export const getPlaybookAdvancements = (state, playbook) => {
  const advancementsById = getAdvancementsById(state);
  return getPlaybookDefinition(state, playbook).advancements
    .map(id => ({
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