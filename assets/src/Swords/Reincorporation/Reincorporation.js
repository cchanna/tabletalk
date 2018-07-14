import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import Spinner from "common/components/Spinner";

rx`
@import '~Swords/styles';
`

const Container = rx('button')`
  @include button;
  display: block;
  width: 100%;
  height: 0px;
  overflow: hidden;
  background: var(--text);
  color: var(--text-opposite);
  transition-property: height, background, color, box-shadow, border;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  border-top: 0px solid var(--color-single);
  &.show {
    box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, .5);
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

class Reincorporation extends Component {
  static propTypes = {
    canReincorporate: bool.isRequired,
    mine: bool.isRequired,
    hide: bool.isRequired,
    reincorporatedBy: string,
    slowActionsById: object.isRequired,
    onReincorporate: func.isRequired,
    onUnincorporate: func.isRequired
  }

  static defaultProps = {
    hide: false
  }

  state = {
    actionId: null
  }

  handleClick = () => {
    const { reincorporatedBy, onReincorporate, onUnincorporate } = this.props;
    const actionId = reincorporatedBy ? onUnincorporate() : onReincorporate();
    this.setState({actionId});
  }

  componentDidUpdate(prevProps) {
    const { actionId } = this.state;
    const { slowActionsById } = this.props;
    const { slowActionsById: prevActions } = prevProps;
    if (actionId && prevActions[actionId] && !slowActionsById[actionId]) {
      this.setState({actionId: null});
    } 
  }
  
  render() {
    const { canReincorporate, mine, hide, reincorporatedBy } = this.props;
    const { actionId } = this.state;
    return (
      <Container
        onClick={this.handleClick}
        disabled={!(canReincorporate || mine) || (reincorporatedBy && !mine) || actionId}
        rx={{
          show: !hide && (canReincorporate || reincorporatedBy), 
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
      </Container>
    );
  }
}

export default Reincorporation;