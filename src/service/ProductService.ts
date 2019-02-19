import request from '../common/request';
import config from '../common/config';

class ProductService {
  public getProductsTypeInfos = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/getProductsTypeInfos`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

  public getProductsInfos = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/getProductsInfos`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

  public getProductDetailInf = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/getProductDetailInf`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }
  
}

export default new ProductService();