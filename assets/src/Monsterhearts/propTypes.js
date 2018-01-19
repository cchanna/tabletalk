import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'

export const playbookProperties = {
  sexMove: string.isRequired,
  names: arrayOf(string).isRequired,
  looks: arrayOf(string).isRequired,
  eyesList: arrayOf(string).isRequired,
  origins: arrayOf(string).isRequired,
  backstory: arrayOf(string).isRequired,
  darkestSelf: string.isRequired,
  advice: string.isRequired,
  flavour: string.isRequired,
  stats: arrayOf(arrayOf(number)).isRequired,
  advancements: arrayOf(string).isRequired,
  moves: arrayOf(string).isRequired,
  startingMoves: arrayOf(string).isRequired,
  startingMoveChoices: number.isRequired,
}
export const playbookShape = shape({playbookProperties})