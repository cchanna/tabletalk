import React, { Component } from "react";
import { string, number, bool, func, shape, object, arrayOf } from "prop-types";
import rx from "resplendence";

rx`
@import '~DreamAskew/styles';
`;

const Name = rx("div")`
  font-family: $header;
  font-size: 17px;
  line-height: 1.1;
`;
const Tokens = rx("div")`
  padding: 10px;
  position: relative;
  height: 100px;
`;
const Token = rx("div")`
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
  &.dark {
    box-shadow: none;
    background: fade-out($foreground, .5);
    width: 15px;
    height: 15px;
  }
`;
const Pool = rx("button")`
  cursor: pointer;
  opacity: 0;
  position: absolute;
  width: 60px;
  height: 60px;
  top: 40px;
  left: 0px;
`;
const Mine = rx("button")`
  cursor: pointer;
  opacity: 0;
  position: absolute;
  width: 190px;
  height: 100px;
  top: 35px;
  left: 80px;
`;
const TokenDivider = rx("div")`
  position: absolute;
  left: 65px;
  top: 40px;
  height: 60px;
  width: 0px;
  border-right: 2px solid fade-out($foreground, .7);
`;

class MyTokens extends Component {
  static propTypes = {
    tokens: number.isRequired,
    gainToken: func.isRequired,
    spendToken: func.isRequired
  };

  state = {
    pool: Array.from(Array(100)).map(() => {
      const tau = Math.PI * 2;
      const t = tau * Math.random();
      const u = Math.random() + Math.random();
      const r = u > 1 ? 2 - u : u;

      return {
        x: r * Math.cos(t),
        y: r * Math.sin(t)
      };
    }),
    hoveringPool: false,
    hoveringMine: false
  };

  handleMouseOverPool = () => this.setState({ hoveringPool: true });
  handleMouseLeavePool = () => this.setState({ hoveringPool: false });
  handleMouseOverMine = () => this.setState({ hoveringMine: true });
  handleMouseLeaveMine = () => this.setState({ hoveringMine: false });

  render() {
    const { tokens, gainToken, spendToken } = this.props;
    const { pool, hoveringPool, hoveringMine } = this.state;
    return (
      <Tokens>
        <Name>Tokens</Name>
        <TokenDivider />
        {pool.map(({ x, y }, i) => {
          const mine = tokens + i >= 100;
          const hovering =
            (i === 100 - tokens && hoveringMine && tokens > 0) ||
            (i === 99 - tokens && hoveringPool);
          return (
            <Token
              key={i}
              rx={{ hovering }}
              style={{
                left:
                  (mine ? 80 + ((99 - i) % 7) * 25 : 20 * x + 20).toString() +
                  "px",
                top:
                  (mine
                    ? 35 + Math.floor((99 - i) / 7) * 25
                    : 20 * y + 60
                  ).toString() + "px"
              }}
            />
          );
        })}
        <Pool
          onMouseOver={this.handleMouseOverPool}
          onMouseLeave={this.handleMouseLeavePool}
          onClick={gainToken}
        />
        <Mine
          onMouseOver={this.handleMouseOverMine}
          onMouseLeave={this.handleMouseLeaveMine}
          onClick={spendToken}
        />
      </Tokens>
    );
  }
}

export default MyTokens;
