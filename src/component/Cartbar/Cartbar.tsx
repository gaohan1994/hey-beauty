import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Stores } from '../../store/index';
import { Button } from 'antd';
import { mergeProps } from '../../common/config';
import styles from './index.less';
import CartController from 'src/action/CartController';
import { getCurrentProduct } from '../../store/product';
import { GetCurrentCartProduct } from '../../store/cart';

interface CartbarProps {
  list: any[];
  currentAuth: any;
  currentProductAuth: any;
  dispatch: Dispatch;
  currentProduct: any;
  addProduct: (params?: any) => any;
  reduceProduct: (params?: any) => any;
}

export type CartbarPropsPartialProps = Partial<CartbarProps>;

interface CartbarState {

}

class Cartbar extends Component<CartbarPropsPartialProps, CartbarState> {

  public onReduceClickHandle = () => {
    const { dispatch, reduceProduct, currentProduct } = this.props;

    if (dispatch && reduceProduct && currentProduct) {
      reduceProduct({ product: currentProduct });
    }
  }

  public onAddClickHandle = () => {
    const { dispatch, addProduct, currentProduct } = this.props;

    if (dispatch && addProduct && currentProduct) {
      addProduct({ product: currentProduct });
    }
  }

  render() {
    const { currentProductAuth } = this.props;
    console.log('this.props', this.props);
    console.log('currentProductAuth: ', currentProductAuth);
    return (
      <div className={styles.cartbar}>
        {
          currentProductAuth && currentProductAuth.product_id ? (
            <div>
              <Button shape="circle" icon="minus" type="primary" onClick={this.onReduceClickHandle} />
              <span style={{padding: '0 20px'}}>{currentProductAuth.number}</span>
              <Button shape="circle" icon="plus" type="primary" onClick={this.onAddClickHandle} />
            </div>
          ) : (
            <Button 
              type="primary"
              shape="round"
              icon="plus"
              size="default"
              onClick={this.onAddClickHandle}
            >
              加入购物车
            </Button>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state: Stores) => {
  const currentProduct = getCurrentProduct(state);
  return {
    // list: GetCartList(state),
    // currentAuth: SignController.checkLocalLoginAuth(state),
    currentProduct,
    currentProductAuth: 
      currentProduct &&
      currentProduct.product_id 
      ? GetCurrentCartProduct(state, currentProduct.product_id) 
      : {},
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch,
  addProduct: bindActionCreators(CartController.addProduct, dispatch),
  reduceProduct: bindActionCreators(CartController.reduceProduct, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Cartbar);