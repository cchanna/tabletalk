import { connect } from 'react-redux'
import AnyMove from './AnyMove';

import { goBack } from 'Routing/actionCreators'; 
import { createAdvancement } from '../actionCreators';

const mapStateToProps = (_state, {id}) => {
  return {id};
};

const mapDispatchToProps = {createAdvancement, goBack}

export default connect(mapStateToProps, mapDispatchToProps)(AnyMove);