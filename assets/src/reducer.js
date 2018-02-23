import { combineReducers } from 'redux';
import { reducer as games } from 'Games/state';
import { reducer as authReducer, name as authName } from 'Auth';
import { reducer as routingReducer, name as routingName } from 'Routing';
import status from 'Status/reducer';
import monsterhearts from 'Monsterhearts/reducer';

export default combineReducers({
  [authName]: authReducer,
  [routingName]: routingReducer, 
  games, 
  status, 
  monsterhearts
});
