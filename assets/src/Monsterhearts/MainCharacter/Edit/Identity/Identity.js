import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import OptionsForm from './OptionsForm';

rx`
@import '~common/styles';
@import '~common/colors';
`

const Container = rx('div')`
  height: 100%;
`

class Identity extends Component {
  static propTypes = {
    id: number.isRequired,
    name: string,
    look: string,
    eyes: string,
    origin: string,
    names: arrayOf(string).isRequired,
    looks: arrayOf(string).isRequired,
    eyesList: arrayOf(string).isRequired,
    origins: arrayOf(string).isRequired,
    setName: func.isRequired,
    setLook: func.isRequired,
    setEyes: func.isRequired,
    setOrigin: func.isRequired
  }
  
  render() {
    const { 
      id,
      name, look, eyes, origin, 
      names, looks, eyesList, origins,
      setName, setLook, setEyes, setOrigin 
    } = this.props;

    return (
      <Container>
        <OptionsForm id={id} name="Name" value={name} options={names} onSubmit={setName}/>
        <OptionsForm id={id} name="Look" value={look} options={looks} onSubmit={setLook}/>
        <OptionsForm id={id} name="Eyes" value={eyes} options={eyesList} onSubmit={setEyes}/>
        <OptionsForm id={id} name="Origin" value={origin} options={origins} onSubmit={setOrigin}/>
      </Container>
    );
  }
}

export default Identity;