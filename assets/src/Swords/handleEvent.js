import { fromSwords, forSwords } from 'state';

const { 
  getTone,
  getOverplayerId
} = fromSwords;
const { setTone } = forSwords;

const handleEvent = event => (dispatch, getState) => {
  const state = getState();
  switch (event.data.type) {
    case "SWORDS_DICE_ROLL": {
      const { playerId, data } = event;
      if (data.glum !== data.jovial) {
        dispatch(setTone({playerId, tone: data.jovial > data.glum}));
      }
      else {
        const overplayer = getOverplayerId(state);
        const overtone = getTone(state);
        dispatch(setTone({playerId: overplayer, tone: !overtone}));
        if (overplayer !== playerId) {
          dispatch(setTone({playerId, tone: !overtone}));
        }
      }
      return dispatch(event.data);
    } 
    default:
      return dispatch(event.data); 
  } 
} 

export default handleEvent;