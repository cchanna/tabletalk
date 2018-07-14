import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import Notes from "../../Notes"
import EditableName from "../EditableName";

rx`
@import '~DreamAskew/styles';
`

const Container = rx('div')`

`
class MinorCharacter extends Component {
  static propTypes = {
    id: number.isRequired,
    name: string.isRequired,
    notes: string,
    showEdit: bool.isRequired,
    setMinorCharacterName: func.isRequired,
    setMinorCharacterNotes: func.isRequired
  }

  state = {
    editing: false,
    hovering: false,
    name: ""
  }

  handleMouseOver = () => this.setState({hovering: true});
  handleMouseLeave = () => this.setState({hovering: false});

  handleEditNotes = ({value}) => {
    const { id, setMinorCharacterNotes } = this.props;
    setMinorCharacterNotes({id, value});
  }
  handleEditName = value => {
    const { id, setMinorCharacterName } = this.props;
    setMinorCharacterName({id, value});
  }

  render() {
    const { name, notes, showEdit } = this.props;
    const { hovering } = this.state;
    return (
      <Container onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
        <EditableName name={name} showEdit={hovering || showEdit} onChange={this.handleEditName} />
        <Notes value={notes} onEdit={this.handleEditNotes} />
      </Container>
    );
  }
}

export default MinorCharacter;