import React from 'react';
import rx from 'resplendence';

import { Field } from 'formik';
import Spinner from 'common/components/Spinner';

rx`
@import "~common/styles";
@import "~common/colors";

@mixin input {
  border: none;
  display: block;
  background: none;
  font-size: 20px;
  padding: 5px 3px 5px 3px;
  text-align: left;
  font-family: "Junction";
  color: $color-light;
  background: lighten($color-dark, 3%);
  box-sizing: border-box;
  width: 100%;
  max-width: 400px;
  border-bottom: 0px solid $link-hover;
  transition-properties: color, background, box-shadow;
  transition-duration: .15s;

  $inset: -1px 1px 2px 1px rgba(0, 0, 0, .3) inset;
  $outset: -1px 1px 1px 1px rgba(0, 0, 0, .1);
  $fake-border: 0 -2px 0 0 $link-hover inset;

  box-shadow: $outset;

  &::placeholder {
    color: fade-out($color-dark, .5);
  }
  &:focus {
    outline: none;
    box-shadow: $inset, $fake-border;
    &::placeholder {
      color: lighten($color-dark, 20%);
    }
  }
  &.empty:not(:focus) {
    background: $color-light;
    box-shadow: $inset;
    color: $color-dark;
  }
  &.short {
    max-width: 80px;
  }
  &:hover, &:focus {
    background: lighten($color-dark, 10%);
  }
}

`

export const InputStyle = rx("input")`
  @include input;
  padding-left: 9px; 
`
const withEmpty = Node => ({field, ...props}) => <Node rx={{empty: field.value === ''}} {...field} {...props} />
const InputWithEmpty = withEmpty(InputStyle);
export const Input = props => <Field component={InputWithEmpty} {...props}/>

export const SelectStyle = rx('select')`
  @include input;
  &.empty {
    color: fade-out($color-light, .5);
    &:not(:focus) {
      color: fade-out($color-dark, .5);
    }
  }
`
const SelectWithEmpty = withEmpty(SelectStyle);
export const Select = props => <Field component={SelectWithEmpty} {...props} />

export const Option = rx('option')`
  background-color: $color-dark;
  color: $color-light;
`

export const Label = rx('label')`
  margin-bottom: 3px;
  font-family: "Junction";
`
export const Error = rx('span')`
  color: $link-hover;
`

export const Button = rx('button')`
  @include button;
  display: block;
  align-self: center;
  position: relative;
  left: 0;
  top: 0;
  font-family: "League Spartan";
  text-shadow: -1px 1px 1px hsla(0, 0%, 0%, .1);
  box-shadow: -1px 1px 1px 1px hsla(0, 0%, 0%, .3);
  background: hsl($hue2, 100%, 70%);
  color: white;
  font-size: 20px;
  padding: 9px 7px 4px 7px;
  line-height: 1em;
  transition-properties: font-size, left, top, background, color;
  transition-duration: 0.15s;
  min-height: 1.7em;
  min-width: 5em;
  &:not(:disabled) {
    &:hover, &:focus {
      background: hsl($hue2, 100%, 80%);
      font-size: 24px;
      left: -2px;
      top: -2px;
    }
  }
  &:disabled {
    cursor: default;
    background: $color-dark;
    &:not(.loading) {
      color: fade-out($color-light, .5);
    }
  }
  &.loading {
    font-size: 28px;
    left: -4px;
    top: -4px;
  }
`
export const SubmitButton = ({isSubmitting, isValid, children}) => (
  <Button type="submit" rx={{loading: isSubmitting}} disabled={isSubmitting || !isValid}>
    {isSubmitting ? <Spinner style={{fontSize: "5px"}}/> : children}
  </Button> 
)