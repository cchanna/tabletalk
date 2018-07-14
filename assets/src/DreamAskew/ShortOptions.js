import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf, oneOfType } from 'prop-types'
import rx from 'resplendence'

import { Paragraph } from "./Layout";

rx`
@import '~DreamAskew/styles';
`


const Option = rx('button')`
  @include button-style;
  padding: 5px;
  font-weight: bold;
  margin-right: 8px;
  font-size: 14px;
  font-family: $body;
  border-radius: 5px;
  transition-property: color, background, opacity;
  transition-duration: 150ms;
  background: transparent;
  color: $accent1;
  text-align: left;
  &:not(:disabled) {
    &:hover, &:focus {
      background: $accent1;
      color: $background;
    }
    &:active {
      background: $accent1_light;
    }
  }
  &.selected {
    background: $accent2;
    color: $background;
    &:disabled {
      opacity: 1;
    }
    &:focus {
      opacity: .75;
      background: $accent2;
    }
  }
  &.muted {
    opacity: .6;
  }
  &:not(.selected):disabled {
    opacity: .25;
    color: $foreground;
  }
`

class ShortOptions extends Component {
  static propTypes = {
    options: arrayOf(string).isRequired,
    name: string,
    value: oneOfType([string, arrayOf(string)]),
    onChange: func.isRequired,
    count: number.isRequired
  }

  static defaultProps = {
    count: 1
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const { count, value: values, onChange } = this.props;
    if (count === 1) {
      if (Array.isArray(values)) {
        return onChange(name, [value]);
      }
      else {
        return onChange(name, value);
      }
    }
    else {
      if (values.includes(value)) {
        return onChange(name, values.filter(v => v !== value));
      }
      else {
        if (values.length < count) return onChange(name, [...values, value]);
      }
    }
  }
  
  render() {
    const { options, name, count } = this.props;
    const single = count === 1;
    const isArray = Array.isArray(this.props.value);
    const value = (single && isArray) ? this.props.value[0] : this.props.value;
    return (
      <Paragraph>
        {options.map(option => {
          const selected = single ? value === option : value.includes(option);
          const muted = single ? value && !selected : false;
          const disabled = single ? selected : !selected && value.length === count;
          return (
            <Option key={option} name={name} value={option} rx={{selected, muted}} disabled={disabled} onClick={this.handleChange}>
              {option}
            </Option>
          )
        })}
      </Paragraph>
    );
  }
}

export default ShortOptions;