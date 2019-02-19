import React, { Component } from 'react';
import Actions, { DispatchAbstract } from '../action/index';
import { ChangeRouteI } from '../action/StatusController';
import { Stores } from '../store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
// import { Uploader } from '../component';
import ProductController from '../action/ProductController';
import { getProductTypeList } from '../store/product';
import { Tabs } from 'antd';
import config from '../common/config';

/**
 * @param {CURRENTPAGE} 当前页
 * @param {PAGESIZE} 每页数量
 */
export let CURRENTPAGE: number = 1;

const { TabPane } = Tabs;

interface HomeProps {
  dispatch: Dispatch<any>;
  productTypeList: any[];
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

  private renderTabContent = (): JSX.Element => {
    const { } = this.props;
    return (
      <div>renderTabContent</div>
    );
  }
}

const mapStateToProps = (state: Stores) => ({
  productTypeList: getProductTypeList(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);