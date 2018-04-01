import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import gradients from './gradients.json';
import gradient from '../gradient';
  
rx`
@import '~Swords/styles';
`

const Container = rx('div')`
  flex: 1 0 0;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, .5) inset;
`

const Current = rx('div')`
  flex: 0 0 auto;
  z-index: 1;
  margin: 10px;
  box-shadow: -1px 1px 1px 1px transparent;
  transition-properties: color, background, box-shadow;
  transition-duration: 300ms;
  background: transparent;
  &.glum {
    color: var(--text-glum);
  }
  &:not(.glum) {
    color: var(--text-jovial);
  }
  &.raised {
    box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, .25);
    &.glum {
      background: var(--color-glum);
    }
    &:not(.glum) {
      background: var(--color-jovial);
    }
  }
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  font-family: $header;
  font-weight: bold;
`

const Selector = rx('div')`
  flex: 1 0 0;
  margin: 10px;
  padding: 10px;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
` 
const TextButtons = rx('div')`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  padding: 20px 0;
  flex: 0 0 auto;
  position: relative;
  z-index: 1;
  width: 100%;
`
const TextButton = rx('button')`
  @include button;
  display: block;
  flex: 0 0 auto;
  color: var(--text-light);
  position: relative;
  font-family: $interact;
  font-size: 20px;
  &.black {
    color: var(--text-dark);
  }
  &:after {
    content: "";
    background: white;
    height: 4px;
    width: 0;
    transition-properties: left, width;
    transition-duration: 300ms;
    transition-timing-function: ease-in-out;
    position: absolute;
    left: 50%;
    bottom: 0px;
  }
  &.black:after {
    background: rgba(0, 0, 0, .75);
  }
  &:hover:after, &:disabled:after {
    width: 100%;
    left: 0%;
  }
  &:focus:after {
    width: 50%;
    left: 25%;
  }
  &:active:after {
    width: 120%;
    left: -10%;
  }
`
const ColorButtonContainer = rx('div')`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ColorButton = rx('button')`
  @include button;
  display: block;
  width: 100%;
  width: 60px;
  height: 60px;
  box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, .5);
  box-sizing: border-box;
  transition-properties: opacity, height, width;
  transition-duration: 300ms;
  &:hover, &:focus {
    width: 80px;
    height: 80px;
  }
  &:active {
    width: 100px;
    height: 100px;
  }
  &:disabled {
    opacity: 0;
  }
`

const List = rx('div')`
  overflow: scroll;
  flex: 1 0 0;
  position: relative;
  z-index: 1;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly; 
  margin: 0 40px;
  button:not(:disabled) {
    opacity: .5;
  }
  &:hover button:not(:disabled) {
    opacity: 1;
  }
`

const Background = rx('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 0;
  pointer-events: none;
  transition-properties: opacity;
  transition-duration: 0;
  &.show {
    opacity: 1;
    transition-duration: 300ms;
  }
`

const SubmitButton = rx('button')`
  @include button-style;
  color: var(--text-light);
  &:after {
    background: var(--text-light);
  }
  &.textIsDark {
    color: var(--text-dark);
    &:after {
      background: bar(--text-dark);
    }
  }
`

class ColorPicker extends Component {
  static propTypes = {
    glum: bool.isRequired,
    onSuggest: func.isRequired,
    color: string,
    textIsDark: bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      color: props.color,
      previousColor: null,
      textIsDark: props.textIsDark
    }
  }

  timeout = null;

  clearPreviousColor = () => this.setState({previousColor: null});

  handleBlackClick = () => {
    this.setState({textIsDark: true});
  }
  handleWhiteClick = () => {
    this.setState({textIsDark: false});
  }
  handleColorClick = e => {
    const newColor = gradients[e.target.name].colors;
    this.setState(({color}) => ({
      color: newColor,
      previousColor: color || (this.props.glum ? ["black"] : ["white"])
    }));
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.timeout = setTimeout(this.clearPreviousColor, 300);
  }
  handleSuggest = () => {
    const { color, textIsDark } = this.state;
    this.props.onSuggest({color, textIsDark});
  }

  render() {
    const { glum } = this.props;
    const { color, previousColor, textIsDark } = this.state;
    return (
      <Container 
        style={{
          background: gradient(previousColor) || gradient(color) || (glum ? "black" : "white")}} 
      >
        <Background rx={{show: !!previousColor}} style={{background: gradient(color)}}/>
        <Current rx={{glum, raised: color !== this.props.color}}>{glum ? "Glum" : "Jovial"}</Current> 
        <Selector >
          <TextButtons>
            <TextButton 
              rx={{black: true}} 
              disabled={textIsDark} 
              onClick={this.handleBlackClick}
            >
              Black Text
            </TextButton>
            <TextButton 
              rx={{black: false}} 
              disabled={!textIsDark} 
              onClick={this.handleWhiteClick}
            >
              White Text
            </TextButton>
          </TextButtons>
          <List>
            {gradients.map(({colors}, i) => {
              return (
                <ColorButtonContainer key={i} >
                  <ColorButton 
                    name={i} 
                    onClick={this.handleColorClick} 
                    style={{background: gradient(colors)}}
                    disabled={colors === color}/>
                </ColorButtonContainer>
              )
            })}
          </List>
          <SubmitButton 
            rx={{textIsDark}} 
            disabled={!color || (this.props.color === color && this.props.textIsDark === textIsDark)}
            onClick={this.handleSuggest}
          >
            Suggest this color
          </SubmitButton>
        </Selector>
      </Container>
    );
  }
}

export default ColorPicker;