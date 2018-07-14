import React, { Component } from 'react'
import { string } from 'prop-types'
import rx from 'resplendence'
  
import { markdown } from 'markdown';

rx`
@import '~DreamAskew/styles';
`

const Container = rx('div')`
  width: 100%;
  max-width: 600px;
  @include break-inside(avoid);
  * {
    font-family: $body;
    margin-bottom: 0;
    line-height: 1.3;
    @include break-inside(avoid);
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
    const { text, ...rest } = this.props;
    return (
      <Container dangerouslySetInnerHTML={{__html: !text ? "" : markdown.toHTML(text)}} {...rest}/>
    );
  }
}

export default name;