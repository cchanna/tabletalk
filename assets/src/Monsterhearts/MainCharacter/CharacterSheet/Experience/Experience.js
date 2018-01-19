import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import makeCheckArray from 'common/components/makeCheckArray';
import Checkbox from 'Monsterhearts/common/Checkbox';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  margin-top: 30px;
`
const ExperienceArray = rx(makeCheckArray(Checkbox))`
  font-size: 30px;
  margin-bottom: 3px;
  margin-left: 10px;
  .checked, .unchecked {
    path, circle {
      transition: 150ms fill;
    }
    path {
      fill: $foreground;
    }
    
  }
  .checked {
    circle {
      fill: $foreground;
    }
  }
  .unchecked {
    circle {
      fill: $background;
    }
  }
  button.checked:not(:disabled) {
    &:focus svg:last-child {
      path, circle {
        fill: lighten($accent, 30%);
      }
    }
    &:hover svg:last-child {
      path, circle {
        fill: $accent;
      }
    }
    &:active svg:last-child {
      path, circle {
        fill: darken($accent, 30%);
      }
    }
  }
  button.unchecked:not(:disabled) {
    &:focus svg:first-child circle {
      fill: darken($accent, 20%);
    }
    &:hover svg:first-child circle {
      fill: $accent;
    }
    &:active svg:first-child circle {
      fill: darken($accent, 30%);
    }
  }

`
const Title = rx('h2')`
  font-family: $header;
  margin: 0;
  font-size: 30px;
`

const max = 5;

class Experience extends Component {
  static propTypes = {
    id: number.isRequired,
    experience: number.isRequired,
    incrementXP: func.isRequired,
    decrementXP: func.isRequired,
    readOnly: bool.isRequired
  }

  handleIncrement = () => {
    const { experience, incrementXP, id } = this.props
    if (experience < max) incrementXP({id});
  }

  handleDecrement = () => {
    const { experience, decrementXP, id } = this.props;
    if (experience > 0) decrementXP({id});
  }
  
  render() {
    const { experience, readOnly } = this.props;
    return (
      <Container>
        <Title>Experience</Title>
        <ExperienceArray 
          {...{readOnly, max}}
          value={experience} max={max} 
          onIncrement={this.handleIncrement} 
          onDecrement={this.handleDecrement}/> 
      </Container>
    );
  }
}

export default Experience;