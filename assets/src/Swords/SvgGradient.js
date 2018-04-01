import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
rx`
@import '~Swords/styles';
`

const Svg = rx('svg')`
  position: absolute;
`

class SvgGradient extends Component {
  static propTypes = {
    colors: arrayOf(string),
    tone: bool  
  }
  
  render() {
    const { colors, tone } = this.props;
    const c = colors || [tone ? "white" : "black"];
    const id = tone ? "gradient-jovial" : "gradient-glum";
    let content = null;
    if (c.length === 1) {
      content = (
        <linearGradient id={id} x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor={c[0]}/>
          <stop offset="100%" stopColor={c[0]}/>
        </linearGradient>  
      )
    }
    else {
      content = (
        <linearGradient id={id} x1="0" x2="1" y1="1" y2="0">
          {colors.map((color, i) => (
            <stop key={i} offset={`${(i * 100) / (colors.length - 1)}%`} stopColor={color}/>
          ))}
        </linearGradient>
      )
    }
    return (
      <Svg>
        {content}
      </Svg>
    );
  }
}

export default SvgGradient;