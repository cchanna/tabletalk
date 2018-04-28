import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import { editProps } from './propTypes';
import update from 'immutability-helper';
import AutoSizeTextArea from 'react-autosize-textarea';
  
rx`
@import '~Swords/styles';
`

const Container = rx('div')`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
`


const EditStep = rx('div')`
  &:not(:first-child) {
    margin-top: 20px;
  }
  font-family: $header;
  font-size: 20px;
  color: black;
`
const EditStepNumber = rx('div')`
  border-radius: 50%;
  display: inline-block;
  width: 1.2em;
  height: 1.2em;
  text-align: center;
  position: relative;
  margin-right: 10px;
  box-sizing: border-box;
  background: var(--color-glum);
  color: var(--text-glum);
  box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, .25);
  &.done {
    background: var(--color-jovial);
    color: var(--text-jovial);
  }
`
const Input = rx('input')`
  @include input-style;
  color: black;
  margin: 5px 0;
  width: 100%;
`
const TextArea = rx(AutoSizeTextArea)`
  @include input-style;
  width: 100%;
`

const Or = rx('div')`
  color: #777;
  margin-left: 50px;
`
const Image = rx('img')`
`
const ImageContainer = rx('div')`
  width: 100%;
  max-height: 300px;
`
const DoneButtonContainer = 'div';
const DoneButton = rx('button')`
  @include button-style;
  width: auto;
  --text: black;
  margin-top: 10px;
`
const Feat = rx('div')`
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  textarea {
    flex: 1 0 0;
  }
`
const FeatTone = rx('div')`
  background: var(--color-glum);
  flex: 0 0 23px;

  margin: 5px 4px 5px 0;
  box-shadow: -1px 1px 1px 1px rgba(black, .25) inset;
  &.jovial {
    background: var(--color-jovial);
  }
`

class Edit extends Component {
  static propTypes = {
    done: bool.isRequired,
    onDoneClick: func.isRequired,
    ...editProps
  }


  constructor(props) {
    super(props);
    this.state = {
      values: {
        eidolon: props.eidolon,
        eidolonIsImage: props.eidolonIsImage,
        name: props.name,
        allThatMatters: [...props.allThatMatters],
        newNamedItem: "",
        jovialFeat: props.jovialFeat,
        glumFeat: props.glumFeat,
        trick: props.trick,
        notes: props.notes
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.allThatMatters.length !== this.props.allThatMatters.length) {
      this.setState(state => update(state, {
        values: {
          allThatMatters: {$set: this.props.allThatMatters}
        }
      }))
    }
  }

  handleChangeEidolon = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(state => update(state, {
      values: {
        eidolon: {$set: value},
        eidolonIsImage: {$set: name === "image"}
      }
    }));
  }
  

  handleBlurEidolon = () => {
    const { id, setEidolon } = this.props;
    const { eidolon, eidolonIsImage } = this.state.values;
    if (this.props.eidolon !== eidolon || this.props.eidolonIsImage !== eidolonIsImage) {
      setEidolon({id, eidolon, eidolonIsImage});
    }
  }

  handleBlurName = () => {
    const { id, setName } = this.props;
    const { name } = this.state.values;
    if (this.props.name !== name) {
      setName({id, name});
    }
  }

  handleBlurNewNamedItem = () => {
    const { id, addNamed } = this.props;
    const { newNamedItem } = this.state.values;
    if (newNamedItem) {
      addNamed({id, name: newNamedItem});
      this.setState(state => update(state, {
        values: {
          newNamedItem: {$set: ""}
        }
      }));
    }
  }

  handleKeyDownNewNamedItem = e => {
    if (e.which === 13) {
      this.handleBlurNewNamedItem();
    }
  }

  handleChangeWhatMatters = e => {
    const index = parseInt(e.target.name, 10);
    const value = e.target.value;
    this.setState(state => update(state, {
      values: {
        allThatMatters: {
          [index]: {$set: value}
        }
      }
    }));
  }

  handleBlurWhatMatters = e => {
    const index = parseInt(e.target.name, 10);
    const { id, updateNamed, removeNamed, allThatMatters } = this.props;
    const name = this.state.values.allThatMatters[index];
    if (name) {
      if (allThatMatters[index] !== name) {
        updateNamed({id, index, name});
      }
    }
    else {
      removeNamed({id, index});
    }
  }

  handleKeyDownWhatMatters = e => {
    const index = parseInt(e.target.name, 10);
    const name = this.state.values.allThatMatters[index];
    if (!name && e.which === 8) {
      const { id, removeNamed } = this.props;
      removeNamed({id, index});
    }
  }

