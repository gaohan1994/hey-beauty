import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import styles from './index.less';
import classnames from 'classnames';
import { connect, Dispatch } from 'react-redux';
import { Stores } from '../store/index';
import { getCurrentRoute } from '../store/status';
import Actions from '../action/index';
import StatusController, { ChangeRouteI } from 'src/action/StatusController';
import { DispatchAbstract } from '../action/index';
import { getUserinfo } from '../store/user';

const { Header, Content } = Layout;

const { Item } = Menu;

interface BasicLayoutProps {
  currentRoute: string;
  dispatch: Dispatch<Actions>;
  userinfo: any;
}

interface BasicLayoutState {

}

class BasicLayout extends Component<BasicLayoutProps, BasicLayoutState> {

  public onMenuClickHandle = (menu: any) => {
    const payload: DispatchAbstract<ChangeRouteI> = {
      dispatch: this.props.dispatch,
      param: { route: menu.key !== 'app' ? menu.key : '' }
    };
    StatusController.changeRoute(payload);
  }

  render() {
    return (
      <Layout>
        <Header className={classnames(styles.layoutHeader)} >
          {/* {this.renderTitle()} */}
          {this.renderMenu()}
        </Header>
        <Content style={{backgroundColor: '#ffffff'}} >{this.props.children}</Content>
        {/* <Footer>Footer</Footer> */}
      </Layout>
    );
  }

  private renderMenu = () => {

    const { currentRoute, userinfo } = this.props;

    const menus: any[] = [
      {
        key: 'app',
        title: '首页',
      },
      {
        key: 'posts',
        title: '精彩帖子'
      },
      {
        key: 'home',
        title: '精选商城',
      },
      {
        key: 'list',
        title: '我的订单',
      },
      {
        key: 'collects',
        title: '我的收藏',
      },
    ];

    {
      if (userinfo.user_id) {
        menus.push({
          key: 'update',
          title: '上传帖子'
        });
      }
    }

    return (
      <Menu
        mode="horizontal"
        selectedKeys={[currentRoute]}
        onClick={this.onMenuClickHandle}
      >
        {
          menus.map((menu: any) => {
            return (
              <Item 
                key={menu.key} 
                className={classnames(styles.menu, styles.mr)}
              > 
                {menu.title}
              </Item>
            );
          })
        }
      </Menu>
    );
  }
}

const mapStateToProps = (state: Stores) => ({
  currentRoute: getCurrentRoute(state),
  userinfo: getUserinfo(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);