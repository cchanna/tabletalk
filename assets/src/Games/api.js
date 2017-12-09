import { withUrl } from 'common/apiHelpers';

const { get, post } = withUrl("api")

export default {
  index: jwt => get("games", {jwt}),
  get: (id, jwt) => get("games/$id", {urlParams: {id}, jwt}),
  create: ({kind, name, player}, jwt) => post("games", {body: {kind, name, player}, jwt})
}