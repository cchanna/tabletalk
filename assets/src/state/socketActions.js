import { withMiddleware } from 'redux-state-tools';

export const socketActions = actions => withMiddleware("socket", actions);
export const slowSocketActions = actions => withMiddleware("slowsocket", actions);