import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import Checkbox from 'Monsterhearts/common/Checkbox';
import Link from 'Routing/Link';
import parseAdvancement from 'Monsterhearts/common/parseAdvancement';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';

@mixin advancement {
  @include button;
  height: 31px;
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

const AdvancementButton = rx('button')`
  @include advancement;
`
const AdvancementLink = rx(Link)`
  @include link;
  @include advancement;
` 

const links = {
  "any": "anymove",
  "self": "selfmove"
}

class Advancement extends Component {
  static propTypes = {
    text: string.isRequired, 
    id: string.isRequired, 
    selected: bool.isRequired, 
    playbook: string.isRequired,
    off: bool.isRequired, 
    readOnly: bool.isRequired,
    depth: number.isRequired,
    onAdd: func.isRequired,
    onRemove: func.isRequired
  }

  handleAdd = () => {
    const { id, onAdd } = this.props;
    onAdd({advancementId: id});
  }

  handleRemove = () => {
    const { id, onRemove } = this.props;
    onRemove({advancementId: id});
  }
  
  render() {
    const { text, id, playbook, selected, off, depth, readOnly } = this.props;
    if (!selected && links[id]) {
      return (
        <AdvancementLink
          depth={depth}
          to={[links[id]]}
          disabled={readOnly || off}
          rx={{selected, off}}>
          <Checkbox/>
          {parseAdvancement(text, playbook)} 
        </AdvancementLink>
      )
    }
    else {
      return (
        <AdvancementButton 
          onClick={selected ? this.handleRemove : this.handleAdd}
          disabled={readOnly || off}
          rx={{selected, off}}
        >
          <Checkbox/>
          {parseAdvancement(text, playbook)} 
        </AdvancementButton>
      )
    }
  }
}

export default Advancement;