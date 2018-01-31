import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'

import Checkbox from 'Monsterhearts/common/Checkbox';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`

`
const Advancement = rx('button')`
  @include button;
  display: block;
  color: darken($foreground, 50%);
  transition-property: color, background;
  transition-duration: 150ms;
  svg {
    margin-right: 8px;
    font-size: 25px;
    position: relative;
    top: 5px;
    path, circle {
      transition: fill 150ms;
    }
    path {
      fill: darken($foreground, 50%);
    }
    circle {
      fill: $background;
    }
  }
  &:not(:disabled) {
    color: $accent;
    svg path {
      fill: $accent;
    }
    &:focus, &:hover {
      color: lighten($accent, 10%);
      svg {
        path {
          fill: lighten($accent, 10%);
        }
        circle {
          fill: darken($accent, 30%);
        }
      }
    }
    &:active {
      color: darken($accent, 30%);
      svg {
        path, circle {
          fill: darken($accent, 30%);
        }
      }
    }
  }
  &.selected {
    svg {
      circle, path {
        fill: darken($foreground, 50%);
      }
    }
    &:not(:disabled) {
      color: $foreground;
      svg {
        circle, path {
          fill: $foreground;
        }
      }
      &:focus, &:hover {
        color: lighten($accent, 20%);
        svg {
          circle, path {
            fill: lighten($accent, 20%);
          }
        }
      }
      &:active {
        color: darken($accent, 30%);
        svg {
          path {
            fill: darken($accent, 30%);
          }
          circle {
            fill: $background;
          }
        }
      }
    }
  }
  `

class Advancements extends Component {
  static propTypes = {
    id: number.isRequired,
    canLevel: bool.isRequired,
    advancements: arrayOf(shape({
      id: string.isRequired,
      text: string.isRequired,
      selected: bool.isRequired
    })).isRequired,
    readOnly: bool.isRequired,
    add: func.isRequired,
    remove: func.isRequired
  }

  handleAdd = (e) => {
    const { id, add } = this.props;
    const advancementId = e.target.name;
    add({id, advancementId});
  }

  handleRemove = e => {
    const { id, remove } = this.props;
    const advancementId = e.target.name;
    remove({id, advancementId});
  }
  
  render() {
    const { advancements, canLevel } = this.props;
    return (
      <Container>
        {advancements.map(({text, id, selected}, i) => 
          <Advancement 
            key={i} 
            name={id}
            onClick={selected ? this.handleRemove : this.handleAdd}
            disabled={canLevel === selected}
            rx={{selected}}
          >
            <Checkbox/>{text} 
          </Advancement>
        )}
      </Container>
    );
  }
}

export default Advancements;