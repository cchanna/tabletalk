import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import { Instructions } from '../components';
import StatArray from './StatArray';
import StatEditor from './StatEditor';

rx`
@import '~common/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const StatArrays = rx('div')`
  margin: 10px 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  transition: 150ms margin;
  &:hover, &:focus-within {
    margin: 0;
  }
`
const StatArrayDivider = rx('div')`
  width: 80%;
  height: 1px;
  border: 0 solid $background;
  transition: 150ms border;
  &:hover {
    border-width: 10px;
  }
  background: darken($foreground, 20%);
`

const Container = rx('div')`
  display: inline-block;
  height: 100%;
  font-size: 30px;
`


const arraySelected = (hot, cold, volatile, dark, stats) => {
  return (stats[0] === hot && stats[1] === cold && stats[2] === volatile && stats[3] === dark);
}

class Stats extends Component {
  static propTypes = {
    hot: number,
    cold: number,
    volatile: number,
    dark: number,
    stats: arrayOf(arrayOf(number)).isRequired,
    id: number.isRequired,
    sizes: arrayOf(string).isRequired,
    setStats: func.isRequired
  }

  constructor(props) {
    super(props);
    const { hot, cold, volatile, dark } = props;
    this.state = {
      array: (hot === null || cold === null || volatile === null || dark === null)
    }
  }

  handleClick = (stats) => {
    const { setStats, id } = this.props;
    setStats({
      id,
      hot: stats[0],
      cold: stats[1],
      volatile: stats[2],
      dark: stats[3]  
    })
  }
  
  render() {
    const { hot, cold, volatile, dark, stats, id, setStats, sizes } = this.props;
    const { array } = this.state;
    let content;
    const selected = [
      arraySelected(hot, cold, volatile, dark, stats[0]),
      arraySelected(hot, cold, volatile, dark, stats[1]),
    ]
    if (array) {
      return (
        <Container rx={sizes}>
          <Instructions>Choose your stats</Instructions>
          <StatArrays>
            <StatArray sizes={sizes} stats={stats[0]} onClick={this.handleClick} disabled={selected[0]}/>
            <StatArrayDivider/>
            <StatArray sizes={sizes} stats={stats[1]} onClick={this.handleClick} disabled={selected[1]}/>
          </StatArrays>
        </Container>
      )
    }
    else {
      return (
        <Container>
          <StatEditor name="Hot" id={id} value={hot} setStats={setStats}/>
          <StatEditor name="Cold" id={id} value={cold} setStats={setStats}/>
          <StatEditor name="Volatile" id={id} value={volatile} setStats={setStats}/>
          <StatEditor name="Dark" id={id} value={dark} setStats={setStats}/>
        </Container>
      );
    }
  }
}

export default Stats;