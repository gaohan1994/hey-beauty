import ProductService from '../service/ProductService';
import { DispatchAbstract } from './index';
import { Unpack } from '../common/request';
import { 
  RECEIVE_PRODUCT_LIST,
  RECEIVE_PRODUCT_INFOS,
  RECEIVE_CURRENT_PRODUCT,
} from '../constants';
import { store } from '.././index';
import { RECEIVE_SEARCH_PRODUCTS } from '../constants';

class ProductController {

  public searchProducts = async (params: any) => {

    let payload = {
      ...params,
      page_index: 1,
      page_size: 200
    };
    const { code, biz_content } = await ProductService.getProductsInfos(payload);

    if (code === '10000') {
      store.dispatch({
        type: RECEIVE_SEARCH_PRODUCTS,
        payload: {
          searchProducts: biz_content.product_list
        }
      });
      return { success: true };
    } else {
      return { success: false };
    }
  }
  
  public getProductsTypeInfos = async (params: DispatchAbstract<any>): Promise<any> => {
    const { dispatch, param } = params;
    const result: any = await ProductService.getProductsTypeInfos(param);
    
    Unpack(result, async () => {
      dispatch({
        type: RECEIVE_PRODUCT_LIST,
        payload: { productTypeList: result.biz_content.product_type_list }
      });
    });
  }

  public getProductsInfos = async (params: DispatchAbstract<any>): Promise<any> => {
    const { dispatch, param } = params;
    const result = await ProductService.getProductsInfos(param);

    Unpack(result, async () => {
      dispatch({
        type: RECEIVE_PRODUCT_INFOS,
        payload: {
          page: param.page_index,
          productInfos: result.biz_content.product_list,
        }
      });
    });
  }

  public getProductDetailInf = async (params: DispatchAbstract<any>): Promise<any> => {
    const { dispatch, param } = params;

    const result = await ProductService.getProductDetailInf(param);
    console.log('result: ', result);

    Unpack(result, async () => {
      dispatch({
        type: RECEIVE_CURRENT_PRODUCT,
        payload: { currentProduct: result.biz_content }
      });
    });
  }
}

export default new ProductController();