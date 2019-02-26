import {
  UPDATE_CART
} from '../constants';
import { Stores } from './index';
import Actions from '../action/index';

export type Cart = {
  list: any[];
};

export const initState = {
  list: []
};

export default function cart ( state: Cart = initState,  action: Actions ): Cart {
  switch (action.type) {
    case UPDATE_CART:
      const { payload: { list } } = action;
      return {
        ...state,
        list,
      };
    default: return state;
  }
}

export const GetCartList = (state: Stores) => state.cart.list;

export const GetCartPrice = (list: any[]) => {
  let money: number = 0;
  list.forEach((item) => {
    money += item.number * item.product_price;
  });
  return money;
};

export const GetCurrentCartProduct = (state: Stores, prodcut_id: string) => {
  const list = GetCartList(state);
  if (list && list.length > 0) {
    const index = list.findIndex((p: any) => p.product_id === prodcut_id);

    if (index !== -1) {
      return list[index];
    } else {
      return {};
    }
  } else {
    return {};
  }
};