import React, { Component } from 'react'
import { string, number, func, bool, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import TabPicker from './TabPicker';
import Chatbox from './Chatbox';
import Spinner from 'common/components/Spinner';
import SocketManager from './SocketManager';

rx`
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  background: $background;
  width: 100%;
  height: 100%;
  position: relative;
  ::-webkit-scrollbar-thumb {
    background: darken($foreground, 50%);
    &:hover {
      background: darken($foreground, 40%);
    }
  }
`
const Content = rx('div')`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  box-sizing: border-box;
  z-index: 1;
  &.overlay {
    padding-top: 32px;
  }
`

class Monsterhearts extends Component {
  static propTypes = {
    sizes: arrayOf(string).isRequired,
    loaded: bool.isRequired,
    connected: bool.isRequired,
    load: func.isRequired
  }

  componentDidMount() {
    const { loaded, load } = this.props;
    if (!loaded) load();
  }
  
  render() {
    const { sizes, loaded, connected, path, here } = this.props;
    let content = null;
    const overlay = sizes.includes("mobile");
    // const overlay = true;
    if (loaded) {
      let content;
      if (connected) {
        content = (
          <Content rx={{overlay}}>
            <TabPicker path={path} here={here}/>
            <Chatbox overlay={overlay}/>
          </Content>
        )
      }
      else {
        content = (
          <Spinner/>
        )
      } 
      return (
        <Container>
          <SocketManager/>
          {content}
        </Container>
      )
    }
    else {
      return (
      <Container>
        <Spinner/>
      </Container>
      )
    }
  }
}

export default Monsterhearts;