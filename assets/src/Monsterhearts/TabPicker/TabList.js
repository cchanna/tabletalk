import React, { Component } from "react";
import { string, number, bool, shape, arrayOf } from "prop-types";
import { tabsShape } from "./propTypes";
import rx from "resplendence";

import { Link } from "Routing";

rx`
@import '~common/styles';
@import '~Monsterhearts/colors';

@mixin tab-link {
  @include link;
  color: hsl(240, 10%, 70%);
  font-family: "League Spartan";
  position: relative;
  top: 0;
  padding: 0 10px;
  transition-property: padding, color background-color;
  transition-duration: 100ms;
  &.active {
    padding-left: 15px;
    padding-right: 15px;
    background-color: adjust-color($background, $lightness: 93%);
    color: $background;
  }
  &:not(.active) {
    &.mine {
      color: lighten($accent, 20%);
    }
    &:hover, :focus {
      color: $accent;
      padding-left: 15px;
      padding-right: 15px;
    }
    &:active {
      color: darken($accent, 30%);
    }
  }
}
`;

const Container = rx("div")`
  width: 100%;
  flex: 0 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  border-bottom: 1px solid white;
`;

const Section = rx("div")`
  flex: 0 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`;
const Tab = rx(Link)`
  @include tab-link;
  font-size: 15px;
  height: 19px;
`;
const Settings = rx(Link)`
  @include tab-link;
  font-family: "icomoon";
  padding-bottom: 9px;
  font-size: 18px;
  height: 19px;
  box-sizing: border-box;
`;
const NewCharacter = rx(Link)`
  @include tab-link;
  padding-bottom: 12px;
  font-size: 20px;
  height: 19px;
  box-sizing: border-box;
`;

class TabList extends Component {
  static propTypes = {
    tabs: tabsShape.isRequired,
    depth: number.isRequired
  };

  render() {
    const { tabs, depth } = this.props;
    const tabComponents = tabs.map(({ id, name, mine }) => (
      <Tab depth={depth} to={id} key={id} rx={{ mine }}>
        {name}
      </Tab>
    ));
    return (
      <Container>
        <Section>
          {tabComponents}
          <NewCharacter depth={depth} to={"new"}>
            +
          </NewCharacter>
        </Section>
        <Section>
          <Settings depth={depth} to={"settings"}>
            g
          </Settings>
        </Section>
      </Container>
    );
  }
}

export default TabList;
