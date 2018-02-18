import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import Markdown from 'Monsterhearts/common/Markdown';
// import Conditions from 'Monsterhearts/common/Conditions';
import Strings from 'Monsterhearts/common/Strings';
import EditSideCharacter from './EditSideCharacter';
import Conditions from 'Monsterhearts/common/Conditions';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  width: 100%;
  font-size: 20px;
  font-family: $body;
  font-color: $foreground;
  display: flex;
  flex-flow: column nowrap;
`
const Name = rx('h1')`
  font-family: $header;
  font-size: 2em;
  margin: 0;
  &.main {
    color: $accent;
  }
`
const Info = rx('div')`
`
const EditButton = rx('button')`
  @include button-style;
  margin-left: 20px;
`

const Divider = rx('div')`
  width: 80%;
  align-self: center;
  height: 1px;
  background: $foreground;
  margin: 50px 0;
`
const Space = rx('div')`
  width: 100%;
  height: 0;
  margin: 20px 0;
`


class SideCharacter extends Component {
  static propTypes = {
    id: number.isRequired, 
    path: arrayOf(string).isRequired, 
    here: arrayOf(string).isRequired,
    name: string.isRequired, 
    notes: string.isRequired,
    editSideCharacter: func.isRequired
  }

  state = {
    editing: false
  }

  handleEdit = (values) => {
    this.props.editSideCharacter(values);
    this.setState({editing: false});
  }

  handleCancel = () => {
    this.setState({editing: false});
  }

  handleStartEditing = () => {
    this.setState({editing: true});
  }
  
  render() {
    const { id, path, here, name, notes } = this.props;
    const { editing } = this.state;
    let info;
    if (editing) {
      info = (
        <Info>
          <EditSideCharacter 
            {...{id, name, notes}}
            editSideCharacter={this.handleEdit}
            onCancel={this.handleCancel}/>
        </Info>
      )
    }
    else {
      info = (
        <Info>
          <Name>
            {name}
            <EditButton onClick={this.handleStartEditing}>Edit</EditButton>
          </Name>
          <Markdown text={notes}/>
        </Info>
      )
    }
    return (
      <Container>
        {info}
        <Space/>
        <Strings {...{id, path, here}}/>
        <Space/>
        <Conditions {...{id}}/>
        <Divider/>
      </Container>
    );
  }
}

export default SideCharacter;