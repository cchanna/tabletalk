import { connect } from 'react-redux';

import NewGameForm from './NewGameForm';

import { setInput, setName, create, setKind, stepBack, reset } from './actionCreators';

const mapStateToProps = ({games}) => {
  const { form, loading, failed } = games.newGame;
  const { name, player, kind, input } = form;
  return { input, name, player, kind, loading, failed };
}

const mapDispatchToProps = {setInput, setName, create, setKind, stepBack, reset};

export default connect(mapStateToProps, mapDispatchToProps)(NewGameForm);