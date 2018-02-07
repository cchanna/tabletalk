import React, { Component } from 'react'
import { string, number, bool, func, shape, arrayOf } from 'prop-types'
import rx from 'resplendence'

import Checkbox from 'Monsterhearts/common/Checkbox';
import Link from 'Routing/Link';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';

@mixin advancement {
  @include button;
  font-family: $body;
  display: block;
  color: darken($foreground, 50%);
  transition-property: color, background;
  transition-duration: 150ms;
  opacity: 1;
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
  &.disabled, &:disabled {
    cursor: default;
  }
  &:not(.off) {
    color: $accent;
    svg path {
      fill: $accent;
    }
    &:not(:disabled):not(.disabled) {
      cursor: pointer;
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
  }
  &.selected {
    svg {
      circle, path {
        fill: darken($foreground, 50%);
      }
    }
    &:not(.off) {
      color: $foreground;
      svg {
        circle, path {
          fill: $foreground;
        }
      }
      &:not(:disabled):not(.disabled) {
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
  }
}
`

const Container = rx('div')`
`
const AdvancementButton = rx('button')`
  @include advancement;
`
const AdvancementLink = rx(Link)`
  @include link;
  @include advancement;
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
    remove: func.isRequired,
    here: arrayOf(string)
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
    const { advancements, canLevel, readOnly, here } = this.props;
    return (
      <Container>
        {advancements.map(({text, id, selected}, i) => 
          (!selected && (id === "any" || id === "self")) ? (
            <AdvancementLink
              key={i}
              to={[...here, id + "move"]}
              disabled={readOnly || canLevel === selected}
              rx={{selected, off: canLevel === selected}}>
              <Checkbox/>{text} 
            </AdvancementLink>
          ) : (
            <AdvancementButton
              key={i} 
              name={id}
              onClick={selected ? this.handleRemove : this.handleAdd}
              disabled={readOnly || canLevel === selected}
              rx={{selected, off: canLevel === selected}}
            >
              <Checkbox/>{text} 
            </AdvancementButton>
          )
        )}
      </Container>
    );
  }
}

export default Advancements;