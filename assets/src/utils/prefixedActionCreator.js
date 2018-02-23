import actionCreator from './actionCreator';

const prefixedActionCreator = (prefix, type, ...args) => actionCreator(prefix + type, ...args);

export default prefixedActionCreator;