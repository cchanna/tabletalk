import React, { Component } from "react";
import { string, number, bool, func, shape, object, arrayOf } from "prop-types";
import rx from "resplendence";
import { Link } from "Routing";
import { listWithAnd } from "../Layout";
import MyTokens from "./MyTokens";

rx`
@import '~DreamAskew/styles';
`;

const Container = rx("div")`
  height: 100%;
  flex: 0 0 300px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;
const Body = rx("div")`
  align-self: stretch;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  padding: 10px;
`;
const Scrolling = rx("div")`
  flex: 1 0 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  overflow-y: auto;
  justify-content: flex-start;
`;
const Divider = rx("div")`
  align-self: center;
  width: calc(100% - 20px);
  height: 0px;
  margin: 10px 0;
  border-bottom: 1px solid fade-out($foreground, .7);
`;
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
`;
const Name = rx("div")`
  font-family: $header;
  font-size: 17px;
  line-height: 1.1;
`;
const Lure = "div";
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
const TheirTokens = rx("div")`
  position: relative;
  width: 100%;
  transition-property: height;
  transition-duration: 150ms;
`;

class Sidebar extends Component {
  static propTypes = {
    characterSummaries: arrayOf(
      shape({
        id: number.isRequired,
        name: string.isRequired,
        lure: string.isRequired
      })
    ),
    unpickedRoles: arrayOf(
      shape({
        name: string.isRequired,
        description: string.isRequired
      })
    ),
    settingSummaries: arrayOf(
      shape({
        name: string.isRequired,
        pickUpWhen: string.isRequired
      })
    ),
    visuals: arrayOf(string).isRequired,
    depth: number.isRequired,
    here: arrayOf(string).isRequired,
    goTo: func.isRequired,
    replace: func.isRequired
  };

  route() {
    const {
      here,
      characterSummaries,
      unpickedRoles,
      settingSummaries,
      depth,
      replace
    } = this.props;
    if (here.length === 0) return;
    if (here.length === 1) {
      if (here[0] !== "enclave") {
        return replace([], depth);
      } else {
        return;
      }
    }
    const [what, who] = here;
    if (what === "character") {
      if (!characterSummaries.map(c => c.id.toString()).includes(who)) {
        return replace([], depth);
      }
    } else if (what === "role") {
      if (!unpickedRoles.map(r => r.name.toLowerCase()).includes(who)) {
        return replace([], depth);
      }
    } else if (what === "setting") {
      if (
        !settingSummaries.map(r =>
          r.name
            .toLowerCase()
            .replace(" ", "_")
            .includes(who)
        )
      ) {
        return replace([], depth);
      }
    } else {
      return replace([], depth);
    }
  }
  componentDidMount = this.route();
  componentDidUpdate(prevProps) {
    if (prevProps.here !== this.props.here) this.route();
  }

  render() {
    const {
      characterSummaries,
      unpickedRoles,
      settingSummaries,
      visuals,
      depth
    } = this.props;
    return (
      <Container>
        <Body>
          <Scrolling>
            <Character depth={depth} to={["enclave"]}>
              <Name>The Enclave</Name>
              <Lure>
                A place to live, sleep, and hopefully heal.{" "}
                {visuals.length ? listWithAnd(visuals, true) + "." : null}
              </Lure>
            </Character>
            {characterSummaries.length || unpickedRoles.length ? (
              <Divider />
            ) : null}
            {characterSummaries.map(({ id, name, tokens, lure }) => (
              <Character
                key={id}
                depth={depth}
                to={["character", id.toString()]}
              >
                <Name>{name}</Name>
                <Lure>{lure}</Lure>
                <TheirTokens
                  style={{
                    height: 15 + 20 * Math.floor((tokens - 1) / 12) + "px"
                  }}
                >
                  {Array(tokens + 1)
                    .fill(0)
                    .map((_, i) => (
                      <Token
                        rx={{ dark: true }}
                        key={i}
                        style={{
                          left: (i === tokens ? -30 : (i % 12) * 20) + "px",
                          top:
                            (i === tokens ? -30 : Math.floor(i / 12) * 20) +
                            "px"
                        }}
                      />
                    ))}
                </TheirTokens>
              </Character>
            ))}
            {characterSummaries.length && unpickedRoles.length ? (
              <Divider />
            ) : null}
            {unpickedRoles.map(({ name, description }) => (
              <Character
                key={name}
                depth={depth}
                to={["role", name.toLowerCase()]}
              >
                <Name>The {name}</Name>
                <Lure>{description}</Lure>
              </Character>
            ))}
            {settingSummaries.length ? <Divider /> : null}
            {settingSummaries.map(({ name, pickUpWhen }) => (
              <Character
                key={name}
                depth={depth}
                to={["setting", name.toLowerCase().replace(" ", "_")]}
              >
                <Name>The {name}</Name>
                <Lure>
                  Pick up when {pickUpWhen.slice(0, 1).toLowerCase()}
                  {pickUpWhen.slice(1)}
                </Lure>
              </Character>
            ))}
          </Scrolling>
          <Divider />
          <MyTokens />
        </Body>
      </Container>
    );
  }
}

export default Sidebar;
