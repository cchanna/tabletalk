import { connect } from 'react-redux'
import DarkestSelf from './DarkestSelf';

import { forMonsterhearts, fromMonsterhearts } from 'state';
const { editDarkestSelf } = forMonsterhearts;
const { getDarkestSelf, getCanCustomizeDarkestSelf } = fromMonsterhearts

const mapStateToProps = (state, {id}) => {
  return {
    readOnly: !getCanCustomizeDarkestSelf(state, id),
    text: getDarkestSelf(state, id) || ""
  };
};

const mapDispatchToProps = {edit: editDarkestSelf}

export default connect(mapStateToProps, mapDispatchToProps)(DarkestSelf);