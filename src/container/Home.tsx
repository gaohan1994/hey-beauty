import React, { Component } from 'react';
import Actions, { DispatchAbstract } from '../action/index';
import { ChangeRouteI } from '../action/StatusController';
import { Stores } from '../store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
// import { Uploader } from '../component';
import ProductController from '../action/ProductController';
import { getProductTypeList, getProductInfos } from '../store/product';
import { Tabs, Card, Skeleton, Icon } from 'antd';
import config from '../common/config';
import history from '../history';
import styles from './style/post.less';
import classnames from 'classnames';
import { ProductsCart } from '../component/Cartbar';

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
}

interface HomeState { }

class Home extends Component<HomeProps, HomeState> {

  public onMenuClickHandle = (menu: any) => {
    const payload: DispatchAbstract<ChangeRouteI> = {
      dispatch: this.props.dispatch,
      param: { route: menu.key }
    };
    console.log('payload: ', payload);
  }

  componentDidMount = () => {
    const { dispatch } = this.props;
    const payload: DispatchAbstract<any> = {
      dispatch,
      param: {}
    };

    ProductController.getProductsTypeInfos(payload);
  }

  render() {
    return (
      <div>
        {this.renderTabbar()}
        {/* <Uploader /> */}
      </div>
    );
  }

  /**
   * @param `切换tab时的回调`
   * @param {key} number 
   */
  private onTabsChangeHandle = (key: any) => {
    const { productTypeList, dispatch } = this.props;
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

  private renderTabbar (): JSX.Element {
    const { productTypeList } = this.props;
    console.log('productTypeList: ', productTypeList);
  
    return (
      <Tabs
        defaultActiveKey="1"
        onChange={this.onTabsChangeHandle}
      >
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
                // cover={<img alt="card cover" src={item.product_logo_address} />}
                cover={<img src="http://ci.xiaohongshu.com/e1ac4cb4-c422-5872-b295-87cef35ec781?imageView2/2/w/1080/format/jpg"/>}
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
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);