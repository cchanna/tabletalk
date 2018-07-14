import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import { EditButton } from "../Layout";
  
rx`
@import '~DreamAskew/styles';
`

export const EditName = rx('input')`
  @include input-style;
  font-family: $header;
  font-size: 20px;
  margin-top: 10px;
  line-height: 1.1;
`
export const Row = rx('div')`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`
const Name = rx('div')`
  margin: 15px 0 5px 0;
  font-family: $header;
  font-size: 20px;
  line-height: 1.1;
`


class EditableName extends Component {
  static propTypes = {
    name: string.isRequired,
    onChange: func.isRequired,
    showEdit: bool.isRequired
  }

  state = {
    editing: false,
    name: ""
  }

  handleChange = e => {
    this.setState({name: e.target.value});
  }
  handleRef = e => this.editRef = e;
  
  toggleEdit = () => {
    const { editing, name } = this.state;
    if (editing) {
      if (name) {
        this.props.onChange(name);
        this.setState({editing: false});
      }
    }
    else {
      this.setState({
        editing: true,
        name: this.props.name
      });
      setTimeout(() => {
        if (this.editRef) {
          this.editRef.select();
        }
      }, 0);
    }
  }

  handleKeyDown = e => {
    if (e.which === 13) {
      this.toggleEdit();
    }
  }

  
  render() {
    const { name, showEdit } = this.props;
    const { editing } = this.state;
    return (
      <Row>
        {editing ? (
          <EditName 
            type="text" 
            value={this.state.name} 
            innerRef={this.handleRef} 
            onChange={this.handleChange} 
            onKeyDown={this.handleKeyDown}/>
        ) : (
          <Name>{name}</Name>
        )}
        <EditButton disabled={(editing && !this.state.name) || (!editing && !showEdit)} onClick={this.toggleEdit} rx={{selected: editing}}>
          P
        </EditButton>
      </Row>
    );
  }
}

export default EditableName;