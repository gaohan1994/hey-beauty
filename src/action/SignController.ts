import SignService from '../service/SignService';
import { Unpack } from '../common/request';
import { DispatchAbstract } from './index';
import Dialog from '../component/Dialog';
import { RECEIVE_USERINFO } from '../constants';
import history from '../history';
import { store } from '../index';
import config from '../common/config';

class SignController {

  public loginAuth = async (): Promise<any> => {
    console.log('store: ', store);
    const state = await store.getState();
    console.log('state: ', state);
    return new Promise((resolve: any, reject: any) => {

      if (state && state.user && state.user.userinfo && state.user.userinfo.user_id) {

        resolve({ login: true, userinfo: state.user.userinfo });
      } else {
        resolve({ login: false });
      }
    });
  }

  public signUp = async (params: DispatchAbstract<any>) => {
    const { param } = params;
    const payload = {
      user_id: param.username,
      passwd: param.password,
      user_name: param.nickname,
    };
    const result = await SignService.signUp(payload);

    Unpack(
      result,
      () => {
        /**
         * @param `1.toast success`
         * @param `2.login`
         * @param `3.`
         */
        console.log(result);
        Dialog.showToast('注册成功');
        const loginPayload: DispatchAbstract<any> = {
          dispatch: params.dispatch,
          param: {
            user_id: param.username,
            passwd: param.password,
          }
        };

        this.login(loginPayload);
      },
      () => {
        Dialog.showToast(`${result.msg}`);
      }
    );
  }

  public login = async (params: DispatchAbstract<any, any>) => {
    const { param, option } = params;
    console.log('param: ', param);
    const result = await SignService.login(param);
    const callback = option && option.callback;

    Unpack(
      result, 
      () => {
        Dialog.showToast('登录成功');
        this.saveUserinfo(result.biz_content);
        if (callback) {
          callback({ success: true, userinfo: result.biz_content });
        } else {
          history.push('/');
        }
      },
      () => {
        Dialog.showToast('登录失败');

        if (callback) {
          callback({ success: false, error: result });
        }
      }
    );
    console.log('result: ', result);
  }

  public saveUserinfo = async (userinfo: any) => {
    const userinfoStand = typeof userinfo === 'string' ? userinfo : JSON.stringify(userinfo);
    localStorage.setItem(config.STORAGE_USERINFO, userinfoStand);

    this.updateUserinfo();
  }

  /**
   * @todo 在 redux 中对 storage 的数据进行二次存储并且在改变 storage 数据之后调用响应函数即可
   * @param {updateUserinfo} 对应userinfo
   * @memberof Business
   */
  public updateUserinfo = async (): Promise<any> => {
    const userinfo = JSON.parse(localStorage.getItem(config.STORAGE_USERINFO) || `{}`);
    store.dispatch({
      type: RECEIVE_USERINFO,
      payload: { userinfo: userinfo || { } }
    });
    console.log('updateUserinfo !!', userinfo);
    return userinfo || {};
  }
}

export default new SignController();