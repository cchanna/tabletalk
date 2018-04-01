import React, { Component } from 'react'
import { string, number, bool, func, shape, arrayOf, oneOf } from 'prop-types'
import rx from 'resplendence'
  
rx`
@import '~common/styles';
@import '~common/colors';
`

class Die extends Component {
  static propTypes = {
    className: string.isRequired,
    colors: arrayOf(string),
    value: oneOf([0, 1, 2, 3, 4, 5, 6]) 
  }
  
  render() {
    const { className, colors, value } = this.props;
    const id = "Gradient-" + colors.join("-");
    return (
      <svg 
        className={className}
        x="0px"
        y="0px"
        version="1.1" 
        width="1em" 
        height="1em" 
        preserveAspectRatio="none"
        viewBox="-50 -50 1124 1124">
        
        {colors && colors.length > 1 ? (
          <linearGradient id={id} x1="0" x2="1" y1="1" y2="0">
            {colors.map((color, i) => (
              <stop key={i} offset={`${(i * 100) / (colors.length - 1)}%`} stopColor={color}/>
            ))}
          </linearGradient>
        ) : null}
        {colors && colors.length === 1 ? (
          <linearGradient id={id}>
              <stop offset="0%" stopColor={colors[0]}/>
              <stop offset="100%" stopColor={colors[0]}/>
          </linearGradient>
        ) : null}
        <path fill={`url(#${id})`}  d={`
          M 149 72
          c -42.526 0 -77 34.474 -77 77
          v 726 
          c 0 42.526 34.474 77 77 77
          h 726
          c 42.526 0 77 -34.474 77 -77
          v -726
          c 0 -42.526 -34.474 -77 -77 -77
          h -726
          z
          ${
            (value >= 4) ? `
              M 246.94 144.060
              c 53.943 1.636 97.051 45.753 97.060 99.939 0 55.229 -44.772 100.001 -100 100.001
              s -100 -44.772 -100 -100
              c 0.010 -55.221 44.777 -99.983 100 -99.983 1.034 0 2.064 0.016 3.090 0.047
              z 
            ` : ""
          }
          ${
            (value > 1) ? `
              M 782.94 144.060
              c 53.943 1.636 97.051 45.753 97.060 99.939 0 55.229 -44.772 100.001 -100 100.001
              s -100 -44.772 -100 -100
              c 0.010 -55.221 44.777 -99.983 100 -99.983 1.034 0 2.064 0.016 3.090 0.047
              z
            ` : ""
          }
          ${
            (value === 6) ? `
              M 244 412 
              c 55.228 0 100 44.772 100 100
              s -44.772 100 -100 100
              c -55.228 0 -100 -44.772 -100 -100
              s 44.772 -100 100 -100
              z
            ` : ""
          }
          ${
            (value % 2 === 1) ? `
              M 512 412
              c 55.228 0 100 44.772 100 100
              s -44.772 100 -100 100
              c -55.228 0 -100 -44.772 -100 -100
              s 44.772 -100 100 -100
              z
            ` : ""
          }
          ${
            (value === 6) ? `
              M 780 412
              c 55.228 0 100 44.772 100 100
              s -44.772 100 -100 100
              c -55.228 0 -100 -44.772 -100 -100
              s 44.772 -100 100 -100
              z
            ` : ""
          }
          ${
            (value > 1) ? `
              M 246.94 680.060
              c 53.943 1.636 97.051 45.753 97.060 99.939 0 55.229 -44.772 100.001 -100 100.001
              s -100 -44.772 -100 -100
              c 0.010 -55.221 44.777 -99.983 100 -99.983 1.034 0 2.064 0.016 3.090 0.047
              z
            ` : ""
          }
          ${
            (value >= 4) ? `
              M 782.94 680.060
              c 53.943 1.636 97.051 45.753 97.060 99.939 0 55.229 -44.772 100.001 -100 100.001
              s -100 -44.772 -100 -100
              c 0.010 -55.221 44.777 -99.983 100 -99.983 1.034 0 2.064 0.016 3.090 0.047
              z
            ` : ""
          }
        `}/>
      </svg>
      
    );
  }
}

export default Die;