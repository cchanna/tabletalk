import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import bonusString from 'common/bonusString';  

rx`
@import '~common/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  font-family: $header;
  font-size: 30px;
  color: $foreground;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`

const Button = rx('button')`
  @include button;
  font-family: $interact;
  font-size: 60px;
  margin: 0 20px;
  position: relative;
  transition: 150ms color;
  color: transparent;
  &:not(:disabled) {
    color: $accent;
    &:hover, &:focus {
      color: lighten($accent, 10%);
    }
    &:active {
      color: lighten($accent, 15%);
    }
  }
`

class StatEditor extends Component {
  static propTypes = {
    name: string.isRequired,
    value: string.isRequired,
    setStats: func.isRequired
  }

  handleIncrement = () => {
    const { name, id, value, setStats } = this.props;
    if (value < 3) {
      setStats({
        id,
        [name.toLowerCase()]: value + 1
      })
    }
  }

  handleDecrement = () => {
    const { name, id, value, setStats } = this.props;
    if (value > -1) {
      setStats({
        id,
        [name.toLowerCase()]: value - 1
      })
    }
  }
  
  render() {
    const { name, value } = this.props;
    return (
      <Container>
        <Button onClick={this.handleDecrement} disabled={value <= -1}>−</Button>
        {name}{bonusString(value)}
        <Button onClick={this.handleIncrement} disabled={value >= 3}>+</Button>
      </Container>
    );
  }
}
export default StatEditor;