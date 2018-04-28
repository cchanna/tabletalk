import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'

export const characterProps = {
  canEdit: bool.isRequired,
  name: string.isRequired, 
  eidolon: string.isRequired, 
  eidolonIsImage: bool.isRequired,
  allThatMatters: arrayOf(string).isRequired, 
  jovialFeat: string.isRequired, 
  glumFeat: string.isRequired, 
  trick: string.isRequired, 
  notes: string.isRequired,
}

export const editProps = {
  ...characterProps,
  id: number.isRequired,
  setName: func.isRequired,
  setEidolon: func.isRequired,
  addNamed: func.isRequired,
  removeNamed: func.isRequired,
  updateNamed: func.isRequired,
  setJovialFeat: func.isRequired,
  setGlumFeat: func.isRequired,
  setTrick: func.isRequired,
  setNotes: func.isRequired
}