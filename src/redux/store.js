import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger]; //expects an array.logger accepts infinite number of middlewares

const store = createStore(rootReducer, applyMiddleware(...middlewares)) //spreads out all the values in the [] array into this function call as individual arguments

export default store;