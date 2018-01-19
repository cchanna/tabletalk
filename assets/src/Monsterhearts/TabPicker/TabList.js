import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import Link from 'Routing/Link';

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
    &:hover, :focus {
      color: $accent;
      padding-left: 15px;
      padding-right: 15px;
    }
    &:active {
      color: lighten($accent, 10%);
    }
  }
}
`

const Container = rx('div')`
  width: 100%;
  flex: 0 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  border-bottom: 1px solid white;
`
const Tab = rx(Link)`
  @include tab-link;
  font-size: 15px;
  height: 19px;
`
const NewCharacter = rx(Link)`
  @include tab-link;
  padding-bottom: 12px;
  font-size: 20px;
  height: 19px;
  box-sizing: border-box;
`

class TabList extends Component {
  static propTypes = {
    tabs: arrayOf(shape({
      id: number.isRequired,
      name: string.isRequired,
      mine: bool.isRequired
    })),
    here: arrayOf(string).isRequired
  }
  
  render() {
    const { tabs, here } = this.props;
    const tabComponents = tabs.map(({id, name, mine}) => 
      <Tab to={[...here, id.toString()]} key={id} rx={{mine}}>{name}</Tab>
    )
    return (
      <Container>
        {tabComponents}
        <Tab to={[...here, "side"]}>side&nbsp;characters</Tab>
        <NewCharacter to={[...here, "new"]}>+</NewCharacter> 
      </Container>
    );
  }
}

export default TabList;