import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
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
  @include break-inside(avoid);
`
const Name = rx('h2')`
  font-size: 1.1em;
  font-weight: bold;
  margin: 0;
  padding: 0;
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