import mapObject from 'utils/mapObject';
import { withBang } from 'utils/stateTools';


export const socketActions = actions => withBang("socket", actions);
export const slowSocketActions = actions => withBang("slowsocket", actions);