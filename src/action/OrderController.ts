import CartController from 'src/action/CartController';
import { DispatchAbstract } from './index';

class OrderController {

  public sendOrder = async (params: DispatchAbstract<any>): Promise<any> => {
    CartController.emptyCart(params);
    return { success: true, result: {} };
  }
}

export default new OrderController();