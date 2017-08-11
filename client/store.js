import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import oilSamplesApp from '../imports/reducers';

const logger = createLogger();
const middleware = [ReduxThunk, logger];

const store = createStore(oilSamplesApp, {}, applyMiddleware(...middleware));
export default store;