import React, { Component } from 'react';
import OrderController from '../../action/OrderController';
import SignController from '../../action/SignController';
import invariant from 'invariant';
import history from '../../history';
import { message } from 'antd';

type Props = {

};
type State = {

};

/**
 * @param {CURRENTPAGE} 当前页
 * @param {PAGESIZE} 每页数量
 */
export let CURRENTPAGE: number = 1;
export const PAGESIZE: number = 20;

class List extends Component<Props, State> {

  componentDidMount() {

    this.init();
  }

  public init = async () => {

    SignController.loginAuth().then(({login, userinfo}) => {

      try {
        invariant(
          login,
          `请先登录`
        );

        const params: any = {
          page_index: CURRENTPAGE,
          page_size: PAGESIZE,
          user_id: userinfo.user_id
        };
        OrderController.orderList(params);
      } catch (error) {
        message.info(error.message);
        if (error.message === '请先登录') {
          history.push('/sign');
        }
      }
    });
  }

  render() {
    return (
      <div>
        List
      </div>
    );
  }
}

export default List;