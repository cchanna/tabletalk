import { shape, number } from 'prop-types';

export const diceShape = shape({
  glum: number.isRequired,
  jovial: number.isRequired
});