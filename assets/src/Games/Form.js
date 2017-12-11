import React, { Component } from 'react';
import { string, func } from 'prop-types';
import rx from 'resplendence';
  
rx`
@import '~common/styles';
@import '~common/colors';
`

const Container = rx('div')`
  @include card;
  padding: 20px;
  display: flex;
  flex-flow: column;
  align-items: center;
  position: relative;
`

const Back = rx('button')`
@include button;
font-family: "League Spartan";
color: $background-1;
position: absolute;
left: 10px;
top: 10px;
font-size: 18px;
&:hover, &:focus {
  color: $background-2;
}
`

const Label = rx('div')`
color: $background-1;
font-family: "Junction";
font-size: 20px;
text-align: center;
padding: 10px;
`


class Form extends Component {
  static propTypes = {
    label: string.isRequired,
    goBack: func
  }
  
  render() {
    const { label, goBack, children } = this.props;
    let back = null;
    if (goBack) back = <Back onClick={goBack}>Go Back</Back>
    return (
      <Container>
        {back}
        <Label>{label}</Label>
        {children}
      </Container>
    );
  }
}

export default Form;