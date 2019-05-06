import request from '../common/request';
import config from '../common/config';

class OrderService {
  public getProductsTypeInfos = (params: any) => {
    request(
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
      `${config.FETCH_ENTRY}/order/orderList`,
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