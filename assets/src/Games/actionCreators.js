import {
  GAMES_START_LOADING,
  GAMES_SET_LIST,
  GAMES_ADD,
  GAMES_FLAG_RELOAD,
  GAMES_FAIL_LOADING,
} from "common/actions"
import actionCreator from 'utils/actionCreator';
import api from './api';
import catchStatus from 'common/catchStatus';

import { goTo } from 'Routing/actionCreators';

const startLoadingGames = actionCreator(GAMES_START_LOADING);
const setGamesList = actionCreator(GAMES_SET_LIST, "list");
const failLoadingGames = actionCreator(GAMES_FAIL_LOADING);
const flagReload = actionCreator(GAMES_FLAG_RELOAD);
const addGames = actionCreator(GAMES_ADD, "gamesBySlug", "playersById");



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
    .catch(catchStatus(dispatch))
    .catch(err => dispatch(failLoadingGames()));
}

export const getGame = ({slug}) => (dispatch, getState) => {
  const { auth } = getState();
  dispatch(startLoadingGames());
  api.get(slug, auth.jwt)
    .then(game => {
      const {gamesBySlug, playersById} = mapGames([game]);
      dispatch(addGames({gamesBySlug, playersById}));
    })
    .catch(catchStatus(dispatch))
    .catch(err => {
      console.error(err);
      dispatch(failLoadingGames());
    });
}

export const openGame = slug => goTo(["games", slug])

export const joinGame = ({slug, player}) => (dispatch, getState) => {
  const { auth } = getState();
  return api.join({slug, player}, auth.jwt)
    .then(game => {
      const {gamesBySlug, playersById} = mapGames([game]);
      dispatch(addGames({gamesBySlug, playersById}));
    })
    .catch(catchStatus(dispatch))
}

export const create = ({kind, name, slug, player, maxPlayers}) => (dispatch, getState) => {
  const { jwt } = getState().auth;
  return api.create({kind, name, slug, player, maxPlayers}, jwt)
    .then(data => {
      const { gamesBySlug, playersById } = mapGames([data]);
      dispatch(addGames({gamesBySlug, playersById}));
      dispatch(flagReload());
      dispatch(openGame(slug));
    })
    .catch(catchStatus(dispatch))
}

export const openNewGame = () => openGame("new")