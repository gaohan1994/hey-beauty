import ProductService from '../service/ProductService';
import { DispatchAbstract } from './index';
import { Unpack } from '../common/request';
import { 
  RECEIVE_PRODUCT_LIST,
  RECEIVE_PRODUCT_INFOS,
  RECEIVE_CURRENT_PRODUCT,
} from '../constants';

class ProductController {
  
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