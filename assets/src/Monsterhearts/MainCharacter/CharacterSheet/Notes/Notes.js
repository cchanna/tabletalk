import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import AutoSizeTextArea from 'react-textarea-autosize';
import CommonNotes from 'Monsterhearts/common/Notes';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  width: 100%;
`
const Header = rx('h2')`
  font-family: $header;
  margin: 0;
`

class Notes extends Component {
  static propTypes = {
    notes: string.isRequired,
    readOnly: bool.isRequired,
    setNotes: func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      notes: props.notes
    }
  }
  handleEdit = ({value}) => {
    const { id, setNotes, notes, readOnly  } = this.props;
    if (!readOnly && notes !== value) {
      setNotes({id, notes: value});
    }
  }
  
  render() {
    const { notes, readOnly } = this.props;
    if (readOnly && !notes) return null;
    return (
      <Container>
        <Header>Notes</Header>
        <CommonNotes
          value={notes}
          readOnly={readOnly}
          onEdit={this.handleEdit}/>
      </Container>
    );
  }
}

export default Notes;