  handleBlurJovialFeat = () => {
    const { id, setJovialFeat, jovialFeat } = this.props;
    const value = this.state.values.jovialFeat;
    if (jovialFeat !== value) {
      setJovialFeat({id, value});
    }
  }

  handleBlurGlumFeat = () => {
    const { id, setGlumFeat, glumFeat } = this.props;
    const value = this.state.values.glumFeat;
    if (glumFeat !== value) {
      setGlumFeat({id, value});
    }
  }

  handleBlurTrick = () => {
    const { id, setTrick, trick } = this.props;
    const value = this.state.values.trick;
    if (trick !== value) {
      setTrick({id, value});
    }
  }

  handleBlurNotes = () => {
    const { id, setNotes, notes } = this.props;
    const value = this.state.values.notes;
    if (notes !== value) {
      setNotes({id, value});
    }
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(state => update(state, {
      values: {
        [name]: {$set: value}
      }
    }));
  }
  
  render() {
    const { done, onDoneClick } = this.props;
    const {
      name, eidolon, eidolonIsImage, allThatMatters, newNamedItem, 
      jovialFeat, glumFeat, trick, notes
    } = this.state.values;
    return (
      <Container>
        <EditStep>
          <EditStepNumber rx={{done: this.props.eidolon}}>1</EditStepNumber> 
          Eidolon or Simulacra
        </EditStep>
        <TextArea 
          name="not image" value={(eidolonIsImage ? "" : eidolon)} 
          onChange={this.handleChangeEidolon}  
          onBlur={this.handleBlurEidolon}
          placeholder="enter an eidolon as text"
        />
        <Or>-or-</Or>
        <Input 
          name="image" type="text" 
          value={eidolonIsImage ? eidolon : ""}
          onChange={this.handleChangeEidolon} 
          onBlur={this.handleBlurEidolon}
          placeholder="a link to an image file"
        />
        {eidolonIsImage ? (
          <ImageContainer>
            <Image src={eidolon} height="300px"/>
          </ImageContainer>
        ) : null}
        <EditStep>
          <EditStepNumber rx={{done: this.props.name && this.props.allThatMatters.length > 0}}>
            2
          </EditStepNumber> 
          All That Deserves a Name
        </EditStep>
        <Input
          name="name" type="text"
          value={name}
          onChange={this.handleChange}
          onBlur={this.handleBlurName}
          placeholder="name your rogue"
        />
        {allThatMatters.map((item, i) => (
          <Input
            name={i} type="text" key={i} value={item}
            onChange={this.handleChangeWhatMatters}
            onBlur={this.handleBlurWhatMatters}
            onKeyDown={this.handleKeyDownWhatMatters}
          />
        ))}
        <Input
          name="newNamedItem" type="text" value={newNamedItem}
          onChange={this.handleChange}
          onBlur={this.handleBlurNewNamedItem}
          onKeyDown={this.handleKeyDownNewNamedItem}
          placeholder={allThatMatters.length ? "name another thing" : "name all that matters to your rogue"}
        />
        <EditStep>
          <EditStepNumber rx={{done: this.props.jovialFeat && this.props.glumFeat}}>
            3
          </EditStepNumber> 
          Feats Heroic
        </EditStep>
        <Feat>
          <FeatTone rx={{jovial: true}}/>
          <TextArea
            name="jovialFeat" value={jovialFeat}
            onChange={this.handleChange}
            onBlur={this.handleBlurJovialFeat}
            placeholder="write your jovial feat heroic"
          />
        </Feat>
        <Feat>
          <FeatTone/>
          <TextArea
            name="glumFeat" value={glumFeat}
            onChange={this.handleChange}
            onBlur={this.handleBlurGlumFeat}
            placeholder="write your glum feat heroic"
          />
        </Feat>
        <EditStep>
          <EditStepNumber rx={{done: this.props.trick}}>
            4
          </EditStepNumber> 
          Tricks of the Trade
        </EditStep>
        <TextArea
          name="trick" value={trick}
          onChange={this.handleChange}
          onBlur={this.handleBlurTrick}
          placeholder="write your trick"
        />
        <EditStep>
          Notes
        </EditStep>
        <TextArea
          name="notes" value={notes}
          onChange={this.handleChange}
          onBlur={this.handleBlurNotes}
          placeholder="write any other notes here, if you like"
        />
        <DoneButtonContainer>
          <DoneButton
            disabled={!done}
            onClick={onDoneClick}>
            Done
          </DoneButton>
        </DoneButtonContainer>
      </Container>
    );
  }
}

export default Edit;