import { withUrl } from 'common/apiHelpers';

const { get, post } = withUrl("api")

export default {
  index: jwt => get("games", {jwt}),
  get: (id, jwt) => get("games/$id", {urlParams: {id}, jwt}),
  create: ({kind, name, slug, player, maxPlayers}, jwt) => post("games", {body: {kind, name, slug, player, maxPlayers}, jwt}),
  join: ({slug, player}, jwt) => post("games/$slug/join", {body: {player}, urlParams: {slug}, jwt})
}