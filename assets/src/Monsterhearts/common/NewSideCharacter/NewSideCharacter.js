import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
  
import SideCharacterForm from '../SideCharacterForm';


class NewSideCharacter extends Component {
  static propTypes = {
    unansweredSlowActions: object.isRequired,
    createSideCharacter: func.isRequired
  }

  state = {
    actionId: null
  }

  componentDidUpdate(prevProps) {
    const { actionId } = this.state;
    if (actionId) {
      const { unansweredSlowActions } = this.props;
      if (prevProps.unansweredSlowActions[actionId] && !unansweredSlowActions[actionId]) {
        this.setState({actionId: null});
      }
    }
  }

  handleSubmit = ({name, notes}) => {
    const { actionId } = this.state;
    if (!actionId) {
      const { createSideCharacter } = this.props;
      const actionId = createSideCharacter({name, notes});
      this.setState({actionId});
    }
  }
  
  render() {
    const { actionId } = this.state;
    return (
      <SideCharacterForm
        onSubmit={this.handleSubmit}
        submitting={!!actionId}/>
    );
  }
}

export default NewSideCharacter;