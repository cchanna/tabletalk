import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf, oneOfType } from 'prop-types'
import rx from 'resplendence'
import { dreamAskewMessages } from 'state';
import pronounSets from 'common/pronouns.json';
  
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
  border-left: 2px solid $background;
  opacity: .5;
  padding: 5px 0 5px 3px;
`

const P = rx('p')`
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
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
    characterNames: object.isRequired,
    characterPronouns: object.isRequired,
    ...chatProperties
  }

  shouldComponentUpdate = () => false;
  
  render() {
    const { data, mine, playerNames, characterPronouns } = this.props;
    switch(data.type.replace(/^DREAM_ASKEW_/, "")) {
      case "CHAT": 
        return (
          <Talk rx={{mine}}>
            {data.text
              .trim()
              .split("\n")
              .map((paragraph, i) => <P key={i}>{paragraph}</P>)
            }
          </Talk>
        )
      default: {
        const unformatted = dreamAskewMessages[data.type];
        if (unformatted) {
          let formatted;
          if (typeof(unformatted) === "function") {
            formatted = unformatted(data);
          }
          else {
            formatted = unformatted
              .replace(/{array}/g, () => {
                if (data.value.length === 3) return `Chose "${data.value[0]}", "${data.value[1]}", and "${data.value[2]}" for`;
                if (data.value.length === 2) return `Chose "${data.value[0]}" and "${data.value[1]}" for`;
                if (data.value.length === 1) return `Chose "${data.value[0]}" for` 
                if (data.value.length === 0) return `Unselected their choice for`
              })
              .replace(/{(.*?) \? (.*?) : (.*)}/g, (_m, key, t, f) => data[key] ? t : f)
              .replace(/{player:(.*?)}/g, (_m, p1) => playerNames[data[p1]])
              .replace(/{pronouns:(.+?):(.+?)}/g, (_m, key, pronoun) => {
                const pronouns = characterPronouns[data[key]];
                if (!pronouns) return pronoun;
                const pronounSet = pronounSets[pronouns];
                if (!pronounSet) return pronoun;
                return pronounSet[pronoun] || pronoun;
              })
              .replace(/{(.+?)\.\[(\d+?)\]}/g, (_m, p1, p2) => data[p1][p2])
              .replace(/{(.+?)\.(.+?)}/g, (_m, p1, p2) => data[p1][p2])
              .replace(/{(.+?)}/g, (_m, p1) => data[p1])
          }
          return (
            <Log>
              {formatted}
            </Log>
          );
        }
        return null;
      }
    }
  }
}

export default Chat;