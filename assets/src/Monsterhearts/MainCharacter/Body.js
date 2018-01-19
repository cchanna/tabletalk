import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import { characterProperties, mainCharacterProperties } from './propTypes';

rx`
@import '~common/styles';
@import '~common/colors';
`

const Container = rx('div')`

`

class Body extends Component {
  static propTypes = {
    id: number.isRequired,
    ...characterProperties,
    ...mainCharacterProperties
  }
  
  render() {

    return (
      <Container>
      </Container>
    );
  }
}

export default Body;