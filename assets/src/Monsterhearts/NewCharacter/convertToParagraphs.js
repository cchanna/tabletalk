import React, { Component } from 'react'
import rx from 'resplendence'

rx`
p {
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
  -webkit-column-break-inside: avoid;
            page-break-inside: avoid;
                 break-inside: avoid;
}
h1 + p {
  margin-top: 0;
}
`

const convertToParagraphs = text => !text ? null : text
  .replace(/ *\n */g, "\n")
  .split("\n\n")
  .map((p, i) => <p key={i}>{p}</p>)

export default convertToParagraphs;