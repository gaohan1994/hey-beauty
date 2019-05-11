import React, { Component, Dispatch } from 'react';
import OrderController from 'src/action/OrderController';
import { connect } from 'react-redux';
import { Stores } from '../../store/index';
import { List as AntdList } from 'antd';
import { getOrderDetail } from '../../store/order';
import styles from './style.less';
import { renderStatus } from './List';

class Order extends Component<any, any> {

  componentDidMount() {
    this.init();
  }

  public init = () => {
    const { match: { params: { id } } } = this.props;

    const payload = {
      order_id: id
    };

    OrderController.getOrderDetailInf(payload);
  }

  render() {
    const { orderDetail } = this.props;
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '12px'}}>
        <div style={{maxWidth: '800px', display: 'flex', flexDirection: 'column'}}>
          <div className={styles.detail}>
            <span>{`订单号：${orderDetail.order_id}`}</span>
            <span>{`收货地址：${orderDetail.recive_address}`}</span>
            <span>{`电话：${orderDetail.recive_mobile}`}</span>
            <span>{`收货人：${orderDetail.recive_name}`}</span>
            <span>{`订单状态：${renderStatus(orderDetail.status)}`}</span>
            <span>{`总计：${orderDetail.total}`}</span>
          </div>

          <div>
            <AntdList
              itemLayout="vertical"
              size="large"
              dataSource={orderDetail.order_detail || []}
              renderItem={(item: any) => (
                <AntdList.Item
                  key={item.title}
                  extra={<img width={200} alt="logo" src={`${item.product_logo_address}`} />}
                >
                  <AntdList.Item.Meta
                    title={<a href={item.href}>{`${item.product_name}`}</a>}
                    description={`数量：${item.product_num}`}
                  />
                </AntdList.Item>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state: Stores, ownProps: any) => {

  const orderId = ownProps.match.params.id || '';
  return {
    orderDetail: getOrderDetail(state, orderId) || {},
  };
};

const mapDispatch = (dispatch: Dispatch<any>) => ({
  dispatch
});

export default connect(mapState, mapDispatch)(Order);