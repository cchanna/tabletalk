import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import AutoSizeTextArea from 'react-autosize-textarea';

import Markdown from 'Monsterhearts/common/Markdown';

import CommonNotes from '../Notes';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  position: relative;
  text-align: left;
  font-size: 20px;
  font-family: $body;
  padding: 0;
  margin-bottom: 40px;
  max-width: 600px;
`
const Text = rx('div')`
  position: relative;
`
const Name = rx('h2')`
  font-size: 1.1em;
  font-weight: bold;
  margin: 0;
  padding: 0;
`
const Notes = rx('div')`
  margin-top: 10px;
`
const NotesTextArea = rx(AutoSizeTextArea)`
  @include input-style;
  width: 100%;
  box-sizing: border-box;
  &.hidden {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }
`
const NotesDisplay = rx('button')`
  @include button;  
  @include input-style;
  width: 100%;
  margin-bottom: 5px;
  &:disabled {
    border-color: transparent;
  }
  &:not(:disabled):active {
    opacity: 0;
  }
  &.hidden {
    display: none;
    position: absolute;
    pointer-events: none;
  }
  &.placeholder {
    color: darken($foreground, 50%);
  }
  p:not(:last-child) {
    margin-bottom: 15px;
  }
  text-align: left;
`

class Move extends Component {
  static propTypes = {
    id: number.isRequired,
    name: string.isRequired,
    text: string,
    notes: string,
    disabled: bool,
    showNotes: bool,
    readOnly: bool.isRequired,
    editMoveNotes: func.isRequired
  }

  textArea = null;

  constructor(props) {
    super(props);
    this.state = {
      notes: this.props.notes,
      editing: false
    }
  }

  handleChange = e => {
    this.setState({notes: e.target.value});
  }

  handleRef = e => this.textArea = e;

  handleBlur = () => {
    const { notes } = this.state;
    const { disabled, editMoveNotes, id, name } = this.props;
    if (!disabled) {
      editMoveNotes({id, name, notes});
      this.setState({editing: false});
    }
  }

  handleClick = () => {
    const { disabled, readOnly } = this.props;
    if (!disabled && !readOnly) {
      this.setState({editing: true});
    }
    if (this.textArea) {
      this.textArea.select();
      this.textArea.setSelectionRange(0, this.textArea.value.length);
    }
  }

  handleEdit = ({value}) => {
    const { disabled, editMoveNotes, id, name } = this.props;
    if (!disabled) editMoveNotes({id, name, notes: value});
  }

  componentDidUpdate(prevProps) {
    const { notes } = this.props;
    const { editing } = this.state;
    if (prevProps.notes !== notes && !editing) {
      this.setState({notes});
    }
  }

  render() {
    const { name, text, disabled, readOnly, showNotes, notes } = this.props;
    let notesComponent = null;
    if (showNotes && notes !== null) {
      notesComponent = <CommonNotes value={notes} disabled={disabled} readOnly={readOnly} onEdit={this.handleEdit}/>
    }
    return (
      <Container>
        <Text className="text">
          <Name>{name}</Name>
          <Markdown text={text}/>
        </Text>
        {notesComponent}
      </Container>
    )
  }
}

export default Move;