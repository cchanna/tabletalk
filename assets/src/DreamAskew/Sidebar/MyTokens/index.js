import { connect } from 'react-redux'
import MyTokens from './MyTokens';
import { fromDreamAskew, forDreamAskew } from "state"
import { createSelector } from 'reselect';

const {
  getMyPlayer
} = fromDreamAskew;
const { gainToken, spendToken } = forDreamAskew;

const mapStateToProps = createSelector(
  getMyPlayer,
  myPlayer => ({
    tokens: myPlayer.tokens
  })
)

const mapDispatchToProps = {gainToken, spendToken}

export default connect(mapStateToProps, mapDispatchToProps)(MyTokens);