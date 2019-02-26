import request from '../common/request';
import config from '../common/config';

class SignService {

  public signUp = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/signUp`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

  public login = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/login`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }
}

export default new SignService();