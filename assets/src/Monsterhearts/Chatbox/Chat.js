import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import { monsterheartsMessages } from 'state';
  
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

const makeBonusString = bonus => {
  if (bonus >= 0) return "+ " + bonus; 
  else return "− " + (-bonus);
}

export const chatProperties = {
  insertedAt: string.isRequired,
  data: object.isRequired,
  playerId: number.isRequired,
}

class Chat extends Component {
  static propTypes = {
    ...chatProperties,
    newest: bool.isRequired,
    mine: bool.isRequired,
    playerNames: object,
    characterNames: object,
  }
  
  render() {
    const { data, mine, newest, characterNames } = this.props;

    if (data.type === "MONSTERHEARTS_CHAT") {
      if (data.die1) {
        const bonusString = makeBonusString(data.bonus);
        const result = data.die1 + data.die2 + data.bonus;
        return (
          <Roll>
            <RollInfo>
              <Dice>{data.die1}{data.die2}</Dice>
              <Bonus>{bonusString}</Bonus>
            </RollInfo>
            <RollResult rx={{newest, strong: result >= 10, weak: (result >= 7 && result <= 9), miss: result <= 6}}>
              {result}
            </RollResult>
          </Roll>
        );
      }
      else if (data.text) {
        if (data.isLog) {
          return (
            <Log rx={{mine}}>{data.text}</Log>
          )
        }
        else {
          const paragraphs = data.text
            .trim()
            .split("\n")
            .map((paragraph, i) => <P key={i}>{paragraph}</P>);
          return (
            <Talk rx={{mine}}>{paragraphs}</Talk>
          )
        }
      }
      else {
        return null;
      }
    }
    else {
      const unformatted = monsterheartsMessages[data.type];
      if (unformatted) {
        const formatted = unformatted
          .replace(/{character:(.*?)}/g, (_m, p1) => characterNames[data[p1]]);
        return <Log rx={{mine}}>{formatted}</Log>
      }
    }
    return null;
  }
}

export default Chat;