import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
  
import {
  Header, List, Item, DoneButton, TopButton
} from "../../Layout";
import ShortOptions from "../../ShortOptions";

const Container = 'div';




class EditCharacter extends Component {
  static propTypes = {
    character: shape({
      id: number,
      name: string,
      role: string.isRequired,
      look1: string,
      look2: string,
      choices1: arrayOf(string).isRequired,
      choices2: arrayOf(string).isRequired,
      gender: string,
      pronouns: string,
      styles: arrayOf(string).isRequired,
      keyRelationships: arrayOf(string).isRequired
    }),
    role: shape({
      names: arrayOf(string).isRequired, 
      looks1: arrayOf(string).isRequired, 
      looks2: arrayOf(string).isRequired, 
      genders: arrayOf(string).isRequired, 
      wardrobeStyles: arrayOf(string).isRequired, 
      choice1: shape({
        command: string.isRequired,
        options: arrayOf(string).isRequired,
        count: number.isRequired
      }), 
      choice2: shape({
        command: string.isRequired,
        options: arrayOf(string).isRequired,
        count: number.isRequired
      }), 
      keyRelationships: arrayOf(string).isRequired, 
      askLeft: arrayOf(string).isRequired
    }).isRequired,
    setName: func.isRequired,
    setLook1: func.isRequired,
    setLook2: func.isRequired,
    setPronouns: func.isRequired,
    setGender: func.isRequired,
    setStyles: func.isRequired,
    setChoices1: func.isRequired,
    setChoices2: func.isRequired,
    setKeyRelationships: func.isRequired
  }

  constructor(props) {
    super(props);
  }

  handleChange = (name, value) => {
    const {
      character,
      setName, setLook1, setLook2,
      setPronouns, setGender,
      setStyles, setChoices1, setChoices2,
      setKeyRelationships
    } = this.props;
    const { id } = character;
    switch(name) {
      case "name":
        return setName({id, value});
      case "look1":
        return setLook1({id, value});
      case "look2":
        return setLook2({id, value});
      case "pronouns":
        return setPronouns({id, value});
      case "gender":
        return setGender({id, value});
      case "styles":
        return setStyles({id, value});
      case "choices1":
        return setChoices1({id, value});
      case "choices2":
        return setChoices2({id, value});
      case "keyRelationships":
        return setKeyRelationships({id, value});
    }
  }
  
  render() {
    const { character, role } = this.props;
    const {
      name, look1, look2, gender, pronouns, styles,
      choices1, choices2,
      keyRelationships: myRelationships,
    } = character;
    const { 
      names, looks1, looks2, genders,
      choice1, choice2, 
      wardrobeStyles, keyRelationships, askLeft
    } = role;
    const myChoices = [choices1, choices2];
    const roleChoices = [choice1, choice2];
    return (
      <Container>
        <Header>Choose a Name</Header>
        <ShortOptions name="name" value={name} options={names} onChange={this.handleChange} />
        <Header>Choose a Look</Header>
        <ShortOptions name="look1" value={look1} options={looks1} onChange={this.handleChange} />
        <ShortOptions name="look2" value={look2} options={looks2} onChange={this.handleChange} />
        <Header>Choose a Gender</Header>
        <ShortOptions name="gender" value={gender} options={genders} onChange={this.handleChange} />
        <Header>Choose Your Pronouns</Header>
        <ShortOptions name="pronouns" value={pronouns} options={["they/them", "she/her", "he/him"]} onChange={this.handleChange} />
        <Header>Choose 2 Wardrobe Styles</Header>
        <ShortOptions name="styles" value={styles || []} options={wardrobeStyles} onChange={this.handleChange} count={2} />
        {[0, 1].map(i => {
          const choice = roleChoices[i];
          const choices = myChoices[i];
          return (
            <div key={i}>
              <Header>{choice.command}</Header>
              <ShortOptions name={"choices" + (i + 1)} value={choices} options={choice.options} onChange={this.handleChange} count={choice.count}/>
            </div>
          )
        })}
        <Header>Choose 1-2 Key Relationships</Header>
        <ShortOptions name="keyRelationships" value={myRelationships} options={keyRelationships} onChange={this.handleChange} count={2} />
        <Header>Choose 1 to Ask Left</Header>
        <List>{askLeft.map(q => <Item key={q}>{q}</Item>)}</List>
      </Container>
    );
  }
}

export default EditCharacter;