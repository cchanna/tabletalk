import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import Sidebar from "../Sidebar";
import Character from "../Character";
import Setting from "../Setting";
import Role from '../Role';
import Enclave from '../Enclave';
import TabSwitcher from 'common/components/TabSwitcher'

rx`
@import '~DreamAskew/styles';
`

const Container = rx('div')`
  flex: 1 0 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
`
const Switcher = rx(TabSwitcher)`
  flex: 1 0 0;
  overflow: hidden;
`
const Divider = rx('div')`
  height: calc(100% - 50px);
  width: 0px;
  align-self: center;
  border-right: 2px solid fade-out($foreground, .4);
`
const MainWindow = rx('div')`
  width: calc(100% - 10px);
  height: 100%;
  margin-right: 10px;
  overflow: auto;
  overflow-y: auto;
`
const Message = rx('div')`
  flex: 1 0 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $header;
  font-size: 30px;
  text-align: center;
  padding: 20px;
`
const LeftHalf = rx('div')`
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
`
const Tab = rx('div')`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`
const HomeButton = rx('button')`
  @include button-style;
  flex: 0 0 30px;
  color: $foreground;
  font-family: $header;
  font-size: 50px;
  transition-property: color, background;
  transition-duration: 150ms;
  background: transparent;
  &:hover, &:focus {
    background: fade-out($accent1, .5);
  }
  &:hover, &:focus, &:active {
    color: $background;
  }
  &:active {
    background: fade-out($accent1_light, .5);
  }
`

class Window extends Component {
  static propTypes = {
    myCharacterId: number,
    mySettings: arrayOf(string).isRequired,
    otherCharacterIds: arrayOf(number).isRequired,
    roleNames: arrayOf(string).isRequired,
    settingNames: arrayOf(string).isRequired,
    depth: number.isRequired,
    here: arrayOf(string).isRequired,
    goTo: func.isRequired
  }

  onClickBack = () => this.props.goTo([], this.props.depth);
  
  render() {
    const { myCharacterId, otherCharacterIds, mySettings, roleNames, settingNames, depth, here } = this.props;
    const tabs = [
      <Tab key="enclave">
        <Enclave />
      </Tab>,
      ...otherCharacterIds
        .map(id => (
          <Tab key={`character/${id}`}>
            <Character id={id} />
          </Tab>
        )),
      ...roleNames.map(name => (
        <Tab key={`role/${name.toLowerCase()}`}>
          <Role name={name} depth={depth + 2}/>
        </Tab>
      )),
      ...settingNames.map(name => (
          <Tab key={`setting/${name.toLowerCase().replace(" ", "_")}`}>
            <Setting name={name} depth={depth + 2} />
          </Tab>
        ))
    ]

    return (
      <Container >
        <Sidebar depth={depth} />
        <Divider />
        <Switcher index={here.length > 0 ? 0 : 1}>
          <LeftHalf>
            <Switcher vertical index={here.length === 1 ? here[0] : `${here[0]}/${here[1]}`}>
              {tabs}
            </Switcher>
            <Divider />
            <HomeButton onClick={this.onClickBack} disabled={here.length === 0}>></HomeButton>
          </LeftHalf>
          {myCharacterId ? (
            <MainWindow>
              <Character id={myCharacterId} mine />
              {mySettings.map(name => (
                <Setting key={name} name={name} depth={depth} divider />
              ))}
            </MainWindow>
          ) : (
            <Message>
              Choose a role from the left sidebar to make your character!
            </Message>                
          )}
        </Switcher>
      </Container>
    );
  }
}

export default Window;