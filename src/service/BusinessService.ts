import request from '../common/request';
import config from '../common/config';

class BusinessService {

  public addPostInf = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/addPostInf`,
      'post',
      {
        method: 'app/addPostInf',
        biz_content: {
          ...params
        }
      }
    );
  }
}

export default new BusinessService();