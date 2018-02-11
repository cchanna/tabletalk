import React from 'react';

const parseAdvancement = (text, playbook) => text
  .replace("{playbook}", playbook)
  .split("*")
  .map((string, i) => (i % 2 === 0) ? string : <strong key={i}>{string}</strong>);

export default parseAdvancement;