import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import { markdown } from 'markdown';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  width: 100%;
  * {
    font-family: $body;
    margin-bottom: 0;
    line-height: 1.3;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  h1, h2, h3, h4, h5 {
    font-family: $header;
    margin-bottom: 0;
    &+p {
      margin-top: 0;
    }
  }
  ul, ol {
    margin-top: 0;
  }
`

class name extends Component {
  static propTypes = {
    text: string
  }
  
  render() {
    const { text } = this.props;
    return (
      <Container dangerouslySetInnerHTML={{__html: !text ? "" : markdown.toHTML(text)}}/>
    );
  }
}

export default name;