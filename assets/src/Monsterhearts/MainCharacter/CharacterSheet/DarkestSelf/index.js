import { connect } from 'react-redux'
import DarkestSelf from './DarkestSelf';

import {
  getDarkestSelf,
  getCanCustomizeDarkestSelf
} from 'Monsterhearts/selectors';

import {
  MONSTERHEARTS_CHARACTER_DARKEST_SELF_SET
} from 'common/actions';

import { serverActionCreator } from 'Monsterhearts/serverActionCreator';

const edit = serverActionCreator(MONSTERHEARTS_CHARACTER_DARKEST_SELF_SET, "id", "value");

const mapStateToProps = (state, {id}) => {
  return {
    readOnly: !getCanCustomizeDarkestSelf(state, id),
    text: getDarkestSelf(state, id) || ""
  };
};

const mapDispatchToProps = {edit}

export default connect(mapStateToProps, mapDispatchToProps)(DarkestSelf);