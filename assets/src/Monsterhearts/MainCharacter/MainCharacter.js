import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import Edit from './Edit';
import CharacterSheet from './CharacterSheet';
import { Link } from 'Routing';
import NewString from 'Monsterhearts/common/NewString';
import AnyMove from './AnyMove';
import SelfMove from './SelfMove';

import { Route } from 'Routing';
import { exactMatch } from 'utils/pathTools';

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
  overflow: hidden;
  box-sizing: border-box;
  align-items: center;
  &.under-tablet {
    padding-top: 0px;
  }
`

const Name = rx('h1')`
  margin: 0;
  font-family: $header;
  font-size: 40px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding: 0 80px 10px 80px;
  &.under-tablet {
    font-size: 20px;
    padding: 0 50px 5px 50px;
  }
  box-shadow: 0 1px 2px 1px $background;
  position: relative;
  z-index: 1;
`
const Playbook = rx(`span`)`
  color: $accent;
`
const Content = rx('div')`
  width: 100%;
  flex: 1 1 0;
  padding: 0 30px 30px 30px;
  box-sizing: border-box;
  overflow-y: scroll;
`
const EditLink = rx(Link)`
  @include link;
  @include button-style;
  position: absolute;
  right: 30px;
  top: 25px;
  z-index: 2;
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
  z-index: 2;
  &.under-tablet {
    font-size: 14px;
    top: 10px;
    left: 15px;
  }
`

class MainCharacter extends Component {
  static propTypes = {
    depth: number.isRequired,
    path: arrayOf(string).isRequired,
    id: number.isRequired, 
    name: string,
    playbook: string,
    sizes: arrayOf(string).isRequired,
    readOnly: bool.isRequired,
    editDone: bool.isRequired,
    replace: func.isRequired,
    goBack: func.isRequired
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
      path: "anymove",
      component: AnyMove
    },
    {
      path: "selfmove",
      component: SelfMove
    },
    {
      component: CharacterSheet
    }
  ]

  route = () => {
    const { path, depth, editDone, replace, readOnly } = this.props;
    if (path.length === 0 && !editDone && !readOnly) {
      replace(["edit"], depth);
    }
    else if (path.length > 0 && readOnly) {
      replace([], depth);
    }
  }

  componentDidMount = this.route;
  componentDidUpdate(prevProps) {
    if (!exactMatch(this.props.path, prevProps.path) || this.props.id !== prevProps.id) {
      this.route();
    }
  }

  render() {
    const { id, path, depth, name, playbook, sizes, editDone, readOnly, goBack } = this.props;
    let editLink;
    if (playbook === null) return null;
    if (editDone && !readOnly) {
      if (path.length === 0) {
        editLink = (
          <EditLink to='edit' depth={depth} rx={sizes}>Edit</EditLink>
        )
      }
      else if (path[0] === "edit") {
        editLink = <EditLink depth={depth} rx={sizes}>Done</EditLink>
      }
    }
    let backButton = null;
    if (path.length && (path[0] !== 'edit' || (path.length > 1 && sizes.includes('under-max')) || path.length > 2)) {
      backButton = <BackButton rx={sizes} onClick={goBack}>Back</BackButton>
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
      <Container rx={sizes}>
        {header}
        {backButton}
        {editLink}
        <Content>
          <Route 
            depth={depth} 
            pages={MainCharacter.pages} 
            extraProperties={{sizes, id}}/>
        </Content>
      </Container>
    );
  }
}

/*
*/

export default MainCharacter;