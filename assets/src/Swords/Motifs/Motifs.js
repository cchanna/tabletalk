import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import Motif from './Motif';  

rx`
@import '~Swords/styles';
`

const Container = rx('div')`
  max-width: 600px;
  width: 100%;
`
const ShowHideButton = rx('button')`
  @include button-style;
  align-self: center;
  font-size: 14px;
`
const ShowHideRow = rx('div')`
  position: relative;
  top: -15px;
  display: flex;
  align-items: center;
  justify-content: center;
`

class Motifs extends Component {
  static propTypes = {
    motifs: arrayOf(shape({
      items: arrayOf(string),
      reincorporatedBy: string,
      mine: bool.isRequired
    })),
    canReincorporate: bool.isRequired,
    slowActionsById: object.isRequired,
    editMotif: func.isRequired,
    reincorporateMotif: func.isRequired,
    undoReincorporation: func.isRequired,
  }

  state = {
    show: false
  }

  toggleMotifsShown = () => this.setState(({show}) => ({show: !show}));
  
  render() {
    const { 
      motifs, canReincorporate, slowActionsById, 
      editMotif, reincorporateMotif, undoReincorporation 
    } = this.props;
    const { show } = this.state;
    let shown;
    for (shown=0; shown < motifs.length - 1; shown++) {
      const motif = motifs[shown];
      if (!motif.items[0] || !motif.items[1] || !motif.items[2]) {
        break;
      }
    }
    return (
      <Container>
        {motifs.map((motif, i) => 
          <Motif 
            show={show || shown >= i}
            key={i} index={i}
            {...{
              ...motif, canReincorporate,
              editMotif, reincorporateMotif, undoReincorporation,
              slowActionsById
            }} 
            setMotifsShown={this.setMotifsShown}/>
        )}
        {shown < 2 ? (
          <ShowHideRow>
            <ShowHideButton onClick={this.toggleMotifsShown}>{show ? "hide future motifs" : "show future motifs"}</ShowHideButton>
          </ShowHideRow>
        ) : null}
      </Container>
    );
  }
}

export default Motifs;