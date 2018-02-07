import { connect } from 'react-redux'
import AddMove from './AddMove';


const mapStateToProps = ({monsterhearts}, {id, onAdd}) => {
  const { charactersById, definitions } = monsterhearts;
  const { mainCharacter } = charactersById[id];
  const { moves } = mainCharacter;
  const { playbooksByName, playbooks } = definitions;
  
  return {
    id, onAdd,
    playbooks: playbooks.map(name => ({
      name,
      moves: playbooksByName[name].moves
        .filter(move => !moves.includes(move))
    }))
  };
};

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AddMove);