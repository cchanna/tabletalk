import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import convertToParagraphs from './convertToParagraphs';

const Container = rx('div')`
  -webkit-column-break-inside: avoid;
            page-break-inside: avoid;
                 break-inside: avoid;
  margin-bottom: 20px;
`
const Name = rx('h1')`
  font-size: 1.1em;
  font-weight: bold;
  font-style: italic;
  margin: 0;
`

class Move extends Component {
  static propTypes = {
    name: string.isRequired,
    text: string
  }
  
  render() {
    const { name, text } = this.props;
    return (
      <Container>
        <Name>{name}</Name>
        {convertToParagraphs(text)}
      </Container>
    );
  }
}

export default Move;