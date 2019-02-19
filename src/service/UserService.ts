import request from '../common/request';
import config from '../common/config';

class UserService {
  public listReciveAddress = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/listReciveAddress`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

  public addReciveAddress = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/addReciveAddress`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

  public updateReciveAddress = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/updateReciveAddress`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

  public removeReciveAddress = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/removeReciveAddress`,
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

  public editUserInfo = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/editUserInfo`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }

  public resetPwd = (params: any) => {
    return request(
      `${config.FETCH_ENTRY}/app/resetPwd`,
      'post',
      {
        biz_content: {
          ...params
        }
      }
    );
  }
}

export default new UserService();