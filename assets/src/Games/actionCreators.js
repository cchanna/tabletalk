import { forGames } from "state";
import { goTo } from "Routing";
import { get, post } from "common/api";

const { startLoading, failLoading, add, setList, flagReload } = forGames;

const mapGames = games => {
  const list = [];
  const gamesBySlug = {};
  const playersById = {};
  for (let i = 0; i < games.length; i++) {
    const { slug, kind, maxPlayers, name, players, me } = games[i];
    list.push(slug);
    const game = { kind, maxPlayers, name, me, players: [] };
    for (let j = 0; j < players.length; j++) {
      const { id, name, admin } = players[j];
      playersById[id] = { name, admin };
      game.players.push(id);
    }
    gamesBySlug[slug] = game;
  }
  return { list, gamesBySlug, playersById };
};

export const getGames = () => dispatch => {
  dispatch(startLoading());
  dispatch(get("games"))
    .then(games => {
      console.log("got games?", games);
      const { list, gamesBySlug, playersById } = mapGames(games);
      dispatch(add({ gamesBySlug, playersById }));
      dispatch(setList({ list }));
    })
    .catch(() => dispatch(failLoading()));
};

export const getGame = ({ slug }) => dispatch => {
  dispatch(startLoading());
  dispatch(get(`games/${slug}`))
    .then(game => {
      const { gamesBySlug, playersById } = mapGames([game]);
      dispatch(add({ gamesBySlug, playersById }));
    })
    .catch(() => dispatch(failLoading()));
};

export const openGame = slug => goTo(["games", slug]);

export const joinGame = ({ slug, player }) => dispatch => {
  return dispatch(post(`games/${slug}/join`, { player })).then(game => {
    const { gamesBySlug, playersById } = mapGames([game]);
    dispatch(add({ gamesBySlug, playersById }));
  });
};

export const create = ({
  kind,
  name,
  slug,
  player,
  maxPlayers
}) => dispatch => {
  return dispatch(post("games", { kind, name, slug, player, maxPlayers })).then(
    data => {
      const { gamesBySlug, playersById } = mapGames([data]);
      dispatch(add({ gamesBySlug, playersById }));
      dispatch(flagReload());
      dispatch(openGame(slug));
    }
  );
};

export const openNewGame = () => openGame("new");
