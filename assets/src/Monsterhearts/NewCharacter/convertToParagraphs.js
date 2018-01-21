import React, { Component } from 'react'
import rx from 'resplendence'


const convertToParagraphs = text => !text ? null : text
  .replace(/ *\n */g, "\n")
  .split("\n\n")
  .map((p, i) => <p key={i}>{p}</p>)

export default convertToParagraphs;