import React, { Component } from 'react'
import { string } from 'prop-types'
import rx from 'resplendence'

import Markdown from 'Monsterhearts/common/Markdown';

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
        <Markdown text={text}/>
      </Container>
    );
  }
}

export default Move;