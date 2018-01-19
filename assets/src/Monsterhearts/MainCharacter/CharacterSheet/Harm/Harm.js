import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import makeCheckArray from 'common/components/makeCheckArray';


rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';

%triangle {
}
`

const Container = rx('div')`
  overflow: hidden;
  width: auto;
  display: inline-block;
  margin-top: 30px;
`
const Border = rx('div')`
  border-top: solid $foreground 5px;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  width: auto;
`
const Title = rx('h2')`
  font-family: $header;
  margin: 0;
  font-size: 30px;
`
const Svg = rx('svg')`
  margin: 0 -3px;
`
const TriangleSvg = props => (
  <Svg
    x="0px"
    y="0px"
    preserveAspectRatio="none"
    width="1em"
    height=".9em"
    viewBox="0 0 100 90"
    {...props}
  >
    <polygon points="5,5 95,5 50,85"/> 
  </Svg>
);

const Checks = rx(makeCheckArray(TriangleSvg))`
  font-size: 60px;
  height: 42px;
  position: relative;
  left: 0;
  top: -7px;
  .checked, .unchecked {
    height: 42px;
    svg {
      position: relative;
      z-index: 0;
      polygon {
        stroke: $foreground;
        stroke-width: 8;
        transition-property: stroke, fill;
        transition-duration: 150ms;
      }
    }
  }
  .checked polygon {
    fill: $foreground;
  }
  .unchecked polygon {
    fill: $background;
  }
  button.checked:not(:disabled) {
    &:focus, &:hover, &:active {
      svg:last-child {
        z-index: 1;
      }
    }
    &:focus svg:last-child polygon {
      fill: lighten($accent, 30%);
      stroke: lighten($accent, 30%);
    }
    &:hover svg:last-child polygon {
      fill: $accent;
      stroke: $accent;
    }
    &:active svg:last-child polygon {
      fill: darken($accent, 30%);
      stroke: darken($accent, 30%);
    }
  }
  button.unchecked:not(:disabled) {
    &:focus, &:hover, &:active {
      svg:first-child polygon {
        z-index: 1;
      }
    }
    &:focus svg:first-child polygon {
      fill: darken($accent, 20%);
    }
    &:hover svg:first-child polygon {
      fill: $accent;
    }
    &:active svg:first-child polygon {
      fill: darken($accent, 30%);
    }
  }
`

const max = 4;

class Harm extends Component {
  static propTypes = {
    id: number.isRequired,
    harm: number.isRequired,
    readOnly: bool.isRequired,
    incrementHarm: func.isRequired,
    decrementHarm: func.isRequired
  }

  handleIncrement = () => {
    const { id, harm, incrementHarm } = this.props;
    if (harm < max) {
      incrementHarm({id});
    }
  }

  handleDecrement = () => {
    const { id, harm, decrementHarm } = this.props;
    if (harm > 0) {
      decrementHarm({id});
    }
  }
  
  render() {
    const { harm, readOnly } = this.props;
    return (
      <Container>
        <Border>
          <Title>Harm</Title>
          <Checks 
            {...{max, readOnly}}
            value={harm} 
            onIncrement={this.handleIncrement} 
            onDecrement={this.handleDecrement}/>
        </Border>
      </Container>
    );
  }
}

export default Harm;