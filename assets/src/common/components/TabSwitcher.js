import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf, node, oneOfType } from 'prop-types'
import rx from 'resplendence';

const Tab = rx('div')`
  position: absolute;
  width: 100%;
  height: 100%;
  transition-property: left, top;
  transition-duration: 150ms;
`

class TabSwitcher extends Component {
  static propTypes = {
    children: arrayOf(node).isRequired,
    index: oneOfType([number, string]).isRequired,
    vertical: bool.isRequired
  }

  static defaultProps = {
    vertical: false
  }
  
  render() {
    const { children, index, vertical, ...rest } = this.props;
    if (!children) return null;
    const keys = children.map((child, i) => child.key || i);
    const position = keys.indexOf(index);
    return (
      <div style={{position: "relative"}} {...rest}>
        {children.map((child, i) => (
          <Tab key={child.key || i} style={{
            left: vertical ? "0" : `${(i - position) * 100}%`,
            top: vertical ? `${(i - position) * 100}%` : "0",
          }}>
            {child}
          </Tab>
        ))}
      </div>
    );
  }
}

export default TabSwitcher;