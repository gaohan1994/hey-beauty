/**
 * created by Ghan 9.3
 * 
 * redux Store
 */

import { combineReducers } from 'redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './index';
import status, { Status, initState as statusState } from './status';
import product, { Product, initState as ProductState } from './product';
export interface Stores {
  status: Status;
  product: Product;
}

export const StoreState = {
  status: statusState,
  product: ProductState,
};

export default combineReducers({
  status,
  product,
});

const configureStore = () => {

  const store = process.env.NODE_ENV === 'production'
    ? createStore(
      rootReducer,
      compose(
        applyMiddleware(thunk)
      )
    )
    : createStore(
      rootReducer,
      compose(
        applyMiddleware(thunk, createLogger)
      )
    );
  return store;
};

export { configureStore };
