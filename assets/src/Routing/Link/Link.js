import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import cx from 'classnames';  

class Link extends Component {
  static propTypes = {
    to: arrayOf(string).isRequired,
    active: bool.isRequired,
    goTo: func.isRequired
  }
  
  handleClick = e => {
    e.preventDefault();
    const { to, exact, goTo, disabled } = this.props;
    if (!exact && !disabled) goTo(to);
  }

  render() {
    const { to, active, exact, goTo, className, disabled, ...rest } = this.props;
    return (
      <a 
        className={cx(className, {active, exact, disabled})} 
        href={to.join("/")} 
        onClick={this.handleClick} 
        {...rest}
      />
    );
  }
}

export default Link;