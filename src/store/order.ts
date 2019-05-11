import { RECEIVE_ORDER_LIST, RECEIVE_ORDER_DETAIL } from '../constants';
import { Stores } from './index';
import Actions from '../action/index';

export type Order = {
  orderList: any[];
  orderDetail: any;
};

export const initState = {
  orderList: [],
  orderDetail: {},
};

export default function user ( state: Order = initState,  action: Actions ): Order {
  switch (action.type) {

    case RECEIVE_ORDER_LIST:
      const { payload: { orderList } } = action;
      return {
        ...state,
        orderList
      };
    
    case RECEIVE_ORDER_DETAIL:
      const { payload: { orderDetail } } = action;
      return {
        ...state,
        orderDetail: {
          [orderDetail.order_id]: orderDetail
        }
      };

    default: return state;
  }
}

export const getOrderList = (state: Stores) => state.order.orderList;

export const getOrderDetail = (state: Stores, order_id: any) => state.order.orderDetail[order_id];