import React from 'react';
import rx from 'resplendence';

import { string, number, func, bool } from 'prop-types';

import { kindsById, toClassName } from 'common/gameKinds';

import Spinner from 'common/components/Spinner';
import Form from 'Games/Form';
import TextForm from 'Games/TextForm';

rx`
@import "~common/styles";
@import "~common/colors";
`

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
  handleSubmit = () => {
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
    const { kind, name, loading, failed, input, stepBack, setInput } = this.props;

    let result;
    if (failed) {
      result = "Failed!";
    }
    else if (loading) {
      result = <Spinner/>;
    }
    else {
      if (kind === null) {
        const kinds = kindsById.map((k, i) => (
          <Kind key={k} rx={toClassName(k)} onClick={this.setKind[i]}>{k}</Kind> 
        ))
        result = (
          <Form label="What kind of game?">
            {kinds}
          </Form>
        )
      }
      else {
        let label;
        if (name === null) label = "What should it be named?";
        else label = "What's your name? (Not your character's)";
        result = (
          <TextForm label={label} goBack={stepBack} input={input} setInput={setInput} submit={this.handleSubmit}/>
        )
      }
    }
    return result;
  }
}

export default NewGameForm;