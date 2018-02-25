import { connect } from 'react-redux'
import AnyMove from './AnyMove';

import { goBack } from 'Routing'; 
import { forMonsterhearts } from '../../state';
const { createAdvancement } = forMonsterhearts;

const mapStateToProps = (_state, {id}) => {
  return {id};
};

const mapDispatchToProps = {createAdvancement, goBack}

export default connect(mapStateToProps, mapDispatchToProps)(AnyMove);