import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import update from 'immutability-helper';
import Reincorporation from "../Reincorporation";  

rx`
@import '~Swords/styles';
`

const Wrapper = rx('div')`
  position: relative;
  margin-bottom: 20px;
  transition-property: max-height, top;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  top: -185px;
  max-height: 0;
  &.show {
    max-height: 215px;
    top: 0;
  }

`

const Container = rx('div')`
  background: white;
  min-height: 185px;
  box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, .5);
  color: black;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
`

const Section = 'div';

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

const motifTitles = ["First", "Second", "Final"]

class Motif extends Component {
  static propTypes = {
    index: number.isRequired,
    show: bool.isRequired,
    items: arrayOf(string).isRequired,
    reincorporatedBy: string,
    mine: bool.isRequired,
    editMotif: func.isRequired,
    reincorporateMotif: func.isRequired,
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

  handleReincorporate = () => {
    const { index, reincorporateMotif } = this.props;
    return reincorporateMotif({index});
  }
  
  render() {
    const { index, mine, reincorporatedBy, show } = this.props;
    const { items } = this.state;
    return (
      <Wrapper style={{zIndex: 3 - index}} rx={{show}}>
        <Container >
          <Section>
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
          </Section>
          <Reincorporation 
            onReincorporate={this.handleReincorporate}
            mine={mine}
            reincorporatedBy={reincorporatedBy}
            hide={!show}
          >
          </Reincorporation>
        </Container>
      </Wrapper>
    );
  }
}

export default Motif;