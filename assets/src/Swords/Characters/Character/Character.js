import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import { editProps } from './propTypes';
import Edit from './Edit';
import Markdown from 'Swords/Markdown';
import ToggleSection from './ToggleSection';

rx`
@import '~Swords/styles';
`

const Container = rx('div')`
  position: relative;
  transition: 150ms left ease-in-out;
  margin: 20px;
  flex: 1 0 0;
  font-family: $body;
  color: black;
`

const EditButton = rx('button')`
  @include button-style;
  margin-top: 10px;
  --text: black;
`

const Name = rx('h1')`
  font-family: $header;
  font-size: 40px;
  width: 100%;
  margin: 0;
`
const SectionHeader = rx('h2')`
  font-family: $header;
  font-weight: bold;
  font-size: 20px;
  margin: 10px 0 2px 0;
`
const WhatMatters = rx('div')`
  margin: 5px 0;
`
const Image = 'img';
const ImageContainer = rx('div')`
  width: 100%;
  max-height: 300px;
`
const Section = 'div';

class Character extends Component {
  static propTypes = {
    ...editProps,
    jovialFeatUsed: bool.isRequired,
    glumFeatUsed: bool.isRequired,
    trickUsed: bool.isRequired,
    setJovialFeatUsed: func.isRequired,
    setGlumFeatUsed: func.isRequired,
    setTrickUsed: func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      editMode: !this.done(props)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.done(prevProps) && !this.done()) {
      this.setState({editMode: true});
    }
  }


  done = (props) => {
    if (!props) props = this.props;
    return !!(
      props.eidolon && props.name && props.allThatMatters.length &&
      props.jovialFeat && props.glumFeat && props.trick 
    )
  } 

  handleDoneClick = () => {
    this.setState({editMode: false});
  }

  handleEditClick = () => {
    if (this.props.canEdit) {
      this.setState({editMode: true});
    }
  }

  handleJovialFeatClick = () => {
    const { id, setJovialFeatUsed, jovialFeatUsed } = this.props;
    setJovialFeatUsed({id, value: !jovialFeatUsed});
  }

  handleGlumFeatClick = () => {
    const { id, setGlumFeatUsed, glumFeatUsed } = this.props;
    setGlumFeatUsed({id, value: !glumFeatUsed});
  }

  handleTrickClick = () => {
    const { id, setTrickUsed, trickUsed } = this.props;
    setTrickUsed({id, value: !trickUsed});
  }

  render() {
    const { 
      canEdit
    } = this.props;
    const { editMode } = this.state;
    const done = this.done();
    if (canEdit && (editMode || !done)) {
      return (
        <Container>
          <Edit {...this.props} done={done} onDoneClick={this.handleDoneClick}/>
        </Container>
      )
    }
    else {
      const {
        displayName, eidolon, eidolonIsImage, allThatMatters, 
        jovialFeat, jovialFeatUsed, glumFeat, glumFeatUsed,
        trick, trickUsed, notes
      } = this.props;
      const disabled = !canEdit;
      return (
        <Container>
          <Name>{displayName}</Name>
          {eidolonIsImage ? (
            <ImageContainer>
              <Image src={eidolon} height="300px"/>
            </ImageContainer>
          ) : (
            <Markdown text={eidolon}/>
          )}
          {allThatMatters.length ? (
            <Section>
              <SectionHeader>All That Matters</SectionHeader>
              {allThatMatters.map((item, i) => (
                <WhatMatters key={i}>{item}</WhatMatters>
              ))}
            </Section>
          ) : null}
          {jovialFeat || glumFeat ? (
            <Section>
              <SectionHeader>Feats Heroic</SectionHeader>
              {jovialFeat ? (
                <ToggleSection 
                  disabled={disabled} 
                  jovial 
                  checked={jovialFeatUsed} 
                  onClick={this.handleJovialFeatClick}
                  text={jovialFeat}/>
              ) : null}
              {glumFeat ? (
                <ToggleSection 
                  disabled={disabled} 
                  glum 
                  checked={glumFeatUsed} 
                  onClick={this.handleGlumFeatClick}
                  text={glumFeat}/>
              ) : null}
            </Section>
          ) : null}
          {trick ? (
            <Section>
              <SectionHeader>Trick</SectionHeader>
              <ToggleSection 
                disabled={disabled} 
                checked={trickUsed} 
                onClick={this.handleTrickClick}
                text={trick}/>
            </Section>
          ) : null}
          {notes ? (
            <Section>
              <SectionHeader>Notes</SectionHeader>
              <Markdown text={notes}/>
            </Section>
          ) : null}
          {canEdit ? (
            <EditButton onClick={this.handleEditClick}>Edit</EditButton>
          ) : null}
        </Container>
      )
    }
  }
}

export default Character;