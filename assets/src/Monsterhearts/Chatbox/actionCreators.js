import { slowServerActionCreator } from 'Monsterhearts/serverActionCreator';
import actionCreator from 'utils/actionCreator';

import {
  MONSTERHEARTS_CHAT,
  MONSTERHEARTS_CHATBOX_SET_COLLAPSED
} from 'common/actions';

export const setChatboxCollapsed = actionCreator(MONSTERHEARTS_CHATBOX_SET_COLLAPSED, "collapsed");
export const chat = slowServerActionCreator(MONSTERHEARTS_CHAT, "text");
