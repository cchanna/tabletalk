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
  flex: 1 0 40%;
  max-width: 600px;
`
const EditButton = rx('button')`
  @include button-style;
  margin-left: 20px;
`

const Divider = rx('div')`
  width: 100%;
  box-sizing: border-box;
  align-self: center;
  height: 1px;
  background: $foreground;
  opacity: .2;
  margin: 50px 0;
`
const Body = rx('div')`
  display: flex;
  flex-flow: column nowrap;
  &.over-small {
    flex-flow: row nowrap;
  }
`
const Stats = rx('div')`
  flex: 1 0 50%;
  display: flex;
  flex-flow: row wrap;
  margin: 0;
  &.over-small {
    margin: 0 0 0 20px;
  }
`
const StringsSection = rx('div')`
  flex: 2 0 200px;
  max-width: 600px;
  margin: 20px 0;
  &.over-small {
    margin-top: 0;
  }
`
const ConditionsSection = rx('div')`
  flex: 1 0 200px;
  min-width: 200px;
  max-width: 400px;
`


class SideCharacter extends Component {
  static propTypes = {
    id: number.isRequired, 
    depth: number.isRequired,
    name: string.isRequired, 
    notes: string.isRequired,
    editSideCharacter: func.isRequired,
    sizes: arrayOf(string).isRequired
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
    const { id, depth, name, notes, sizes } = this.props;
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
        <Body rx={sizes}>
          {info}
          <Stats rx={sizes}>
            <StringsSection rx={sizes}>
              <Strings id={id} depth={depth} sideCharacter/>
            </StringsSection>
            <ConditionsSection rx={sizes}>
              <Conditions {...{id}}/>
            </ConditionsSection>
          </Stats>
        </Body>
        <Divider/>
      </Container>
    );
  }
}

export default SideCharacter;