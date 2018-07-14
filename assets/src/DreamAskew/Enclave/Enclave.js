import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import {
  Container, Name, Paragraph, Header, Columns, 
  Block, Top, EditButton, TopButton, 
  listWithAnd
} from "../Layout";
import ShortOptions from "../ShortOptions";
import MinorCharacter from "./MinorCharacter";
import NewMinorCharacter from "./NewMinorCharacter";

class Enclave extends Component {
  static propTypes = {
    visuals: arrayOf(string).isRequired,
    allVisuals: arrayOf(string).isRequired,
    conflicts: arrayOf(string).isRequired,
    allConflicts: arrayOf(string).isRequired,
    minorCharacterIds: arrayOf(number).isRequired,
    setEnclaveConflicts: func.isRequired,
    setEnclaveVisuals: func.isRequired
  }

  done = () => {
    const { visuals, conflicts } = this.props;
    return visuals.length >= 3 && conflicts.length >= 3;
  }

  constructor(props) {
    super(props);
    this.state = {
      editing: !this.done(),
    }
  }

  startEdit = () => this.setState({editing: true});
  finishEdit = () => {
    if (this.done()) this.setState({editing: false});
  }

  handleChange = (name, value) => {
    if (name === "visuals") {
      this.props.setEnclaveVisuals({value});
    }
    else {
      this.props.setEnclaveConflicts({value});
    }
  }
  
  render() {
    const { visuals, allVisuals, conflicts, allConflicts, minorCharacterIds } = this.props;
    const { editing } = this.state;
    const done = this.done();
    return (
      <Container>
        <Top>
          <Name>The Enclave</Name>
          {done ? (
            editing ? (
              <TopButton onClick={this.finishEdit}>Done</TopButton>
            ) : (
              <EditButton onClick={this.startEdit}>P</EditButton>
            )
          ) : null}
        </Top>
        {editing || !done ? (
          <Columns>
            <Block>
              <Header>Choose 3-5 Visuals</Header>
              <ShortOptions options={allVisuals} value={visuals} count={5} onChange={this.handleChange} name="visuals" />
            </Block>
            <Block>
              <Header>Choose 3 Things That Are In Conflict In The Enclave</Header>
              <ShortOptions options={allConflicts} value={conflicts} count={3} onChange={this.handleChange} name="conflicts" />
            </Block>
          </Columns>
        ) : (
          <Block>
            <Paragraph>
              In the enclave, you can find {listWithAnd(visuals)}. {listWithAnd(conflicts, true)} are in conflict here.
            </Paragraph>
        </Block>
        )}
        <Block>
          {minorCharacterIds.map(id => <MinorCharacter key={id} id={id} showEdit={editing}/>)}
          <NewMinorCharacter />
        </Block>
      </Container>
    );
  }
}

export default Enclave;