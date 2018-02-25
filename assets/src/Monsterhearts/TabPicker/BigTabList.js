import React, { Component } from 'react'
import { string, number, bool, shape, arrayOf } from 'prop-types'
import { tabsShape } from './propTypes';
import rx from 'resplendence'
  
import { Link } from 'Routing';

rx`
@import '~common/styles';
@import '~Monsterhearts/colors';

@mixin big-tab-link {
  @include link;
  color: hsl(240, 10%, 93%);
  font-family: "League Spartan";
  position: relative;
  top: 0;
  transition-property: font-size, top, color;
  transition-duration: 100ms;
  &:hover, :focus {
    color: $accent;
  }
  &:active {
    color: lighten($accent, 10%);
  }
}
`

const Container = rx('div')`
  width: 100%;
  height: 100%;
  flex: 1 0 0;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`
const BigTab = rx(Link)`
  @include big-tab-link;

  font-size: 30px;
  height: 35px;
  margin: 20px 0;
  &.mine:before, &.mine:after {
    content: "*";
    font-family: "icomoon";
    margin: 0 .3em;
    font-size: .7em;
    position: relative;
    top: -1px;
  }
  &:hover, :focus {
    font-size: 33px;
    top: -3px;
  }
`
const NewCharacter = rx(Link)`
  @include big-tab-link;

  font-size: 60px;
  height: 50px;
  &:hover, :focus {
    font-size: 70px;
    top: -6px;
  }
`

class BigTabList extends Component {
  static propTypes = {
    tabs: tabsShape.isRequired,
    depth: number.isRequired,
    retired: bool.isRequired
  }
  static defaultProps = {
    retired: false
  }
  
  render() {
    const { tabs, depth, retired } = this.props;
    const linkDepth = retired ? depth - 1 : depth;
    return (
      <Container>
        {tabs.map(({id, name, mine}) => (
          <BigTab depth={linkDepth} to={id} key={id} rx={{mine}}>{name}</BigTab>
        ))}
        {retired ? null : (
          <NewCharacter depth={depth} to="new">+</NewCharacter> 
        )}
      </Container>
    );
  }
}

export default BigTabList;