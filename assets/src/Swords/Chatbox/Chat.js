import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf, oneOfType } from 'prop-types'
import rx from 'resplendence'
import { swordsMessages } from 'state';
import BaseDie from '../Die';
import gradient from '../gradient';
  
rx`
@import '~Swords/styles';
`

const Talk = rx('div')`
  flex: 0 0 auto;
  margin: 5px 0;
  width: auto;
  &.mine {
  }
`

const Log = rx('div')`
  flex: 0 0 auto;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
  border-left: 2px solid lighten($foreground, 70%);
  color: lighten($foreground, 70%);
  padding: 5px 0 5px 3px;
`
const ColorLog = rx('div')`
  width: calc(100% - 6px);
  height: 20px;
  margin: 3px;
  box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, .25) inset;
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
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
`
const Die = rx(BaseDie)`
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  font-family: "icomoon";
  svg {
    filter: drop-shadow(-1px 1px 1px rgba(0, 0, 0, .25));
  }
`

export const chatProperties = {
  playerId: number.isRequired,
  insertedAt: string.isRequired,
  data: object.isRequired,
}

class Chat extends Component {
  static propTypes = {
    mine: bool.isRequired,
    playerNames: object.isRequired,
    ...chatProperties
  }

  shouldComponentUpdate = () => false;
  
  render() {
    const { data, mine, playerNames } = this.props;
    switch(data.type) {
      case "SWORDS_CHAT": 
        return (
          <Talk rx={{mine}}>
            {data.text
              .trim()
              .split("\n")
              .map((paragraph, i) => <P key={i}>{paragraph}</P>)
            }
          </Talk>
        )
      case "SWORDS_DICE_ROLL":
        return (
          <Log>
            Rolled the dice.
            <Roll>
              <Die value={data.glum} tone={false}/>
              <Die value={data.jovial} tone={true}/>
            </Roll>
          </Log>
        )
      default: {
        const unformatted = swordsMessages[data.type];
        if (unformatted) {
          let formatted;
          if (typeof(unformatted) === "function") {
            formatted = unformatted(data);
          }
          else {
            formatted = unformatted
              .replace(/{player:(.*?)}/g, (_m, p1) => playerNames[data[p1]])
              .replace(/{(.*?) \? (.*?) : (.*)}/g, (_m, key, t, f) => data[key] ? t : f)
              .replace(/{(.+?)}/g, (_m, p1) => data[p1])
          }
          return (
            <Log>
              {formatted}
              {data.color ? (
                <ColorLog style={{background: gradient(data.color)}}/>
              ) : null}
            </Log>
          );
        }
        return null;
      }
    }
  }
}

export default Chat;