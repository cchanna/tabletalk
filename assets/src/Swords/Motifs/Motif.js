import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import update from 'immutability-helper';
import Spinner from "common/components/Spinner";
  
rx`
@import '~Swords/styles';
`

const Wrapper = rx('div')`
  position: relative;
  height: 0px;
  margin-bottom: 20px;
  transition-property: height, top;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  top: -215px;
  &.show {
    height: 215px;
    top: 0;
  }

`

const Container = rx('div')`
  background: white;
  height: 215px;
  box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, .5);
  color: black;
  position: relative;
`

const ItemInput = rx('input')`
  @include input-style;
  display: block;
  width: 100%;
  margin-bottom: 10px;
`

const Header = rx('h1')`
  padding: 20px 20px 10px 20px;
  margin: 0;
  font-family: $header;
  font-size: 30px;
`

const Body = rx('div')`
  padding: 0 20px;
`

const Reincorporation = rx('button')`
  @include button;
  width: 100%;
  height: 0px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  background: var(--text);
  color: var(--text-opposite);
  transition-property: height, background, color, box-shadow, border;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, .5);
  border-top: 0px solid var(--color-single);
  &.show {
    height: 40px;
    &:not(:disabled), &.active {
      border-top-width: 4px;
    }
  }
  font-family: $interact;
  
  &.reincorporated {
    &:not(:disabled) {
      color: var(--color-single);
      background: var(--text);
      &:hover:not(:active):not(.active) {
        background: var(--text);
        color: var(--text-opposite);
      }
    }
  }
  &:not(.reincorporated):not(:disabled) {
    &:hover:not(:active):not(.active) {
      color: var(--color-single);
      background: var(--text);
    }
  }
  &:active {
    transition-duration: 50ms;
  }
  &:disabled:not(.active) {
    box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, 0);
    color: black;
    background: transparent;
  }
`
const Centered = rx('div')`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const motifTitles = ["First", "Second", "Final"]

class Motif extends Component {
  static propTypes = {
    index: number.isRequired,
    show: bool.isRequired,
    items: arrayOf(string).isRequired,
    reincorporatedBy: string,
    mine: bool.isRequired,
    canReincorporate: bool.isRequired,
    slowActionsById: object.isRequired,
    editMotif: func.isRequired,
    reincorporateMotif: func.isRequired,
    undoReincorporation: func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      actionId: null
    }
  }

  handleChange = e => {
    const index = parseInt(e.target.name, 10);
    const value = e.target.value;
    this.setState(state => update(state, {
      items: {
        [index]: {$set: value}
      }
    }));
  }

  handleBlur = e => {
    
    const item = parseInt(e.target.name, 10);
    const value = this.state.items[item];
    if (value !== this.props.items[item]) {
      const { editMotif, index } = this.props;
      editMotif({index, item, value});
    }
  }

  componentDidUpdate(prevProps) {
    for (let i=0; i < 3; i++) {
      if (this.props.items[i] !== prevProps.items[i]) {
        this.setState(state => update(state, {
          items: {
            [i]: {$set: this.props.items[i]}
          }
        }))
      }
    }
    
    const { actionId } = this.state;
    const { slowActionsById } = this.props;
    const { slowActionsById: prevActions } = prevProps;
    if (actionId && prevActions[actionId] && !slowActionsById[actionId]) {
      this.setState({actionId: null});
    } 
  }

  handleReincorporateClick = () => {
    const { index, reincorporatedBy, reincorporateMotif, undoReincorporation } = this.props;
    if (reincorporatedBy) {
      const actionId = undoReincorporation({});
      console.log(actionId);
      this.setState({actionId});
    }
    else {
      const actionId = reincorporateMotif({index});
      this.setState({actionId});
    }
  }
  
  render() {
    const { index, mine, canReincorporate, reincorporatedBy, show } = this.props;
    const { items, actionId } = this.state;
    return (
      <Wrapper style={{zIndex: 3 - index}} rx={{show}}>
        <Container >
          <Header>
            {motifTitles[index]} Motif
          </Header>
          <Body>
            <ItemInput disabled={!show} name="0" value={items[0]} onChange={this.handleChange} onBlur={this.handleBlur} placeholder="record something someone else said that gives you pause"/>
            {this.props.items[0] ? (
              <ItemInput disabled={!show} name="1" value={items[1]} onChange={this.handleChange} onBlur={this.handleBlur} placeholder="record something someone else said that gives you pause"/>
            ) : null}
            {this.props.items[0] && items[1] ? (
              <ItemInput disabled={!show} name="2" value={items[2]} onChange={this.handleChange} onBlur={this.handleBlur} placeholder="record something someone else said that gives you pause"/>
            ) : null}
          </Body>
          <Reincorporation 
            onClick={this.handleReincorporateClick}
            disabled={!(canReincorporate || mine) || (reincorporatedBy && !mine) || actionId}
            rx={{
              show: show && (canReincorporate || reincorporatedBy), 
              reincorporated: !!reincorporatedBy,
              active: !!actionId
            }}
          >
            <Centered>
              {actionId ? (
                <Spinner/>
              ) : (
                reincorporatedBy ? (
                  mine ? (
                    "Reincorporated"
                  ) : (
                    `Reincorporated by ${reincorporatedBy}`
                  )
                ) : "Reincorporate"
              )}
            </Centered>
          </Reincorporation>
        </Container>
      </Wrapper>
    );
  }
}

export default Motif;