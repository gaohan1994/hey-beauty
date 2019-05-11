import React, { Component } from 'react';
import OrderController from '../../action/OrderController';
import SignController from '../../action/SignController';
import invariant from 'invariant';
import history from '../../history';
import { message, List as AntdList } from 'antd';
import { connect, Dispatch } from 'react-redux';
import { Stores } from '../../store/index';
import { getOrderList } from '../../store/order';

export const renderStatus = (status: number) => {
  switch (status) {
    case 0:
      return '未发货';
    default:
      return '未知状态';
  }
};

type Props = any;

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

  public navToOrder = (order: any) => {
    history.push(`/order/${order.order_id}`);
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

    const { list } = this.props;

    return (
      <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{maxWidth: '800px'}}>
          <AntdList
            itemLayout="vertical"
            size="large"
            dataSource={list || []}
            renderItem={(item: any) => (
              <AntdList.Item
                onClick={() => this.navToOrder(item)}
                key={item.title}
                extra={<img width={200} alt="logo" src={`${item.order_detail && item.order_detail[0] && item.order_detail[0].product_logo_address}`} />}
              >
                <AntdList.Item.Meta
                  // avatar={<Avatar src={item.avatar} />}
                  title={<a href={item.href}>{`订单号： ${item.order_id}`}</a>}
                  description={`订单状态：${renderStatus(Number(item.status))}`}
                />

                {
                  item.order_detail && item.order_detail.map((item: any) => {
                    return (
                      <div key={item.product_id}>
                        {`${item.product_name} x ${item.product_num}`}
                      </div>
                    );
                  })
                }
              </AntdList.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

const mapState = (state: Stores) => ({
  list: getOrderList(state),
});

const mapDispatch = (dispatch: Dispatch<any>) => ({
  dispatch
});

export default connect(mapState, mapDispatch)(List);