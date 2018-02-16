import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf, node } from 'prop-types'
import cx from 'classnames';  

class Link extends Component {
  static propTypes = {
    to: arrayOf(string).isRequired,
    active: bool.isRequired,
    exact: bool.isRequired,
    disabled: bool.isRequired,
    className: string,
    children: node.isRequired,
    goTo: func.isRequired
  }
  static defaultProps = {
    disabled: false
  }
  
  handleClick = e => {
    e.preventDefault();
    const { to, exact, goTo, disabled } = this.props;
    if (!exact && !disabled) goTo(to);
  }

  render() {
    const { to, active, exact, goTo, className, disabled, children, ...rest } = this.props;
    return (
      <a 
        className={cx(className, {active, exact, disabled})} 
        href={to.join("/")} 
        onClick={this.handleClick} 
        {...rest}
      >
        {children}
      </a>
    );
  }
}

export default Link;