import { combineReducers } from 'redux';
import { reducer as gamesReducer, name as gamesName } from 'Games';
import { reducer as authReducer, name as authName } from 'Auth';
import { reducer as routingReducer, name as routingName } from 'Routing';
import { reducer as statusReducer, name as statusName} from 'Status';
import { reducer as monsterheartsReducer, name as monsterheartsName} from 'Monsterhearts';

export default combineReducers({
  [authName]: authReducer,
  [routingName]: routingReducer, 
  [gamesName]: gamesReducer, 
  [statusName]: statusReducer, 
  [monsterheartsName]: monsterheartsReducer
});
