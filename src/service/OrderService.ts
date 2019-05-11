import request from '../common/request';
import config from '../common/config';

class OrderService {

  public getOrderDetailInf = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/getOrderDetailInf`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

  public sendOrder = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/sendOrder`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

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

  public orderList = async (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/orderList`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }
}

export default new OrderService();