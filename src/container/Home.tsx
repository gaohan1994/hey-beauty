import React, { Component } from 'react';
import Actions, { DispatchAbstract } from '../action/index';
// import { ChangeRouteI } from '../action/StatusController';
import { Stores } from '../store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
// import { Uploader } from '../component';
import ProductController from '../action/ProductController';
import { getProductTypeList, getProductInfos, getSearchProducts } from '../store/product';
import { Tabs, Card, Skeleton, Icon, Input, notification } from 'antd';
import config from '../common/config';
import history from '../history';
import styles from './style/post.less';
import classnames from 'classnames';
import { ProductsCart } from '../component/Cartbar';
import invariant from 'invariant';

const { Search } = Input;

/**
 * @param {CURRENTPAGE} 当前页
 * @param {PAGESIZE} 每页数量
 */
export let CURRENTPAGE: number = 1;

const { TabPane } = Tabs;

interface HomeProps {
  dispatch: Dispatch<any>;
  productTypeList: any[];
  productInfos: any[];
  searchProducts: any[];
}

interface HomeState { }

class Home extends Component<HomeProps, HomeState> {

  public onSearch = (value: string) => {
    console.log('value: ', value);
    const payload = { product_name: value };
    ProductController.searchProducts(payload);
  }

  componentDidMount = () => {
    this.init();
  }

  public init = async () => {
    try {
      const { dispatch } = this.props;
      const payload: DispatchAbstract<any> = {
        dispatch,
        param: {}
      };

      const { success, result } = await ProductController.getProductsTypeInfos(payload);
      console.log('result: ', result);
      invariant(
        success && result[0],
        '请求接口失败'
      );
      const params = result[0].product_type_id;
      this.onTabsChangeHandle(params);
    } catch (error) {
      notification.warn({message: error.message});
    }
  }

  render() {
    return (
      <div style={{display: 'flex', alignItems: 'center', felx: 1}}>
        <div style={{width: '800px'}}>
          {this.renderTabbar()}
          {/* <Uploader /> */}
        </div>
      </div>
    );
  }

  /**
   * @param `切换tab时的回调`
   * @param {key} number 
   */
  private onTabsChangeHandle = (key: any) => {
    const { productTypeList, dispatch } = this.props;

    if (key !== 'search') {
      /**
       * @param {choiceTab} 新选中的 tab
       */
      const choiceTab = productTypeList.find((type: any) => `${type.product_type_id}` === `${key}`);
      console.log('choiceTab: ', choiceTab);

      const payload: DispatchAbstract<any> = {
        dispatch,
        param: {
          product_type_id: choiceTab.product_type_id,
          page_index: CURRENTPAGE,
          page_size: config.DEFAULT_PAGE_SIZE,
        }
      };
      ProductController.getProductsInfos(payload);
    }
  }

  private renderTabbar (): JSX.Element {
    const { productTypeList, searchProducts } = this.props;
    console.log('productTypeList: ', productTypeList);
  
    return (
      <Tabs
        defaultActiveKey="1"
        onChange={this.onTabsChangeHandle}
      >
        <TabPane tab={'搜索商品'} key="search" style={{padding: '12px'}}>
          
          <Search
            placeholder="input search text"
            onSearch={value => this.onSearch(value)}
            enterButton
            style={{marginBottom: '12px'}}
          />

          {
            searchProducts && searchProducts.length > 0 
            ? searchProducts.map((item) => {
              return (
                <Card
                  onClick={() => this.onCardClickHandle(item)}
                  key={item.product_id}
                  hoverable={true}
                  className={classnames(styles['centerm-card'])}
                  cover={<img style={{width: '250px', height: '250px'}} alt="card cover" src={item.product_logo_address} />}
                  // cover={<img src="http://ci.xiaohongshu.com/e1ac4cb4-c422-5872-b295-87cef35ec781?imageView2/2/w/1080/format/jpg"/>}
                >
                  <Skeleton loading={!(item && item.product_id)} >
                    <div className={styles['centerm-card-meta']}>
                      <h3 className={styles['centerm-card-meta-title']}>{item.product_name}</h3>
  
                      <div className={styles['centerm-card-meta-info']}>
                        <div className={styles['centerm-card-meta-item']}>
                          <Icon type="money-collect" />
                          <span className={styles['centerm-card-meta-name']}>{item.product_price}</span>
                        </div>
                        <div className={styles['centerm-card-meta-item']}>
                          <Icon type="heart" />
                          <span className={styles['centerm-card-meta-name']}>{item.product_inventory}</span>
                        </div>
                      </div>
                    </div>
                  </Skeleton>
                </Card>
              );
            }) : null
          }
        </TabPane> 
        {
          productTypeList.map((tab: any, index: number) => {
            return (
              <TabPane tab={tab.product_type_name} key={tab.product_type_id}>
                {this.renderTabContent()}
              </TabPane>
            );
          })
        }
      </Tabs>
    );
  }

  private onCardClickHandle = (item: any) => {
    history.push(`/product/${item.product_id}`);
  }

  private renderTabContent = (): JSX.Element => {
    const { productInfos } = this.props;
    return (
      <div className={styles['centerm-posts']}>
        <div className={classnames(styles['centerm-cards'])}>
        {
          productInfos && productInfos.length > 0 ? productInfos.map((item: any) => {
            return (
              <Card
                onClick={() => this.onCardClickHandle(item)}
                key={item.product_id}
                hoverable={true}
                className={classnames(styles['centerm-card'])}
                cover={<img style={{width: '250px', height: '250px'}} alt="card cover" src={item.product_logo_address} />}
                // cover={<img src="http://ci.xiaohongshu.com/e1ac4cb4-c422-5872-b295-87cef35ec781?imageView2/2/w/1080/format/jpg"/>}
              >
                <Skeleton loading={!(item && item.product_id)} >
                  <div className={styles['centerm-card-meta']}>
                    <h3 className={styles['centerm-card-meta-title']}>{item.product_name}</h3>

                    <div className={styles['centerm-card-meta-info']}>
                      <div className={styles['centerm-card-meta-item']}>
                        <Icon type="money-collect" />
                        <span className={styles['centerm-card-meta-name']}>{item.product_price}</span>
                      </div>
                      <div className={styles['centerm-card-meta-item']}>
                        <Icon type="heart" />
                        <span className={styles['centerm-card-meta-name']}>{item.product_inventory}</span>
                      </div>
                    </div>
                  </div>
                </Skeleton>
              </Card>
            );
          }) : (
            <div>空</div>
          )
        }
        </div>
        <ProductsCart />
      </div>
    );
  }
}

const mapStateToProps = (state: Stores) => ({
  productTypeList: getProductTypeList(state),
  productInfos: getProductInfos(state),
  searchProducts: getSearchProducts(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);