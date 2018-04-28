import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import update from 'immutability-helper';
  
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
  top: -225px;
  &.show {
    height: 225px;
    top: 0;
  }

`

const Container = rx('div')`
  background: white;
  height: 225px;
  box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, .5);
  color: black;
`

const ItemInput = rx('input')`
  @include input-style;
  display: block;
  width: 100%;
  margin-bottom: 20px;
`

const Header = rx('h1')`
  padding: 20px 20px 10px 20px;
  margin: 0;
  font-family: $header;
  font-size: 30px;
`

const Body = rx('div')`
  padding: 0 20px 20px 20px;
`

const motifTitles = ["First", "Second", "Final"]

class Motif extends Component {
  static propTypes = {
    index: number.isRequired,
    show: bool.isRequired,
    items: arrayOf(string).isRequired,
    reincorporatedBy: string,
    editMotif: func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      items: props.items
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
  }
  
  render() {
    const { index, show } = this.props;
    const { items } = this.state;
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
        </Container>
      </Wrapper>
    );
  }
}

export default Motif;