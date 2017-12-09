import {
  GAMES_NEW_SET_INPUT,
  GAMES_NEW_SET_KIND,
  GAMES_NEW_SET_NAME,
  GAMES_NEW_STEP_BACK,
  GAMES_NEW_SUBMIT,
  GAMES_NEW_RESET,
  GAMES_NEW_SUBMIT_FAIL
} from "common/actions"
import actionCreator from 'utils/actionCreator';
import api from 'Games/api';

import { addNewGame } from 'Games/actionCreators';
import { goTo } from 'Routing/actionCreators';

export const setInput = actionCreator(GAMES_NEW_SET_INPUT, "input");
export const setKind = actionCreator(GAMES_NEW_SET_KIND, "kind");
export const setName = actionCreator(GAMES_NEW_SET_NAME);
export const stepBack = actionCreator(GAMES_NEW_STEP_BACK);
export const reset = actionCreator(GAMES_NEW_RESET);
const submit = actionCreator(GAMES_NEW_SUBMIT);
const fail = actionCreator(GAMES_NEW_SUBMIT_FAIL);

export const create = () => (dispatch, getState) => {
  const { games, auth } = getState();
  const { jwt } = auth;
  const { name, kind, input } = games.newGame.form;
  dispatch(submit());
  api.create({name, kind, player: input}, jwt)
    .then(data => {
      dispatch(addNewGame(data));
      dispatch(goTo(["games", data.id]));
    })
    .catch(err => {
      console.error(err);
      dispatch(fail());
    })
}