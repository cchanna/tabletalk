import { connect } from 'react-redux'
import DiceRoller from './DiceRoller';

import { fromSwords, forSwords } from 'state';

const {
  getDice,
  getTone,
  getDiceHolder,
  getPlayerIds,
  getMe,
  getPlayerNames,
  getOverplayerId
} = fromSwords;
const {
  roll,
  pickUpDice,
  giveDice,
  setDownDice,
  takeDice
} = forSwords;

const mapStateToProps = (state) => {
  const diceHolder = getDiceHolder(state);
  const playerNames = getPlayerNames(state);
  const me = getMe(state);
  return {
    playerNames,
    dice: getDice(state),
    tone: getTone(state, diceHolder),
    mine: me === diceHolder,
    amOverplayer: me === getOverplayerId(state),
    holder: playerNames[diceHolder],
    players: getPlayerIds(state)
      .filter(id => id !== me)
      .map(id => ({
        id,
        name: playerNames[id]
      }))
  }
}

const mapDispatchToProps = {roll, pickUpDice, giveDice, setDownDice, takeDice}

export default connect(mapStateToProps, mapDispatchToProps)(DiceRoller);