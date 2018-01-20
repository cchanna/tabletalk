import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import bonusString from 'common/bonusString';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Button = rx('button')`
  @include button-style;
  flex: 0 0 auto;
  display: block;
  &:not(:disabled) {
    color: $accent;
  }
  font-size: 30px;
  margin: 0 15px;
  text-shadow: -1px 1px 2px rgba(0, 0, 0, .2);
`

class RollButton extends Component {
  static propTypes = {
    value: number.isRequired,
    onChat: func.isRequired
  }

  handleClick = () => {
    const { value, onChat } = this.props;
    onChat({text: "/r " + bonusString(value)});
  }
  
  render() {
    const {value} = this.props;
    return (
      <Button onClick={this.handleClick}>
        {bonusString(value)}
      </Button>
    );
  }
}

export default RollButton;