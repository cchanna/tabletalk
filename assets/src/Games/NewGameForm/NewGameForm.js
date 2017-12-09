import React from 'react';
import rx from 'resplendence';

import { string, number, func, bool } from 'prop-types';

import { kindsById, toClassName } from 'common/gameKinds';

import Spinner from 'common/components/Spinner';

rx`
@import "~common/styles";
@import "~common/colors";
`


const Container = rx('div')`
  @include card;
  padding: 20px;
`

const Label = rx('div')`
  color: $background-1;
  font-family: "Junction";
  font-size: 20px;
  text-align: center;
  padding: 10px;
`


let Input = props => <input type="text" {...props}/>
Input = rx(Input)`
  border: none;
  display: block;
  background: none;
  font-family: "Junction";
  color: $background-1;
  font-size: 20px;
  padding: 5px;
  text-align: center;
  &:focus {
    outline: none;
  }
  border-bottom: 2px solid $background-1;
`

const TextBox = ({value, onChange, onSubmit}) => <form onSubmit={onSubmit}><Input value={value} onChange={onChange}/></form>

const Kind = rx('button')`
  @include game-kind-background;
  @include button;
  height: 70px;
  width: 100%;
  max-width: 500px;
  margin: 20px;
  font: "League Spartan";
  font-size: 40px;
  padding-top: 14px;
  box-sizing: border-box;
  color: white;
  opacity: 0.7;
  box-shadow: -1px 1px 1px 1px hsla(0, 0%, 0%, .3);
  transition: opacity .15s;
  &:focus, &:hover {
    opacity: 1;
  }
`

const Content = rx('div')`
  display: flex;
  flex-flow: column;
  align-items: center;
  position: relative;
`

const Back = rx('button')`
  @include button;
  font-family: "League Spartan";
  color: $background-1;
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 18px;
  &:hover, &:focus {
    color: $background-2;
  }
`



class NewGameForm extends React.Component {
  static propTypes = {
    name: string,
    kind: number,
    player: string,
    input: string,
    loading: bool.isRequired,
    failed: bool.isRequired,
    setInput: func.isRequired,
    create: func.isRequired,
    setName: func.isRequired,
    setKind: func.isRequired,
    stepBack: func.isRequired
  }

  setKind = kindsById.map((k, i) => () => {
    this.props.setKind({kind: i});
  })

  handleChange = ({target}) => {
    this.props.setInput({input: target.value});
  }
  handleSubmit = e => {
    e.preventDefault();
    const { kind, name, input, setName, create } = this.props;
    if (kind !== null && input.trim() !== "") {
      if (name === null) {
        setName();
      }
      else {
        create();
      }
    }
  }
  render() {
    const { kind, name, loading, failed, input, stepBack } = this.props;

    let result;
    if (failed) {
      result = "Failed!";
    }
    else if (loading) {
      result = <Spinner/>;
    }
    else {
      let content;
      if (kind === null) {
        const kinds = kindsById.map((k, i) => (
          <Kind key={k} rx={toClassName(k)} onClick={this.setKind[i]}>{k}</Kind> 
        ))
        content = (
          <Content>
            <Label>What kind of game?</Label>
            {kinds}
          </Content>
        )
      }
      else {
        let label;
        if (name === null) label = "What should it be named?";
        else label = "What's your name? (Not your character's)";
        content = (
          <Content>
            <Back onClick={stepBack}>Go Back</Back>
            <Label>{label}</Label>
            <TextBox value={input} onChange={this.handleChange} onSubmit={this.handleSubmit}/>
          </Content>
        )
      }
  
      result = (
        <Container>
          {content}
        </Container>
      )
    }
    return result;
  }
}

export default NewGameForm;