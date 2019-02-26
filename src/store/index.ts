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
import post, { Post, initState as PostState } from './post';
import cart, { Cart, initState as CartState } from './cart';
import user, { User, initState as UserState } from './user';

export interface Stores {
  status: Status;
  product: Product;
  post: Post;
  cart: Cart;
  user: User;
}

export const StoreState = {
  status: statusState,
  product: ProductState,
  post: PostState,
  cart: CartState,
  user: UserState,
};

export default combineReducers({
  status,
  product,
  post,
  cart,
  user,
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
