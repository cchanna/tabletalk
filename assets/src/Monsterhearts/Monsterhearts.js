import React, { Component } from 'react'
import { string, number, func, bool, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import TabPicker from './TabPicker';
import Chatbox from './Chatbox';
import Spinner from 'common/components/Spinner';

rx`
@import '~Monsterhearts/colors';
`

const Container = rx('div')`
  background: $background;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  display: flex;
  flex-flow: row nowrap;
  box-sizing: border-box;
  &.overlay {
    padding-top: 32px;
  }
  ::-webkit-scrollbar-thumb {
    background: darken($foreground, 50%);
    &:hover {
      background: darken($foreground, 40%);
    }
  }
`

class Monsterhearts extends Component {
  static propTypes = {
    sizes: arrayOf(string).isRequired,
    loaded: bool.isRequired,
    load: func.isRequired
  }

  componentDidMount() {
    const { loaded, load } = this.props;
    if (!loaded) load();
  }
  
  render() {
    const { sizes, loaded, path, here } = this.props;
    let content = null;
    const overlay = sizes.includes("mobile");
    // const overlay = true;
    if (loaded) {
      return (
        <Container rx={{overlay}}>
          <TabPicker path={path} here={here}/>
          <Chatbox overlay={overlay}/>
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