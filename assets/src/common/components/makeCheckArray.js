import React from 'react';
import rx from 'resplendence';
import { number, func, bool } from 'prop-types';

rx`
@import '~common/styles';
`

const Button = rx('button')`
  @include button; 
`

export default (Component) => {
  return class CheckArray extends React.Component {
    static propTypes = {
      value: number.isRequired,
      max: number.isRequired,
      onIncrement: func.isRequired,
      onDecrement: func.isRequired,
      disabled: bool.isRequired,
      readOnly: bool.isRequired
    }
    static defaultProps = {
      disabled: false,
      readOnly: false
    }

    render() {
      const {value, max, onIncrement, onDecrement, disabled, readOnly, ...props} = this.props;
      const checked = Array
        .from(new Array(value), (x, i) => (
          <Component key={i}/>
        ))
      const unchecked = Array
        .from(new Array(max - value), (x, i) => (
          <Component key={i}/>
        ))
      if (readOnly) {
        return (
          <div {...props}>
            <span className="checked">
              {checked}
            </span>
            <span className="unchecked">
              {unchecked}
            </span>
          </div>
        )
      }
      else {
        return (
          <div {...props}>
            <Button className="checked" onClick={onDecrement}>
              {checked}
            </Button>
            <Button className="unchecked" onClick={onIncrement}>
              {unchecked}
            </Button>
          </div>
        )
      }
    }
  }
}