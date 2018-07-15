import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import {
  Container, Name, Description, Paragraph, Choice, Header,  TopButton,
  Question, List, Item, Columns, Block, Top, EditButton, NotesBlock
} from "../Layout";
import Moves from "../Moves";
import EditCharacter from "./EditCharacter";
import Notes from "../Notes";

rx`
@import '~DreamAskew/styles';
`

const Role = rx('h1')`
  font-size: 25px;
  margin: 0;
  font-family: $header;
  line-height: .8;
`
const Choices = rx('span')`
  max-width: 400px;
`

const Lore = rx('div')`
  font-style: italic;
  margin-top: 10px;
`

const choicesProperties = {
  choices: arrayOf(string).isRequired,
  complete: bool.isRequired,
  statement: string.isRequired
};
const choicesShape = shape(choicesProperties);

const filterStatement = (statement, choices, i = 0) => {
  if (statement === "") return [];
  const match = /{(\d)}/.exec(statement);
  if (match) {
    return [
      statement.slice(0, match.index),
      <Choice key={i}>{choices[parseInt(match[1], 10)]}</Choice>,
      ...filterStatement(statement.slice(match.index + 3), choices, i + 1)
    ]
  }
  return [statement];
}

const RoleChoice = ({choices, complete, statement}) => complete ? (
  <Choices>
    {' ' }{filterStatement(statement, choices)}
  </Choices>
) : null;
RoleChoice.propTypes = choicesProperties;

const Look = ({look, plural}) => (
  <span>
    {!plural ? (
      look[0].match(/^[aeiouAEIOU]/) ? " an " : " a "
    ) : " "}<Choice>{look}</Choice>
  </span>
)
Look.propTypes = {
  look: string.isRequired,
  plural: bool.isRequired
}

class Character extends Component {
  static propTypes = {
    id: number.isRequired,
    mine: bool,
    name: string,
    role: string.isRequired,
    look1: string,
    look2: string,
    choices1: choicesShape.isRequired,
    choices2: choicesShape.isRequired,
    gender: string,
    pronouns: string,
    styles: arrayOf(string).isRequired,
    keyRelationships: arrayOf(string).isRequired,
    notes: string,
    definition: shape({
      look1Plural: bool.isRequired,
      look2Plural: bool.isRequired,
      playToFindOut: arrayOf(string).isRequired,
      tips: arrayOf(string).isRequired,
      myLure: string.isRequired,
      strongMoves: arrayOf(string).isRequired,
      strongQuestions: arrayOf(string).isRequired,
      regularMoves: arrayOf(string).isRequired,
      regularQuestions: arrayOf(string).isRequired,
      weakMoves: arrayOf(string).isRequired,
      weakQuestions: arrayOf(string).isRequired
    }).isRequired,
    setNotes: func.isRequired
  }

  done = (props = this.props) => {
    const { 
      name, look1, look2,
      gender, pronouns,
      styles,
      choices1, choices2,
      keyRelationships,
    } = props;
    return name && look1 && look2 && gender && pronouns && 
    styles.length >= 2 && choices1.complete && choices2.complete && keyRelationships.length
  }

  constructor(props) {
    super(props);
    this.state = {
      editing: props.mine && !this.done(props)
    }
  }

  edit = () => {
    this.setState({editing: true});
  }

  finishEdit = () => {
    if (this.done()) this.setState({editing: false});
  }

  setNotes = ({value}) => {
    const { id, setNotes } = this.props;
    setNotes({id, value});
  }

  
  render() {
    const { 
      id, mine, role, name,
      look1, look2,
      gender, pronouns,
      styles, keyRelationships,
      choices1, choices2,
      definition, notes
    } = this.props;
    const { 
      lore, description,
      playToFindOut, tips, myLure,
      strongMoves, strongQuestions,
      regularMoves, regularQuestions,
      weakMoves, weakQuestions,
      look1Plural, look2Plural,
    } = definition;
    const done = this.done();
    const editing = mine && (this.state.editing || !done);
    const loreBlock = (
      <Lore>
        <Paragraph>{lore}</Paragraph>
        <Paragraph>{description}</Paragraph>
      </Lore>
    );
    const otherInfo = (
      <div>
        <Header>Play to Find Out</Header>
        {playToFindOut.map((why, i) => (
          <Question key={i}>{why}</Question>
        ))}
        <Header>Tips</Header>
        <List>
          {tips.map((tip, i) => (
            <Item key={i}>{tip}</Item>
          ))}
        </List>
        <Header>Lure</Header>
        <Paragraph>{myLure}</Paragraph>
      </div>
    )
    console.log(notes)
    return (
      <Container>
        <Top>
          <Name>{name && !editing ? name : "The " + role}</Name>
          {mine ? (
            editing ? (
              done ? (
                <EditButton onClick={this.finishEdit} rx={{selected: true}}>P</EditButton>
              ) : null
            ) : (
              <EditButton onClick={this.edit}>P</EditButton>
            )
          ) : null}
        </Top>
        <NotesBlock>
          <Notes value={notes} onEdit={this.setNotes} readOnly={!mine} />
        </NotesBlock>
        <Columns>
          {editing ? (
            <Block>
              <EditCharacter id={id} />
              <TopButton onClick={this.finishEdit} disabled={!done}>Done</TopButton>
            </Block>
          ) : (
            <Block>
              {name ? <Role>The {role}</Role> : null}
              <Description>
                {look1 && look2 ? (
                  <Choices>
                    I have
                    <Look look={look1} plural={look1Plural} /> and
                    <Look look={look2} plural={look2Plural} />.
                  </Choices> 
                ) : null}
                {gender && pronouns ? (
                  <Choices>
                    {' ' }My gender is <Choice>{gender}</Choice> and 
                    my pronouns are <Choice>{pronouns}</Choice>.
                  </Choices>
                ) : null}
                {styles.length >= 2 ? (
                  <Choices>
                    {' ' }My styles are <Choice>{styles[0]}</Choice> and <Choice>{styles[1]}</Choice>.
                  </Choices>
                ) : null}
                <RoleChoice {...choices1}/>
                <RoleChoice {...choices2}/>
                {keyRelationships.length === 2 ? (
                  <Choices>
                    {' '}My key relationships are <Choice>{keyRelationships[0]}</Choice> and <Choice>{keyRelationships[1]}</Choice>.
                  </Choices>
                ) : null}
                {keyRelationships.length === 1 ? (
                  <Choices>
                    {' '}My key relationship is <Choice>{keyRelationships[0]}</Choice>.
                  </Choices>
                ) : null}
              </Description>
              {loreBlock}
              {otherInfo}
            </Block>
          )}
          <Block>
            {editing ? loreBlock : null}
            {editing ? otherInfo : null}
            <Moves {...{strongMoves, strongQuestions, regularMoves, regularQuestions, weakMoves, weakQuestions}} />
          </Block>
        </Columns>
      </Container>
    );
  }
}

export default Character;