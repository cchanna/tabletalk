import {
  GAMES_START_LOADING,
  GAMES_SET_LIST,
  GAMES_ADD,
  GAMES_FLAG_RELOAD,
  GAMES_FAIL_LOADING,
  GAMES_JOIN_START,
  GAMES_JOIN_CANCEL,
  GAMES_JOIN_SET_INPUT,
  GAMES_JOIN,
  GAMES_JOIN_SUCCEED,
  GAMES_JOIN_FAIL
} from "common/actions"
import actionCreator from 'utils/actionCreator';
import api from './api';

import { goTo } from 'Routing/actionCreators';

const startLoadingGames = actionCreator(GAMES_START_LOADING);
const setGamesList = actionCreator(GAMES_SET_LIST, "list");
const failLoadingGames = actionCreator(GAMES_FAIL_LOADING);
const flagReload = actionCreator(GAMES_FLAG_RELOAD);
const addGames = actionCreator(GAMES_ADD, "gamesBySlug", "playersById");
export const setInput = actionCreator(GAMES_JOIN_SET_INPUT, "input");
const join = actionCreator(GAMES_JOIN);
const joinSucceed = actionCreator(GAMES_JOIN_SUCCEED);
const joinFail = actionCreator(GAMES_JOIN_FAIL);
export const startJoinGame = actionCreator(GAMES_JOIN_START);
export const cancelJoinGame = actionCreator(GAMES_JOIN_CANCEL);



const mapGames = games => {
  const list = [];
  const gamesBySlug = {};
  const playersById = {};
  for (let i=0; i < games.length; i++) {
    const { slug, kind, maxPlayers, name, players, me } = games[i];
    list.push(slug);
    const game = { kind, maxPlayers, name, me, players: [] };
    for (let j=0; j < players.length; j++) {
      const { id, name, admin } = players[j];
      playersById[id] = { name, admin };
      game.players.push(id);
    }
    gamesBySlug[slug] = game;
  }
  return {list, gamesBySlug, playersById};
}

export const getGames = () => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(startLoadingGames());
  api.index(auth.jwt)
    .then(games => {
      const {list, gamesBySlug, playersById} = mapGames(games);
      dispatch(addGames({gamesBySlug, playersById}));
      dispatch(setGamesList({list}));
    })
    .catch(err => dispatch(failLoadingGames()));
}

export const getGame = ({id}) => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(startLoadingGames());
  api.get(id, auth.jwt)
    .then(game => {
      const {gamesBySlug, playersById} = mapGames([game]);
      dispatch(addGames({gamesBySlug, playersById}));
    })
    .catch(err => {
      console.error(err);
      dispatch(failLoadingGames());
    });
}


export const joinGame = ({slug, player}) => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(join());
  api.join({slug, player}, auth.jwt)
    .then(game => {
      dispatch(joinSucceed());
      const {gamesBySlug, playersById} = mapGames([game]);
      dispatch(addGames({gamesBySlug, playersById}));
    })
    .catch(err => {
      console.error(err);
      dispatch(joinFail());
    })

}

export const addNewGame = game => dispatch => {
  const { gamesBySlug, playersById } = mapGames([game]);
  dispatch(addGames({gamesBySlug, playersById}));
  dispatch(flagReload());
}

export const openGame = game => goTo(["games", game]);