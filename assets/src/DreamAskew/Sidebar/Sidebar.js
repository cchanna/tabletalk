import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import { Link } from "Routing";
import { listWithAnd } from "../Layout";  

rx`
@import '~DreamAskew/styles';
`

const Container = rx('div')`
  height: 100%;
  flex: 0 0 300px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`
const Body = rx('div')`
  align-self: stretch;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  padding: 10px;
`
const Scrolling = rx('div')`
  flex: 1 0 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  overflow-y: auto;
  justify-content: flex-start;
`
const Divider = rx('div')`
  align-self: center;
  width: calc(100% - 20px);
  height: 0px;
  margin: 10px 0;
  border-bottom: 1px solid fade-out($foreground, .7);
`
const Character = rx(Link)`
  @include link;
  text-align: left;
  padding: 10px;
  flex: 0 0 auto;
  border-radius: 10px;
  transition-property: background, color, opacity;
  transition-duration: 150ms;
  user-select: none;
  &:not(.active) {
    &:hover, &:focus {
      background: $accent1;
      color: $background;
    }
    &:active {
      background: $accent1_light;
    }
  }
  &.active {
    opacity: .1;
  }
`
const Name = rx('div')`
  font-family: $header;
  font-size: 17px;
  line-height: 1.1;
`
const Lure = 'div';
const Tokens = rx('div')`
  padding: 10px;
  position: relative;
  height: 100px;
`
const Token = rx('div')`
  width: 20px;
  height: 20px;
  background: $accent1;
  border-radius: 20px;
  position: absolute;
  transition-property: left, top, background;
  transition-duration: 150ms;
  box-shadow: -1px 1px 0px 1px rgba(0, 0, 0, .5);
  &.hovering {
    background: $accent2;
  }
`
const Pool = rx('button')`
  cursor: pointer;
  opacity: 0;
  position: absolute;
  width: 60px;
  height: 60px;
  top: 40px;
  left: 0px;
`
const Mine = rx('button')`
  cursor: pointer;
  opacity: 0;
  position: absolute;
  width: 190px;
  height: 20px;
  top: 60px;
  left: 80px;
`
const TokenDivider = rx('div')`
  position: absolute;
  left: 65px;
  top: 40px;
  height: 60px;
  width: 0px;
  border-right: 2px solid fade-out($foreground, .7);
`

class Sidebar extends Component {
  static propTypes = {
    characterSummaries: arrayOf(shape({
      id: number.isRequired,
      name: string.isRequired,
      lure: string.isRequired 
    })),
    unpickedRoles: arrayOf(shape({
      name: string.isRequired,
      description: string.isRequired
    })),
    settingSummaries: arrayOf(shape({
      name: string.isRequired,
      pickUpWhen: string.isRequired
    })),
    tokens: number.isRequired,
    visuals: arrayOf(string).isRequired,
    depth: number.isRequired,
    here: arrayOf(string).isRequired,
    goTo: func.isRequired,
    replace: func.isRequired,
    gainToken: func.isRequired,
    spendToken: func.isRequired
  }

  state = {
    pool: Array.from(Array(100)).map(() => {
      const tau = Math.PI * 2;
      const t = tau * Math.random();
      const u = Math.random() + Math.random();
      const r = u > 1 ? 2 - u : u;

      return {
        x: r * Math.cos(t),
        y: r * Math.sin(t)
      }
    }),
    hoveringPool: false,
    hoveringMine: false
  }

  handleMouseOverPool = () => this.setState({hoveringPool: true});
  handleMouseLeavePool = () => this.setState({hoveringPool: false});
  handleMouseOverMine = () => this.setState({hoveringMine: true});
  handleMouseLeaveMine = () => this.setState({hoveringMine: false});

  route() {
    const { here, characterSummaries, unpickedRoles, settingSummaries, depth, replace } = this.props;
    if (here.length === 0) return;
    if (here.length === 1) {
      if (here[0] !== "enclave") {
        return replace([], depth);
      }
      else {
        return;
      }
    }
    const [ what, who ] = here;
    if (what === "character") {
      if (!characterSummaries.map(c => c.id.toString()).includes(who)) {
        return replace([], depth);
      }
    }
    else if (what === "role") {
      if (!unpickedRoles.map(r => r.name.toLowerCase()).includes(who)) {
        return replace([], depth);
      }
    }
    else if (what === "setting") {
      if (!settingSummaries.map(r => r.name.toLowerCase().replace(" ", "_").includes(who))) {
        return replace([], depth);
      }
    }
    else {
      return replace([], depth);
    }
  }
  componentDidMount = this.route();
  componentDidUpdate(prevProps) {
    if (prevProps.here !== this.props.here) this.route();
  }

  render() {
    const { 
      characterSummaries, unpickedRoles, settingSummaries, visuals, 
      depth, tokens, gainToken, spendToken 
    } = this.props;
    const { pool, hoveringPool, hoveringMine } = this.state;
    return (
      <Container>
        <Body>
          <Scrolling>
            <Character depth={depth} to={["enclave"]}>
              <Name>The Enclave</Name>
              <Lure>
                A place to live, sleep, and hopefully heal. {visuals.length ? (listWithAnd(visuals, true) + ".") : null}
              </Lure>
            </Character>
            {characterSummaries.length || unpickedRoles.length ? <Divider /> : null}
            {characterSummaries.map(({id, name, lure}) => (
              <Character key={id} depth={depth} to={["character", id.toString()]}>
                <Name>{name}</Name>
                <Lure>{lure}</Lure>
              </Character>
            ))}
            {characterSummaries.length && unpickedRoles.length ? <Divider /> : null}
            {unpickedRoles.map(({name, description}) => (
              <Character key={name} depth={depth} to={["role", name.toLowerCase()]}>
                <Name>The {name}</Name>
                <Lure>{description}</Lure>
              </Character>
            ))}
            {settingSummaries.length ? <Divider /> : null}
            {settingSummaries.map(({name, pickUpWhen}) => (
              <Character key={name} depth={depth} to={["setting", name.toLowerCase().replace(" ", "_")]}>
                <Name>The {name}</Name>
                <Lure>Pick up when {pickUpWhen.slice(0, 1).toLowerCase()}{pickUpWhen.slice(1)}</Lure>
              </Character>            
            ))}
          </Scrolling>
          <Divider />
          <Tokens>
            <Name>Tokens</Name>
            <TokenDivider />
            {pool.map(({x, y}, i) => {
              const mine = tokens + i >= 100; 
              const hovering = (i === 100 - tokens && hoveringMine && tokens > 0) || (i === 99 - tokens && hoveringPool)
              return ( 
                <Token key={i} rx={{hovering}} style={{
                  left: (mine ? 190 - ((99 - i) * 170 / ((tokens - 1) || 1)) + 60 : 20 * x + 20 ).toString() + "px",
                  top: (mine ? 60 : 20 * y + 60).toString() + "px",
                }}/>
              )
            })}
            <Pool onMouseOver={this.handleMouseOverPool} onMouseLeave={this.handleMouseLeavePool} onClick={gainToken}/>
            <Mine onMouseOver={this.handleMouseOverMine} onMouseLeave={this.handleMouseLeaveMine} onClick={spendToken}/>
          </Tokens>
        </Body>
      </Container>
    );
  }
}

export default Sidebar;