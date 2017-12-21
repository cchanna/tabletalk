import React from 'react';
import rx from 'resplendence';
import {
  kindsById, toClassName
} from "common/gameKinds";

rx`
@import "~common/styles";
@import "~common/colors";
`

const Container = rx('button')`
  @include button;
  position: relative;
  left: 0;
  padding: 10px 0;
  color: $color-light;
  font-family: "Junction";
  font-size: 25px;
  font-weight: bold;
  text-shadow: -1px 1px 1px rgba(0, 0, 0, .3);
  transition-properties: color, left, text-shadow;
  transition-duration: 0.15s;
  &:focus, &:hover {
    color: hsl($hue2, 90%, 75%);
    left: 2px;
    text-shadow: -1px 1px 2px rgba(0, 0, 0, .5);
  }
  &.narrow-or-under {
    font-size: 20px;
  }
`

const Icon = rx('span')`
  font-family: "Icomoon";
  display: inline-block;
  position: relative;
  top: 1px;
  margin-right: 10px;
  text-shadow: -1px 1px 1px rgba(0, 0, 0, .3);
`


class Game extends React.Component {
  handleClick = () => {
    const { slug, openGame } = this.props;
    openGame(slug);
  }
  render() {
    const { name, kind, sizes } = this.props;
    return (
      <Container onClick={this.handleClick} rx={[toClassName(kindsById[kind]), ...sizes]}>
        <Icon>*</Icon>
        {name}
      </Container>
    )
  }
}

export default Game;