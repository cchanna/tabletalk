
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'

export const characterProperties = {
  name: string, 
  hidden: bool.isRequired, 
  notes: string, 
  conditions: arrayOf(string).isRequired,
}
export const mainCharacterProperties = {
  playerId: number.isRequired, 
  playbook: string.isRequired, 
  harm: number.isRequired, 
  experience: number.isRequired,
  hot: number, 
  cold: number, 
  volatile: number, 
  dark: number, 
  eyes: string, 
  look: string, 
  origin: string, 
  advancements: arrayOf(string).isRequired, 
  moves: arrayOf(string).isRequired
}
export const mainCharacterShape = shape(mainCharacterProperties);
export const characterShape = shape({
  ...characterProperties,
  mainCharacter: mainCharacterShape
})