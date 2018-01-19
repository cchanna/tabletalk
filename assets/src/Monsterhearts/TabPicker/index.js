import { connect } from 'react-redux'
import TabPicker from './TabPicker';

const mapStateToProps = ({monsterhearts}) => {
  const { characters, charactersById, me } = monsterhearts;
  return {
    characters, 
    charactersById,
    me
  };
};

export default connect(mapStateToProps)(TabPicker);