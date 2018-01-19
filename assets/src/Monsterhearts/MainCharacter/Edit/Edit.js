import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import { characterProperties, mainCharacterProperties } from '../propTypes';
import { playbookShape } from '../../propTypes';
import Link from 'Routing/Link';
import route from 'Routing/route';
import Identity from './Identity';
import Stats from './Stats';
import Moves from './Moves';
import Backstory from './Backstory';

import { exactMatch } from 'utils/pathTools';

rx`
@import '~common/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  display: flex;
  flex-flow: row nowrap;
  color: $foreground;
  align-items: center;
  flex: 1 0 0;
  height: 100%;
  position: relative;
`

const Root = rx('div')`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  box-sizing: border-box;
  width: 300px;
  flex: 0 0 auto;
  padding: 30px;
` 
const Divider = rx('div')`
  flex: 0 0 auto;
  height: 80%;
  width: 1px;
  background: $foreground;
`
const Tab = rx(Link)`
  @include link;
  position: relative;
  font-family: $interact;
  color: darken($foreground, 20%);
  &:before {
    color: darken($foreground, 20%);
  }
  font-size: 24px;
  height: 30px;
  display: flex;
  flex-flow: row;
  align-items: center;
  transition-property: height, color;
  transition-duration: 150ms;
  padding-left: 20px;
  &:hover, &:focus, &.active {
    height: 40px;
  } 
  &.active {
    color: $accent;
    &:before {
      color: $accent;
    }
  }
  &:not(.active) {
    &:hover, &:focus {
      color: $foreground;
      cursor: pointer;
    }
    &:active {
      color: lighten($foreground, 15%);
      height: 45px;
    }
  }
  &.done {
    &:before {
      transition: 150ms top;
      content: "c";
      position: absolute;
      top: 0px;
      left: -10px;
      font-family: "icomoon";
    }
    &:hover, &:focus, &.active {
      &:before {
        top: 5px;
      }
    }
  }

`
const RootHeader = rx('h2')`
  font-size: 16px;
  font-family: $body;
  margin: 0 0 10px 0;
  font-style: italic;
`
const Details = rx('div')`
  flex: 1 0 0;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  overflow-y: scroll;
`
const BackButton = rx('button')`
  @include button;
  position: absolute;
  top: -40px;
  left: 30px;
  font-family: $interact;
  color: $foreground;
  transition: 150ms color;
  z-index: 100;
  &:hover, &:focus {
    color: $accent;
  }
  &.under-tablet {
    font-size: 14px;
    top: -25px;
    left: 15px;
  }
  font-size: 20px;
  &:not(.under-tablet).nested {
    // left: 330px;
    // top: 30px;
  }
`

class Edit extends Component {
  static propTypes = {
    identityDone: bool.isRequired,
    statsDone: bool.isRequired,
    movesDone: bool.isRequired,
    sizes: arrayOf(string).isRequired,
    goBack: func.isRequired,
    replace: func.isRequired
  }

  handleClickBack = () => {
    this.props.goBack();
  }

  route = () => {
    const { path, here, readOnly, replace } = this.props;
    if (readOnly) {
      replace(here.slice(0, -1));
    }
  }

  componentDidMount = this.route;
  componentDidUpdate(prevProps) {
    if (!exactMatch(this.props.path, prevProps.path)) {
      this.route();
    }
  }
  
  render() {
    const { identityDone, statsDone, movesDone, backstoryDone, sizes } = this.props;

    const pages = [
      {
        path: "identity",
        name: "Identity",
        done: !!identityDone,
        component: Identity
      },
      {
        path: "stats",
        name: "Stats",
        done: !!statsDone,
        component: Stats
      },
      {
        path: "moves",
        name: "Moves",
        done: !!movesDone,
        component: Moves
      },
      {
        path: "backstory",
        name: "Backstory",
        done: !!backstoryDone,
        component: Backstory
      }
    ]

    const { path, here } = this.props;
    let root = null;
    const showBoth = !sizes.includes("under-laptop");
    if (showBoth || path.length === 0) {
      const tabs = pages.map(({path, name, done}) => (
        <Tab to={[...here, path]} key={path} rx={{done}}>
          {name}
        </Tab>
      ))
      root = (
        <Root>
          <RootHeader>Choose a category</RootHeader>
          {tabs}
        </Root>
      )
    }
    let divider = null;
    if (showBoth) divider = <Divider/>
    let details = null;
    let backButton = null;
    if (showBoth || path.length > 0) {
      details = (
        <Details>
          {route(path, here, pages, {showBackButton: showBoth})}
        </Details>
      )
      const nested = (path.length >= 2);
      if (!showBoth || nested) {
        backButton = (
          <BackButton rx={[...sizes, {nested}]} onClick={this.handleClickBack}>
            Back
          </BackButton>
        )
      }
    }
    return (
      <Container>
        {backButton}
        {root}
        {divider}
        {details}
      </Container>
    );
  }
}

export default Edit;