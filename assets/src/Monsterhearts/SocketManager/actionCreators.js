import actionCreator from 'utils/actionCreator';

import {
  MONSTERHEARTS_SOCKET_CONNECT,
  MONSTERHEARTS_SOCKET_DISCONNECT,
  MONSTERHEARTS_SOCKET_ANSWER,
  MONSTERHEARTS_SOCKET_ANSWER_SLOW,
  MONSTERHEARTS_SOCKET_SEND,
  MONSTERHEARTS_CHAT
} from 'common/actions';

export const chat = actionCreator(MONSTERHEARTS_CHAT, "id", "insertedAt", "playerId", "talk", "roll")
export const connect = actionCreator(MONSTERHEARTS_SOCKET_CONNECT);
export const disconnect = actionCreator(MONSTERHEARTS_SOCKET_DISCONNECT);
export const answer = actionCreator(MONSTERHEARTS_SOCKET_ANSWER, "uniqueId");
export const answerSlow = actionCreator(MONSTERHEARTS_SOCKET_ANSWER_SLOW, "uniqueId");
export const send = actionCreator(MONSTERHEARTS_SOCKET_SEND);