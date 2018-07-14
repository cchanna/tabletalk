import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import Markdown from 'DreamAskew/Markdown';
import {
  Container, Name, Description, Paragraph, Choice, Header, TopButtonBlue, TopButton,
  Questions, Question, List, Item, Columns, Block, Lore, 
  list, Top, NotesBlock, EditButton
} from "../Layout";
import ShortOptions from "../ShortOptions";
import Notes from "../Notes";

rx`
@import '~DreamAskew/styles';
`

const Divider = rx('div')`
  align-self: center;
  width: calc(100% - 20px);
  height: 0px;
  margin: 10px 0;
  border-bottom: 1px solid fade-out($foreground, .5);
`
class Setting extends Component {
  static propTypes = {
    name: string.isRequired,
    mine: bool.isRequired,
    lore: string.isRequired,
    desires: arrayOf(string),
    allDesires: arrayOf(string).isRequired,
    tips: arrayOf(string).isRequired,
    pickUpWhen: string.isRequired,
    giveAwayWhen: string.isRequired,
    moves: arrayOf(string),
    divider: bool,
    notes: string,
    replace: func.isRequired,
    depth: number.isRequired,
    createSetting: func.isRequired, 
    pickUpSetting: func.isRequired, 
    giveAwaySetting: func.isRequired,
    setSettingDesires: func.isRequired,
    setSettingNotes: func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      editing: props.desires && props.desires.length < 2
    }
  }

  pickUp = () => {
    const { name, depth, desires, pickUpSetting, createSetting, replace } = this.props;
    if (desires) {
      pickUpSetting({name});
    }
    else {
      createSetting({name});
    }
    replace([], depth - 2);
  }
  putDown = () => {
    const { name, giveAwaySetting } = this.props;
    giveAwaySetting({name});
  }
  handleChangeDesires = (_name, value) => {
    const { name, setSettingDesires } = this.props;
    setSettingDesires({name, value});
  }
  handleChangeNotes = value => {
    const { name, setSettingNotes } = this.props;
    setSettingNotes({name, value});
  }
  toggleEdit = () => this.setState(({editing}) => ({editing: !editing}))
  
  render() {
    const { name, mine, lore, allDesires, tips, pickUpWhen, giveAwayWhen, moves, divider, desires, notes } = this.props;
    const { editing } = this.state;
    const done = desires && desires.length == 2;
    return (
      <Container>
        {divider ? <Divider /> : null}
        <Top>
          <Name>The {name}</Name>
          {mine && done ? <EditButton onClick={this.toggleEdit} rx={{selected: editing}}>P</EditButton> : null}
          {mine ? (
            <TopButton onClick={this.putDown}>Give Away</TopButton>
          ) : (
            <TopButtonBlue onClick={this.pickUp}>Pick Up</TopButtonBlue>
          )}
        </Top>
        <Lore>
          <Markdown text={lore} />
        </Lore>
        <NotesBlock>
          <Notes value={notes || ""} onEdit={this.handleChangeNotes} readOnly={!mine}/>
        </NotesBlock>
        <Columns>
          <Block>
            {!editing && desires && desires.length === 2 ? (
              <Description>Desires <Choice>{desires[0]}</Choice> and <Choice>{desires[1]}</Choice>.</Description>
            ) : (
              <div>
                <Header>Choose 2 Desires</Header>
                {desires && mine ? (
                  <ShortOptions value={desires} options={allDesires} count={2} onChange={this.handleChangeDesires} />
                ) : (
                  <Paragraph>{list(allDesires)}</Paragraph>
                )}
              </div>
            )}
            <Header>Tips</Header>
            <List>
              {tips.map((tip, i) => (
                <Item key={i}>{tip}</Item>
              ))}
            </List>
          </Block>
          <Block>
            <Header>Pick Up When</Header>
            <Paragraph>{pickUpWhen}</Paragraph>
            <Header>Give Away When</Header>
            <Paragraph>{giveAwayWhen}</Paragraph>
            <Header>Moves</Header>
            <List>
              {moves.map((move, i) => (
                <Item key={i}>{move}</Item>
              ))}
            </List>
            <Questions>
              <Question>After every move, ask “What do you do?”</Question>
            </Questions>
          </Block>
        </Columns>
      </Container>
    );
  }
}

export default Setting;