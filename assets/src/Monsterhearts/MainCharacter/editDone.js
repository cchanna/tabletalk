export default (id, {monsterhearts}) => {
  const { charactersById, definitions, strings, stringsById } = monsterhearts;
  const character = charactersById[id];
  const { name, mainCharacter } = character;
  const { look, eyes, origin, hot, cold, volatile, dark, moves } = mainCharacter;
  const { playbooksByName } = definitions;
  const { startingMoves, startingMoveChoices } = playbooksByName[mainCharacter.playbook];
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