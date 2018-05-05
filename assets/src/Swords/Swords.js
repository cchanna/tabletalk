import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import Spinner from 'common/components/Spinner';  
import Chatbox from './Chatbox';
import SocketManager from 'Socket';
import Sound from './Sound';
import Window from './Window';
import gradient from './gradient';
import SvgGradient from './SvgGradient';
import handleEvent from './handleEvent';


rx`
@import '~Swords/styles';
`

const Container = rx('div')`
  background: $background;
  color: $foreground;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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
    padding-top: 36px;
  }
`

class Swords extends Component {
  static propTypes = {
    loaded: bool.isRequired,
    connected: bool.isRequired,
    sizes: arrayOf(string).isRequired,
    depth: number.isRequired,
    load: func.isRequired,
    glumColor: arrayOf(string),
    jovialColor: arrayOf(string),
    glumText: string,
    tone: bool,
    jovialText: string
  }
  
  componentDidMount() {
    const { loaded, load } = this.props;
    if (!loaded) load();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loaded && !this.props.loaded) {
      this.props.load();
    }
  }
  
  render() {
    const { depth, loaded, connected, sizes, glumColor, glumText, jovialColor, jovialText, tone } = this.props;
    const overlay = sizes.includes("mobile");
    if (!loaded) {
      return (
        <Container><Spinner/></Container>
      );
    }
    const text = tone ? jovialText : glumText;
    const textDark = "rgba(0, 0, 0, .75)";
    const textLight = "white";
    const singleColor = tone => tone ? (jovialColor ? jovialColor[0] : "white") : (glumColor ? glumColor[0] : "black");
    return (
      <Container style={{
        "--text": text,
        "--text-opposite": text === textLight ? textDark : textLight,
        "--text-for-opposite": tone ? glumText : jovialText,
        "--color": tone ? (gradient(jovialColor) || "white") : (gradient(glumColor) || "black"),
        "--color-single": singleColor(tone),
        "--color-single-opposite": singleColor(!tone),
        "--text-dark": textDark,
        "--text-light": textLight,
        "--text-jovial": jovialText,
        "--text-glum": glumText,
        "--color-jovial": (gradient(jovialColor) || "white"),
        "--color-glum": (gradient(glumColor) || "black")
      }}>
        <SocketManager handle={handleEvent}/>
        <Sound/>
        <SvgGradient tone={false} colors={glumColor}/>
        <SvgGradient tone={true} colors={jovialColor}/>
        {connected ? (
          <Content rx={{overlay}}>
            <Window depth={depth}>some text</Window>
            <Chatbox overlay={overlay}/>
          </Content>
        ) : null}
      </Container>
    );
  }
}

export default Swords;