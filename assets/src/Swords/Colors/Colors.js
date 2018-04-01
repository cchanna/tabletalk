import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import ColorPicker from './ColorPicker';

rx`
@import '~Swords/styles';
`

const Container = rx('div')`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  box-sizing: border-box;
  background: white;
`

const Header = rx('div')`
  flex: 0 0 auto;
`

const Body = rx('div')`
  display: flex;
  flex: 1 0 0;
  flex-flow: row nowrap;
`

const Divider = rx('div')`
  height: 100%;
  width: 20px;
  background: white;
`

const BackButton = rx('button')`
  display: block;
  margin: 10px 10px 5px 10px;
  --text: black;
  @include button-style;
`

class Colors extends Component {
  static propTypes = {
    glumColor: string,
    jovialColor: string,
    glumText: string.isRequired,
    jovialText: string.isRequired,
    depth: number.isRequired,
    goTo: func.isRequired,
    suggestGlum: func.isRequired,
    suggestJovial: func.isRequired
  }

  onBack = () => {
    const { depth, goTo } = this.props;
    goTo([], depth - 1);
  }
  
  render() {
    const { glumColor, glumText, jovialColor, jovialText, suggestJovial, suggestGlum } = this.props;
    return (
      <Container>
        <Header>
          <BackButton disabled={!glumColor || !jovialColor} onClick={this.onBack} >Back</BackButton>
        </Header>
        <Body>
          <ColorPicker glum={true} onSuggest={suggestGlum} color={glumColor} textIsDark={glumText !== "white"}/>
          <Divider/>
          <ColorPicker glum={false} onSuggest={suggestJovial} color={jovialColor} textIsDark={jovialText !== "white"}/>
        </Body>
      </Container>
    );
  }
}

export default Colors;