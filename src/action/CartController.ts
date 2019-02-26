import { Dispatch } from 'redux';
import { UPDATE_CART } from '../constants';
import { Stores } from '../store/index';
import { GetCartList } from '../store/cart';
import Dialog from '../component/Dialog';
import { merge } from 'lodash';
import numeral from 'numeral';
import { DispatchAbstract } from './index';

interface CheckProductAlreadyCartReturn { 
  inCart: boolean;
  index: number;
}

export const CheckProductAlreadyCart = (product: any, list: any[]): CheckProductAlreadyCartReturn => {

  const index = list.findIndex(p => p.product_id === product.product_id);

  if (index === -1) {
    return { inCart: false, index };
  } else {
    return { inCart: true, index };
  }
};

export const CheckProductInventory = (product: any) => {
  if (
    product.product_inventory &&
    numeral(product.product_inventory).value() === 0
  ) {
    
    return { success: false };
  } else {
    return { success: true };
  }
};

class CartController {

  public addProduct = (params: any) => async (dispatch: Dispatch, state: () => Stores) => {
    const { product } = params;
    console.log('product: ', product);
    const store = await state();
    let list = GetCartList(store);
    const { inCart, index } = CheckProductAlreadyCart(product, list);

    const { success: inventorySuccess } = CheckProductInventory(product);

    if (inventorySuccess === false) {
      Dialog.showToast('该商品已售罄');
      return { success: false };
    }
    
    if (inCart === false) {
      const cartItem = {
        ...product,
        key: new Date().getTime(),
        number: 1,
      };
      list.push(cartItem);
    } else if (numeral(product.is_limited).value() === 1) {
      /**
       * @param {*} `判断是否是限购商品如果限购且数量超过限购数量那么无法加入购物车`
       * 
       * cart: 0, limited: 1 true
       * cart: 1, limited: 1 false
       */
      const productNumber = list[index].number;
      const limitedNumber = numeral(product.limited_num).value();
      console.log('limitedNumber: ', limitedNumber);
      if (productNumber >= limitedNumber) {
        Dialog.showToast(`${list[index].product_name} 限购 ${limitedNumber} 件，您已超过限购数量`);
        return { success: false };
      }
    } else {
      console.log('else');
      list[index] = {
        ...list[index],
        number: list[index].number + 1,
        key: new Date().getTime(),
      };
    }

    await dispatch({
      type: UPDATE_CART,
      payload: { list: merge([], list, []) },
    });

    return { success: true };
  }
  
  public reduceProduct = (params: any) => async (dispatch: Dispatch, state: () => Stores) => {
    console.log('params: ', params);
    const { product } = params;
    const store = await state();
    const list = GetCartList(store);
    const { inCart, index } = CheckProductAlreadyCart(product, list);
    console.log('inCart: ', inCart);
    console.log('index: ', index);

    if (inCart === true) {
      const number = list[index].number;
      if (number === 1) {
        list.splice(index, 1);
      } else {
        list[index] = {
          ...list[index],
          number: list[index].number - 1,
          key: new Date().getTime(),
        };
      }

      await dispatch({
        type: UPDATE_CART,
        payload: { list: merge([], list, []) },
      });

      return { success: true };
    } else {
      Dialog.showToast('删除出错了！');
      return { success: false };
    }
  }

  public emptyCart = async (params: DispatchAbstract<any>): Promise<any> => {
    const { dispatch } = params;
    const list: any[] = [];
    dispatch({
      type: UPDATE_CART,
      payload: { list }
    });
  }
}

export default new CartController();