import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import AddMove from '../AddMove';

rx`
@import '~common/styles';
@import '~common/colors';
`

const Container = rx('div')`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`

class AnyMove extends Component {
  static propTypes = {
    id: string.isRequired,
    createAdvancement: func.isRequired, 
    goBack: func.isRequired
  }

  handleAdd = move => {
    const { createAdvancement, goBack } = this.props;
    const { id } = this.props;
    createAdvancement({id, advancementId: "any", move});
    goBack();
  }
  
  render() {
    const { id } = this.props;
    return (
      <Container>
        <AddMove id={id} onAdd={this.handleAdd}/>
      </Container>
    );
  }
}

export default AnyMove;