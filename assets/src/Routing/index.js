import { fromRouting, forRouting } from './state';
import route from './routeNext';
export { reducer, name } from './state';
export { goTo, goBack, replace} from './actionCreators';

const { getPath } = fromRouting;
const setPath = forRouting.route;
export { getPath, route, setPath };