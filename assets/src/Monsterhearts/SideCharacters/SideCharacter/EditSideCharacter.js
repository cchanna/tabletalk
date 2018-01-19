import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'

import SideCharacterForm from 'Monsterhearts/common/SideCharacterForm';


class EditSideCharacter extends Component {
  static propTypes = {
    id: number.isRequired,
    name: string.isRequired,
    notes: string.isRequired,
    editSideCharacter: func.isRequired,
    onCancel: func.isRequired
  }

  handleSubmit = ({name, notes}) => {
    const { id, editSideCharacter } = this.props;
    editSideCharacter({id, name, notes});
  }
  
  render() {
    const { onCancel, name, notes } = this.props;
    return (
      <SideCharacterForm
        {...{name, notes, onCancel}}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default EditSideCharacter;