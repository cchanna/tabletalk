import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'

import Notes from 'Monsterhearts/common/Notes';

class DarkestSelf extends Component {
  static propTypes = {
    id: number.isRequired,
    text: string.isRequired,
    edit: func.isRequired,
    readOnly: bool.isRequired
  }

  handleEdit = ({value}) => {
    const { id, edit } = this.props;
    edit({id, value});
  }
  
  render() {
    const { text, readOnly } = this.props;
    return (
      <Notes value={text} readOnly={readOnly} onEdit={this.handleEdit}/>
    );
  }
}

export default DarkestSelf;