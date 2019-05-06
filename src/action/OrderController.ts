import CartController from 'src/action/CartController';
import { DispatchAbstract } from './index';
import OrderService from 'src/service/OrderService';

class OrderController {

  public sendOrder = async (params: DispatchAbstract<any>): Promise<any> => {
    CartController.emptyCart(params);
    return { success: true, result: {} };
  }

  public orderList = async (params: any) => {
    const { code, biz_content, msg } = await OrderService.orderList(params);

    if (code === '10000') {
      return { success: true, result: biz_content };
    } else {
      return { success: false, result: msg };
    }
  }
}

export default new OrderController();