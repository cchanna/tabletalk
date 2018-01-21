import actionCreator from 'utils/actionCreator';

import {
  MONSTERHEARTS_SOCKET_QUEUE,
  MONSTERHEARTS_SOCKET_QUEUE_SLOW
} from 'common/actions';
// import {
//   MONSTERHEARTS_CHARACTER_MAIN_CREATE,
//   MONSTERHEARTS_CHARACTER_MOVE_CREATE,
//   MONSTERHEARTS_CHARACTER_SIDE_CREATE,
//   MONSTERHEARTS_STRING_ADD,
//   MONSTERHEARTS_STRING_CREATE,
//   MONSTERHEARTS_CHAT
// } from 'common/actions';
// import { setTimeout } from 'timers';

const randomString = (length, chars) => {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
const randomUniqueId = () => randomString(36, "abcdefghijklmnopqrstuvwxyz0123456789")

const queueAction = actionCreator(MONSTERHEARTS_SOCKET_QUEUE, "action");
const queueSlowAction = actionCreator(MONSTERHEARTS_SOCKET_QUEUE_SLOW, "action");
// const answerAction = actionCreator(MONSTERHEARTS_ACTION_ANSWER, "uniqueId");
// const answerSlowAction = actionCreator(MONSTERHEARTS_ACTION_ANSWER_SLOW, "uniqueId");

// const resolveServerAction = action => (dispatch, getState) => {
//   const { monsterhearts } = getState();
//   const { unansweredActions, slowActionsById } = monsterhearts;
//   const { uniqueId } = action;
//   if (unansweredActions[uniqueId]) {
//     dispatch(answerAction({uniqueId}));
//   }
//   else {
//     if (slowActionsById[uniqueId]) {
//       dispatch(answerSlowAction({uniqueId}));
//     }
//     dispatch(action);
//   }
// }

export const serverActionCreator = (...actionCreatorArgs) => (...actionArgs) => (dispatch, getState) => {
  const action = actionCreator(...actionCreatorArgs)(...actionArgs);
  action.uniqueId = randomUniqueId();
  dispatch(queueAction({action}));
  dispatch(action);
  // setTimeout(() => {
  //   dispatch(resolveServerAction(action));
  // });
}


// const randomId = () => Math.floor(Math.random() * 9999999)
// const mockSlowAction = (action) => {
//   switch(action.type) {
//     case MONSTERHEARTS_CHARACTER_MAIN_CREATE:
//       return {
//         ...action,
//         id: randomId(),
//         name: null,
//         notes: "",
//         conditions: [],
//         mainCharacter: {
//           playerId: 58,
//           playbook: action.playbook,
//           harm: 0,
//           experience: 0,
//           hot: null,
//           cold: null,
//           volatile: null,
//           dark: null,
//           eyes: null,
//           look: null,
//           origin: null,
//           advancements: [],
//           moves: [],
//           moveNotesByName: {}
//         }
//       }
//     case MONSTERHEARTS_STRING_CREATE:
//       return {
//         type: MONSTERHEARTS_STRING_CREATE,
//         uniqueId: action.uniqueId,
//         id: randomId(),
//         from: action.from,
//         to: action.to,
//         value: 1
//       }
//     case MONSTERHEARTS_CHARACTER_SIDE_CREATE:
//       return {
//         type: MONSTERHEARTS_CHARACTER_SIDE_CREATE,
//         id: randomId(),
//         uniqueId: action.uniqueId,
//         name: action.name,
//         notes: action.notes,
//         conditions: [],
//         mainCharacter: null
//       }
//     case MONSTERHEARTS_CHARACTER_MOVE_CREATE:
//       return {
//         type: MONSTERHEARTS_CHARACTER_MOVE_CREATE,
//         id: randomId(),
//         characterId: action.characterId,
//         name: action.name,
//         notes: ""
//       }
//     case MONSTERHEARTS_CHAT: {
//       if (action.text === "/roll 1") {
//         return {
//           type: MONSTERHEARTS_CHAT,
//           id: randomId(),
//           playerId: 58,
//           talk: null,
//           roll: {
//             dice: [3, 5],
//             bonus: 1
//           }
//         } 
//       }
//       else {
//         return {
//           type: MONSTERHEARTS_CHAT,
//           id: randomId(),
//           playerId: 58,
//           talk: {
//             message: action.text,
//             isLog: false
//           },
//           roll: null
//         }
//       }
//     }
      
//   }
// }

export const slowServerActionCreator = (...actionCreatorArgs) => (...actionArgs) => (dispatch, getState) => {
  const action = actionCreator(...actionCreatorArgs)(...actionArgs);
  action.uniqueId = randomUniqueId();
  dispatch(queueSlowAction({action}));
  // setTimeout(() => {
  //   dispatch(resolveServerAction(mockSlowAction(action)));
  // }, 150);
  return action.uniqueId;
};
export default serverActionCreator;