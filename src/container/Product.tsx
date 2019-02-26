import * as React from 'react';
import styles from './index.less';
/**
 * react-redux
 */
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { mergeProps } from '../common/config';
/**
 * interface
 */
import { Stores } from '../store/index';
import { DispatchAbstract } from '../action/index';
import { RouteComponentProps } from 'react-router';
import ProductController from '../action/ProductController';
import { getCurrentProduct } from '../store/product';
import { Card, Avatar, Statistic, Row, Col, Icon } from 'antd';
import classnames from 'classnames';
import { Cartbar } from '../component/Cartbar';

const { Meta } = Card;

interface ProductProps extends RouteComponentProps<any> {
  dispatch: Dispatch;
  currentProduct: any;
}

interface ProductState {}

class Product extends React.Component<ProductProps, ProductState> {

  componentDidMount = () => {
    const { dispatch, match: { params: { id } } } = this.props;
    const payload: DispatchAbstract<any> = {
      dispatch,
      param: { product_id: id }
    };
    console.log('payload: ', payload);

    ProductController.getProductDetailInf(payload);
  }

  public render() {
    const { currentProduct } = this.props;
    return (
      <div className={classnames(styles.pContainer, styles.pCenter)}>
        <Card
          style={{width: 500, marginTop: 20}}
          hoverable={true}
          cover={<img alt="product card cover" src={currentProduct.product_logo_address} />}
        >
          <Meta
            title={currentProduct.product_name} 
            avatar={<Avatar size="large" style={{backgroundColor: '#ffbf00', verticalAlign: 'middle'}}>X</Avatar>}
            description="description"
          />
        </Card>
        <Card style={{width: 500, marginTop: 20}}>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic 
              title="价格(CNY)" 
              value={currentProduct.product_price} 
              valueStyle={{ color: '#cf1322' }}
              prefix={<Icon type="pay-circle" />}
            />
          </Col>
          <Col span={6}>
            <Statistic 
              title="库存" 
              value={currentProduct.product_inventory} 
            />
          </Col>
          <Col span={6}>
            <Statistic 
              title="已售" 
              value={currentProduct.product_saled} 
            />
          </Col>
        </Row>
        <Cartbar />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: Stores) => ({
  currentProduct: getCurrentProduct(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Product);
