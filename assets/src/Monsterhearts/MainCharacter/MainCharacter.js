import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import Edit from './Edit';
import CharacterSheet from './CharacterSheet';
import Link from 'Routing/Link';
import NewString from 'Monsterhearts/common/NewString';

import route from 'Routing/route';
import { exactMatch } from 'utils/pathTools';
import { characterShape } from './propTypes';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  color: $foreground;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  font-size: 20px;
  font-family: $body;
  padding: 30px;
  box-sizing: border-box;
`

const Name = rx('h1')`
  margin: 0;
  font-family: $header;
  font-size: 40px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding: 0 80px;
  &.under-tablet {
    font-size: 20px;
    padding: 0 50px;
  }
`
const Playbook = rx(`span`)`
  color: $accent;
`
const Content = rx('div')`
  width: 100%;
  flex: 1 1 0;
  height: 0px;
`
const EditLink = rx(Link)`
  @include link;
  @include button-style;
  position: absolute;
  right: 30px;
  top: 25px;
  &.under-tablet {
    font-size: 14px;
    top: 10px;
    right: 15px;
  }
`
const BackButton = rx('button')`
  @include button-style;
  position: absolute;
  left: 30px;
  top: 25px;
  &.under-tablet {
    font-size: 14px;
    top: 10px;
    left: 15px;
  }
`

class MainCharacter extends Component {
  static propTypes = {
    path: arrayOf(string).isRequired,
    here: arrayOf(string).isRequired,
    id: number.isRequired, 
    name: string,
    playbook: string,
    sizes: arrayOf(string).isRequired,
    readOnly: bool.isRequired
  }
  
  static pages = [
    {
      path: "edit",
      component: Edit
    },
    {
      path: 'newstring',
      component: NewString
    },
    {
      component: CharacterSheet
    }
  ]

  route = () => {
    const { path, here, editDone, replace, readOnly } = this.props;
    if (path.length === 0 && !editDone && !readOnly) {
      replace([...here, "edit"]);
    }
  }

  componentDidMount = this.route;
  componentDidUpdate(prevProps) {
    if (!exactMatch(this.props.path, prevProps.path) || !exactMatch(this.props.here, prevProps.here)) {
      this.route();
    }
  }

  render() {
    const { id, path, here, name, playbook, sizes, editDone, readOnly, goBack } = this.props;
    let content;
    let editLink;
    if (playbook === null) return null;
    if (editDone && !readOnly) {
      if (path.length === 0) {
        editLink = (
          <EditLink to={[...here, 'edit']} rx={sizes}>Edit</EditLink>
        )
      }
      else if (path[0] === "edit") {
        editLink = <EditLink to={here} rx={sizes}>Done</EditLink>
      }
    }
    content = route(path, here, MainCharacter.pages);
    let backButton = null;
    if (path.length && path[0] !== 'edit') {
      backButton = <BackButton onClick={goBack}>Back</BackButton>
    }
    let header;
    if (playbook) {
      if (name) {
        header = <Name rx={sizes}>{name} <Playbook>the&nbsp;{playbook}</Playbook></Name>
      }
      else {
        header = <Name rx={sizes}>The {playbook}</Name>
      }
    }
    else {
      header = <Name rx={sizes}>{name}</Name>
    }
    
    
    return (
      <Container>
        {header}
        {backButton}
        {editLink}
        <Content>
          {content}
        </Content>
      </Container>
    );
  }
}

/*
*/

export default MainCharacter;