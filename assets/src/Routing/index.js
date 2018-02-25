import { fromRouting, forRouting } from './state';
import Route from './RouteContainer'
import Link from './Link';
import route from './route';
export { reducer, name } from './state';
export { goTo, goBack, replace} from './actionCreators';

const { getPath } = fromRouting;
const setPath = forRouting.route;
export { getPath, setPath, Route, route, Link };