import React, { Component } from 'react'
import { string, number, bool, func, shape, arrayOf } from 'prop-types'
import rx from 'resplendence'

import Advancement from './Advancement';

const Container = 'div';

const SeasonAdvancements = rx('div')`
  margin-top: 10px;
`;

class Advancements extends Component {
  static propTypes = {
    id: number.isRequired,
    canLevel: bool.isRequired,
    playbook: string.isRequired,
    advancements: arrayOf(shape({
      id: string.isRequired,
      text: string.isRequired,
      selected: bool.isRequired
    })).isRequired,
    readOnly: bool.isRequired,
    add: func.isRequired,
    remove: func.isRequired,
    seasonAdvancements: arrayOf(shape({
      id: string.isRequired,
      text: string.isRequired,
      selected: bool.isRequired
    })),
    depth: number.isRequired,
    here: arrayOf(string)
  }

  handleAdd = ({advancementId}) => {
    const { id, add } = this.props;
    add({id, advancementId});
  }

  handleRemove = ({advancementId}) => {
    const { id, remove } = this.props;
    remove({id, advancementId});
  }
  
  render() {
    const { advancements, playbook, canLevel, readOnly, depth, seasonAdvancements } = this.props;
    const commonProps = {
      readOnly, depth, playbook,
      onAdd: this.handleAdd,
      onRemove: this.handleRemove
    }
    return (
      <Container>
        {advancements.map(({text, id, selected}, i) =>
          <Advancement
            key={i}
            off={canLevel === selected}
            {...{id, selected, text}}
            {...commonProps}
          />
        )}
        {!seasonAdvancements ? null : (
          <SeasonAdvancements>
            {
              seasonAdvancements.map(({id, text, selected}) => {
                const gotSeasonAdvance = seasonAdvancements.some(advancement => advancement.selected);
                const off = ((canLevel && (gotSeasonAdvance || selected)) || (!canLevel && !selected));
                return (
                  <Advancement
                    key={id}
                    {...{id, selected, text, off}}
                    {...commonProps}
                  />
                )
              })
            }
          </SeasonAdvancements>
        )}
      </Container>
    );
  }
}

export default Advancements;