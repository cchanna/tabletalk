import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
// eslint-disable-next-line no-unused-vars
import rx from 'resplendence'
  
import {
  Container, Name, Paragraph, Header, TopButtonBlue, Top,
  Question, List, Item, Columns, Block, Lore, list
} from "../Layout";
import Moves from "../Moves";

rx`
@import '~DreamAskew/styles';
`

const optionsProperties = {
  options: arrayOf(string).isRequired,
  command: string.isRequired,
  short: bool.isRequired
};
const optionsShape = shape(optionsProperties);


class Role extends Component {
  static propTypes = {
    name: string.isRequired,
    lore: string.isRequired,
    description: string.isRequired,
    names: arrayOf(string).isRequired,
    looks1: arrayOf(string).isRequired,
    looks2: arrayOf(string).isRequired,
    genders: arrayOf(string).isRequired,
    wardrobeStyles: arrayOf(string).isRequired,
    choice1: optionsShape.isRequired,
    choice2: optionsShape.isRequired,
    playToFindOut: arrayOf(string).isRequired,
    tips: arrayOf(string).isRequired,
    myLure: string.isRequired,
    strongMoves: arrayOf(string).isRequired,
    strongQuestions: arrayOf(string).isRequired,
    regularMoves: arrayOf(string).isRequired,
    regularQuestions: arrayOf(string).isRequired,
    weakMoves: arrayOf(string).isRequired,
    weakQuestions: arrayOf(string).isRequired,
    keyRelationships: arrayOf(string).isRequired,
    askLeft: arrayOf(string).isRequired,
    depth: number.isRequired,
    replace: func.isRequired,
    createCharacter: func.isRequired
  }

  handlePlay = () => {
    const { depth, replace, name, createCharacter } = this.props;
    createCharacter({role: name});
    replace([], depth - 2);
  }
  
  render() {
    const { 
      name, lore, description, names, looks1, looks2, genders, 
      wardrobeStyles, choice1, choice2,
      playToFindOut, tips, myLure,
      strongMoves, strongQuestions, 
      regularMoves, regularQuestions,
      weakMoves, weakQuestions,
      keyRelationships, askLeft 
    } = this.props;
    return (
      <Container>
        <Top>
          <Name>The {name}</Name>
          <TopButtonBlue onClick={this.handlePlay}>Choose</TopButtonBlue>
        </Top>
        <Lore>
          <Paragraph>{lore}</Paragraph>
          <Paragraph>{description}</Paragraph>
        </Lore>
        <Columns>
          <Block>
            <Header>Choose a Name</Header>
            <Paragraph>{list(names)}</Paragraph>
            <Header>Choose a Look</Header>
            <Paragraph>{list(looks1)}</Paragraph>
            <Paragraph>{list(looks2)}</Paragraph>
            <Header>Choose a Gender</Header>
            <Paragraph>{list(genders)}</Paragraph>
            <Header>Choose 2 Wardrobe Styles</Header>
            <Paragraph>{list(wardrobeStyles)}</Paragraph>
            <Header>{choice1.command}</Header>
            {choice1.short ? (
              <Paragraph>{list(choice1.options)}</Paragraph>
            ) : (
              <List>
                {choice1.options.map(choice => (
                  <Item key={choice}>{choice}</Item>
                ))}
              </List>
            )}
            <Header>{choice2.command}</Header>
            {choice2.short ? (
              <Paragraph>{list(choice2.options)}</Paragraph>
            ) : (
              <List>
                {choice2.options.map(choice => (
                  <Item key={choice}>{choice}</Item>
                ))}
              </List>
            )}
            <Header>Choose 2 Key Relationships</Header>
            <Paragraph>{list(keyRelationships)}</Paragraph>
            <Header>Choose 1 To Ask Left</Header>
            <List>
              {askLeft.map(q => <Item key={q}>{q}</Item>)}
            </List>
          </Block>
          <Block>
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
            <Moves {...{strongMoves, strongQuestions, regularMoves, regularQuestions, weakMoves, weakQuestions}} />
          </Block>
        </Columns>
      </Container>
    );
  }
}

export default Role;