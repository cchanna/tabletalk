import React from 'react'
import { string, number, bool, func, shape, object, arrayOf, node, oneOfType, instanceOf } from 'prop-types'

class Route extends React.Component {
  static propTypes = {
    Component: oneOfType([func, instanceOf(React.Component)]),
    depth: number.isRequired
  }
  
  render() {
    const { Component, depth, ...properties } =  this.props;
    if (!Component) return null;
    return (
      <Component depth={depth} {...properties}/>
    );
  }
}

export default Route;