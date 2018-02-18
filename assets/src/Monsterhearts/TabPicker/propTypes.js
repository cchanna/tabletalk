import { arrayOf, shape, number, string, bool } from 'prop-types';

export const tabsShape = arrayOf(shape({
  id: string.isRequired,
  name: string.isRequired,
  mine: bool.isRequired
}));