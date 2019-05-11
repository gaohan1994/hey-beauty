import CartController from 'src/action/CartController';
import { DispatchAbstract } from './index';
import OrderService from 'src/service/OrderService';
import { store } from '../index';
import { RECEIVE_ORDER_LIST, RECEIVE_ORDER_DETAIL } from '../constants';

class OrderController {

  public getOrderDetailInf = async (params: any) => {
    const { code, biz_content } = await OrderService.getOrderDetailInf(params);

    if (code === '10000') {
      store.dispatch({
        type: RECEIVE_ORDER_DETAIL,
        payload: { orderDetail: biz_content }
      });
      return { success: true };
    } else {
      return { success: false };
    }
    console.log('code: ', code);
  }

  public sendOrder = async (params: DispatchAbstract<any>): Promise<any> => {
    CartController.emptyCart(params);
    const { param } = params;
    const { code } = await OrderService.sendOrder(param);
    console.log('code: ', code);
    return { success: true, result: {} };
  }

  public orderList = async (params: any) => {
    const { code, biz_content, msg } = await OrderService.orderList(params);

    if (code === '10000') {
      store.dispatch({
        type: RECEIVE_ORDER_LIST,
        payload: { orderList: biz_content.order_list }
      });
      return { success: true, result: biz_content };
    } else {
      return { success: false, result: msg };
    }
  }
}

export default new OrderController();