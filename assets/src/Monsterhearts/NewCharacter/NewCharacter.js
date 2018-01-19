import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import Link from 'Routing/Link';
import Skin from './Skin';
import Spinner from 'common/components/Spinner';

rx`
@import '~common/styles';
@import '~Monsterhearts/colors';
`


const Container = rx('div')`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`

const Header = rx('div')`
  font-family: "Fontin";
  font-size: 20px;
  color: darken($foreground, 10%);
  margin: 0 0 20px 0;
  flex: 0 0 auto;
`

const Buffer = rx('div')`
  flex: 1 0 0;
  height: 50%;
  width: 100%;
  max-height: 50%;
  transition: .3s max-height cubic-bezier(1, 0, 0, 1);
  &.collapsed {
    max-height: 0%;
  }
`

const SkinList = rx('div')`
  display: flex;
  flex: 0 0 auto;
  flex-flow: row wrap;
  justify-content: center;
  width: 100%;
`
const SkinLink = rx(Link)`
  @include link;
  font-family: "League Spartan";
  font-size: 18px;
  
  color: $foreground;
  display: block;
  transition-duration: .3s;
  transition-property: color;  
  height: 32px;
  &.active {
    color: lighten(saturate($accent, 10%), 5%);
  }
  &:not(.active).dull {
    color: darken($foreground, 20%);
  }
  margin: 0 10px;
`

const Content = rx('div')`
  flex: 0 1 auto;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  margin: 20px 0;
  height: 100%;
  &.under-laptop {
    overflow-y: scroll;
    height: auto;
  }
`
const BigName = rx('span')`
  font-size: 1.2em;
`

const parseMove = text => text;

const Button = rx('button')`
  @include button;
  background: $accent;
  color: white;
  font-family: "Yataghan";
  font-size: 25px;
  padding: 0 10px 1px 10px;
  border-radius: 5px;
  box-shadow: -1px 1px 2px 1px rgba(0, 0, 0, .5);
  transition: 150ms background, 150ms color, 300ms width;
  margin-bottom: 10px;
  &:hover, &:focus {
    background: lighten($accent, 10%);
  }
  &:active {
    background: lighten($accent, 15%);
  }
  flex: 0 0 auto;
  height: 43px;
  min-width: 220px;
`

class NewCharacter extends Component {
  static propTypes = {
    path: arrayOf(string).isRequired, 
    here: arrayOf(string).isRequired,
    playbooks: arrayOf(string).isRequired, 
    playbooksByName: object.isRequired, 
    movesByName: object.isRequired, 
    advancementsById: object.isRequired,
    sizes: arrayOf(string).isRequired,
    myCharacters: arrayOf(number).isRequired,
    createCharacter: func.isRequired,
    goTo: func.isRequired
  }
  
  handleClickCreate = () => {
    const skin = this.skin();
    if (skin !== null) {
      this.props.createCharacter({playbook: skin});
    }
  }

  componentDidUpdate(prevProps) {
    const {path, here, goTo, myCharacters} = this.props;
    console.log(myCharacters, prevProps.myCharacters)
    if (myCharacters.length > prevProps.myCharacters.length) {
      myCharacters.forEach(id => {
        if (!prevProps.myCharacters.includes(id)) {
          goTo([...here.slice(0, -1), id.toString(), "edit"]);
          return;
        }
      })
    }
  }

  skin = () => {
    const { path, playbooks } = this.props;
    if (path.length === 0) return null;
    const slug = path[0];
    return playbooks.find(name => name.toLowerCase() === slug);
  }

  render() {
    const { 
      path, here, playbooks, playbooksByName, 
      movesByName, advancementsById,
      sizes, createCharacter
    } = this.props;
    const skins = playbooks
      .map(name => {
        const playbook = playbooksByName[name];
        return (
          <SkinLink to={[...here, name.toLowerCase()]} key={name} rx={{dull: path.length > 0}}>
            The <BigName>{name}</BigName>
          </SkinLink>
        ) 
      })
      
    let skin = null;
    let createButton = null;
    if (path.length > 0) {
      const [slug, ...newPath] = path;
      const name = this.skin();
      const playbook = playbooksByName[name];
      skin = (
        <Skin {...{name, movesByName, advancementsById, sizes}} {...playbook}/>
      )
      createButton = <Button onClick={this.handleClickCreate}>Create the {name}</Button>
    }
    return (
      <Container>
        <Buffer rx={{collapsed: (path.length > 0)}}/>
        <Content rx={sizes}>
          <Header>Select a Skin</Header>
          <SkinList>{skins}</SkinList>
          {createButton}
          {skin}
        </Content>
        <Buffer rx={{collapsed: (path.length > 0)}}/>
      </Container>
    );
  }
}

export default NewCharacter;