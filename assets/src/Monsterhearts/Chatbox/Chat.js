import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
rx`
@import '~common/styles';
@import '~common/colors';
`

const Talk = rx('div')`
  flex: 0 0 auto;
  background: hsl(240, 10%, 92%);
  padding: 10px;
  border-radius: 10px;
  color: hsl(240, 10%, 7%);
  margin: 5px 0;
  width: auto;
  &.mine {
    align-self: flex-end;
    background: hsl(339, 50%, 52%);
    color: white;
  }
`

const Log = rx('div')`
  flex: 0 0 auto;
  color: hsl(240, 10%, 50%);
  margin: 5px 0;
`

const P = rx('p')`
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`

const Roll = rx('div')`
  flex: 0 0 auto;
  align-self: center;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  color: hsl(240, 10%, 70%);
`
const RollInfo = rx('div')`
  font-size: 30px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 5px;
`
const Dice = rx('div')`
  font-family: "icomoon";
  margin-right: 5px;
`
const Bonus = rx('div')`
  font-size: 20px;
`
const RollResult = rx('div')`
  font-family: "League Spartan";
  font-size: 60px;
  transition: 120s color;
  &.newest {
    &.strong {
      color: hsl(339, 50%, 52%);
    }
    &.weak {
      color: hsl(339, 50%, 72%);
    }
    &.miss {
      color: hsl(240, 10%, 83%);
    }
  }
`

const convertLog = (text, playersById) => {
  const regex = /{(.+?):(\d+)}/g;
  const players = [];
  let m = regex.exec(text);
  while (m !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    if (m[1] === "player" && !players.includes(m[2])) {
      players.push(m[2]);
    }
    m = regex.exec(text);
  }
  players.forEach(id => {
    text = text.replace(`{player:${id}}`, playersById[id].name);
  })
  return text;
}

const makeBonusString = bonus => {
  if (bonus >= 0) return "+ " + bonus; 
  else return "− " + (-bonus);
}

export const chatProperties = {
  insertedAt: string.isRequired,
  talk: shape({
    text: string.isRequired,
    isLog: bool.isRequired
  }),
  roll: shape({
    dice: arrayOf(number).isRequired,
    bonus: number.isRequired
  }),
  mine: bool.isRequired,
}

class Chat extends Component {
  static propTypes = {
    ...chatProperties,
    playersById: object.isRequired,
    newest: bool.isRequired
  }
  
  render() {
    const { talk, roll, mine, newest, playersById } = this.props;

    if (talk) {
      if (talk.isLog) {
        return (
          <Log rx={{mine}}>{convertLog(talk.text, playersById)}</Log>
        )
      }
      else {
        const paragraphs = talk.text
          .trim()
          .split("\n")
          .map((paragraph, i) => <P key={i}>{paragraph}</P>);
        return (
          <Talk rx={{mine}}>{paragraphs}</Talk>
        )
      }
    }
    else if (roll) {
      const bonusString = makeBonusString(roll.bonus);
      const result = roll.dice[0] + roll.dice[1] + roll.bonus;
      return (
        <Roll>
          <RollInfo>
            <Dice>{roll.dice[0]}{roll.dice[1]}</Dice>
            <Bonus>{bonusString}</Bonus>
          </RollInfo>
          <RollResult rx={{newest, strong: result >= 10, weak: (result >= 7 && result <= 9), miss: result <= 6}}>
            {result}
          </RollResult>
        </Roll>
      );
    }
    else {
      return null;
    }
  }
}

export default Chat;