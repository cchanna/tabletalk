import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import { Questions, Question, List, Item } from "./Layout";
  
rx`
@import '~DreamAskew/styles';
`
const Header = rx('h1')`
  margin-top: 15px;
  margin-bottom: 0;
  font-family: $header;
  font-size: 20px;
`
const Action = rx('span')`
  font-family: $header;
  font-style: italic;
  padding: 0 0 0 30px;
  position: relative;
  top: -2px;
  opacity: .5;
  font-size: 14px;
`
const Container = rx('div')`
  margin-bottom: 10px;
`

class MoveSet extends Component {
  static propTypes = {
    name: string.isRequired,
    action: string,
    moves: arrayOf(string).isRequired,
    questions: arrayOf(string).isRequired
  }
  
  render() {
    const { name, action, moves, questions } = this.props;
    return (
      <Container>
        <Header>
          <span>{name}</span>
          {action ? <Action>{action}</Action> : null}
        </Header>
        <List>
          {moves.map((move, i) => (
            <Item key={i}>{move}</Item>
          ))}
        </List>
        <Questions>
          {questions.map((question, i) => (
            <Question key={i}>{question}</Question>
          ))}
        </Questions>
      </Container>
    );
  }
}

class Moves extends Component {
  static propTypes = {
    strongMoves: arrayOf(string).isRequired,
    strongQuestions: arrayOf(string).isRequired,
    regularMoves: arrayOf(string).isRequired,
    regularQuestions: arrayOf(string).isRequired,
    weakMoves: arrayOf(string).isRequired,
    weakQuestions: arrayOf(string).isRequired,
  }

  render() {
    const { strongMoves, strongQuestions, regularMoves, regularQuestions, weakMoves, weakQuestions } = this.props;
    return (
      <div>
        <MoveSet name="Strong Moves" action="Spend a Token" moves={strongMoves} questions={strongQuestions} />
        <MoveSet name="Regular Moves" moves={regularMoves} questions={regularQuestions} />
        <MoveSet name="Weak Moves" action="Gain a Token" moves={weakMoves} questions={weakQuestions} />
      </div>
    );
  }
}

export default Moves;