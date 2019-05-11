import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Stores } from '../../store/index';
import { CartbarPropsPartialProps } from './Cartbar';
import { mergeProps } from '../../common/config';
import { GetCartList, GetCartPrice } from '../../store/cart';
import { Button, Badge, Statistic, Drawer, List, Modal } from 'antd';
import styles from './index.less';
import CartController from '../../action/CartController';
import numeral from 'numeral';
import OrderController from '../../action/OrderController';
import Dialog from '../Dialog';
import { DispatchAbstract } from '../../action/index';
import SignController from '../../action/SignController';
import history from '../../history';

const { Item } = List;
const { Meta } = Item;

export const GetStandCartToOrderList = (list: any[]): any[] => {
  
  const standList = list.map((item: any) => {
    return {
      product_id: item.product_id,
      product_num: item.number,
      single_price: item.product_price,
      product_remark: '',
      product_name: item.product_name,
    };
  });

  return standList;
};

interface ProductsCartProps extends CartbarPropsPartialProps {
  list: any[];
  addProduct: (params: any) => any;
  reduceProduct: (params: any) => any;
}

export type PartialProductsCartProps = Partial<ProductsCartProps>;

interface ProductsCartState {
  showCartDetailList: boolean;
  confirmModal: boolean;
}

type State = Readonly<ProductsCartState>;

class ProductsCart extends Component<PartialProductsCartProps, State> {

  state: State = {
    showCartDetailList: false,
    confirmModal: false
  };

  public toogleCartDetail = () => {
    this.setState({ showCartDetailList: !this.state.showCartDetailList });
  }

  public hideCartDetail = () => {
    this.setState({ showCartDetailList: false });
  }

  public onReduceClickHandle = (product: any) => {
    const { reduceProduct } = this.props;
    
    if (reduceProduct) {
      reduceProduct({ product });
    }
  }

  public onAddClickHandle = (product: any) => {
    const { addProduct } = this.props;
    
    if (addProduct) {
      addProduct({ product });
    }
  }

  public showConfirm = () => {
    this.setState({ confirmModal: true });
  }

  public hideConfirm = () => {
    this.setState({ confirmModal: false });
  }

  public sendOrder = async () => {
    const { dispatch, list } = this.props;

    SignController.loginAuth().then(async ({login, userinfo}) => {

      if (login === true) {
        if (dispatch && list) {
          const payload: DispatchAbstract<any> = {
            dispatch,
            param: {
              order_detail: GetStandCartToOrderList(list),
              user_id: userinfo.user_id,
              address_id: '1'
            }
          };
          const { success } = await OrderController.sendOrder(payload);
      
          if (success === true) {
            Dialog.showToast('下单成功');
            this.successOrderCallback();
          }
        }
      } else {
        history.push('/sign');
      }
    });
  }

  public successOrderCallback = () => {
    /**
     * @param `1.关闭confirm modal`
     * @param `2.跳转到order`
     */
    this.hideConfirm();
  }

  render() {
    const { list } = this.props;

    const 
      initNumber: number = 0,
      initPrice: number = 0;
    let listNumber: number = initNumber;
    let totalPrice: number = initPrice;

    {
      listNumber = list && list.length > 0 
        ? list.reduce((accumulator: number, currentValue: any) => accumulator + currentValue.number, initNumber)
        : 0;

      totalPrice = list && list.length > 0
        ? GetCartPrice(list)
        : 0;
    }
    
    return (
      <div className={styles.cartControl} >
        {this.renderSendOrder()}
        {this.renderCartDetail()}
        <Badge count={listNumber} >
          <Button
            style={{marginLeft: '15px'}}
            type="primary"
            icon="shopping-cart"
            shape="circle"
            onClick={() => this.toogleCartDetail()}
          />
        </Badge>

        <Statistic
          style={{marginLeft: '15px'}}
          value={totalPrice}
          valueStyle={{ color: '#cf1322' }}
          suffix="￥"
        />
        {
          listNumber > 0 && totalPrice > 0 ? (
            <Button
              style={{
                position: 'absolute',
                right: '15px'
              }}
              type="primary"
              icon="money-collect"
              shape="round"
              size="small"
              onClick={this.showConfirm}
            >
              去结算
            </Button>
          ) : null
        }
      </div>
    );
  }

  private renderSendOrder = () => {
    const { confirmModal } = this.state;
    const { list } = this.props;

    let totalPrice: number = 0;
    {
      list && list.length > 0 
        ? totalPrice = GetCartPrice(list)
        : totalPrice = 0;
    }
    return (
      <div>
        <Modal
          title="下单确认"
          visible={confirmModal}
          onCancel={this.hideConfirm}
          cancelText="取消"
          okText={`${totalPrice}元`}
          onOk={this.sendOrder}
        >
          {
            list && list.length > 0 ? list.map((item: any) => {

              const itemPrice: string = numeral(item.number * item.product_price).format('0');

              return (
                <div key={item.product_id} className={styles.description} >
                  <span>{item.product_name} x {item.number}</span>
                  <Statistic
                    value={itemPrice}
                    suffix="￥"
                  />
                </div>
              );
            }) : null
          }
        </Modal>
      </div>
    );
  }

  private renderDescription = (product: any): React.ReactNode => {
    const price = numeral(
      numeral(product.number).value() * numeral(product.product_price).value()
    ).format('0');

    return (
      <div className={styles.description}>
        <div>
          <Button size="small" shape="circle" icon="minus" type="primary" onClick={() => this.onReduceClickHandle(product)} />
          <span style={{padding: '0 10px'}}>{product.number}</span>
          <Button size="small" shape="circle" icon="plus" type="primary" onClick={() => this.onAddClickHandle(product)} />
        </div>
        <div>
          <Statistic value={price} valueStyle={{fontSize: '12px'}} />
        </div>
      </div>
    );
  }

  private renderCartDetail = () => {
    const { showCartDetailList } = this.state;
    const { list } = this.props;

    return (
      <div>
        <Drawer
          title="购物车"
          placement="right"
          visible={showCartDetailList}
          onClose={this.hideCartDetail}
        >
          <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item: any) => {
              return (
                <Item>
                  <Meta
                    avatar={<img className={styles.cartItemImg} src={item.product_logo_address} />}
                    title={item.product_name}
                    description={this.renderDescription(item)}
                  />
                </Item>
              );
            }}
          />
        </Drawer> 
      </div>
    );
  }
}

const mapStateToProps = (state: Stores) => ({
  list: GetCartList(state),
  // currentAuth: SignController.checkLocalLoginAuth(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch,
  addProduct: bindActionCreators(CartController.addProduct, dispatch),
  reduceProduct: bindActionCreators(CartController.reduceProduct, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProductsCart);