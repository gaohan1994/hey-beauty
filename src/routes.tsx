/**
 * created by Ghan 9.3
 * 
 * @todo 路由组件且成功配置过渡动画 
 */

import * as React from 'react';
import { Route, Router, RouteComponentProps } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { connect } from 'react-redux';
import config from './common/config';
import DocumentTitle from 'react-document-title';
import history from './history';
import BasicLayout from './component/BasicLayout';
import { Stores as ReducerStores } from './store/index';
import styles from './global.less';

/**
 * ------ routes ------
 */
import App from './container/App';
import NotFound from './container/exception/NotFound';

import Home from './container/Home';
import About from './container/About';
import Product from './container/Product';
import User from './container/User';
import Post from './container/Post';
import Posts from './container/Posts';
import Sign from './container/Sign';
import Register from './container/Register';

import { ProductsCart } from './component/Cartbar';
import Update from './container/Update';

/**
 * @param title -- 网页 title
 *
 * @export
 * @interface DocumentTitleProps
 */
export interface DocumentTitleProps {
  
}

const CommonComponent = () => {
  return (
    <div>
      <ProductsCart />
    </div>
  );
};

export function renderRouteLayout (Component: any, route: string, rest?: any): React.ReactNode {
  return (
    <BasicLayout>
      <CommonComponent />
      <Component {...rest} />
    </BasicLayout>
  );
}

/**
 * @todo 路由组件 加入路由过渡动画
 * 
 * 坑1.需要自己写 index.d.ts -- (已解决) react-router-transition.d.ts
 * 
 * 坑2.(已解决)
 * 如果没有设置 position: absolute 的时候
 * 在上一个组件没有完全隐去，下一个组件没有完全进入之前会同时显示两个组件 顺序排列
 * 设置了可能会造成布局问题
 * 
 * ------ 解决方案 ------
 * 在 AnimatedSwitch 提供的钩子函数中在ENTER LEAVE ACTIVE中设置不同的标记
 * 根据标记判断是否进入并且动态修改 position
 * 
 * @param {Login} 组件采用redux的方式
 *
 * @class RouterConfig
 * @extends {React.StateLessComponent<DocumentTitleProps>}
 */
const RouterConfig = ({ }: DocumentTitleProps) => {
  return (
    <DocumentTitle title={config.DEFAULT_DOCUMENT_TITLE}>
      <Router history={history}>
        <AnimatedSwitch
          className={styles.switch}
          atEnter={{ opacity: 0, foo: 0 }}
          atLeave={{ opacity: 0, foo: 2 }}
          atActive={{ opacity: 1, foo: 1 }}
          mapStyles={(styles: any) => {
            return {
              position: (styles.foo <= 1) ? '' : 'absolute',
              width: '100%',
              height: '100%',
              opacity: styles.opacity
            };
          }}
        >   
          <Route path="/" exact={true} render={() => renderRouteLayout(App, '/')} />
          <Route path="/home" render={() => renderRouteLayout(Home, '/home')} /> 
          <Route path="/about" render={() => renderRouteLayout(About, '/about')} />
          <Route path="/product/:id" render={(props: RouteComponentProps<any>) => renderRouteLayout(Product, '/product/:id', props)} />
          <Route path="/user/:id" render={(props: RouteComponentProps<any>) => renderRouteLayout(User, '/user/:id', props)} />
          <Route path="/posts" render={(props: RouteComponentProps<any>) => renderRouteLayout(Posts, '/posts', props)} />
          <Route path="/post/:id" render={(props: RouteComponentProps<any>) => renderRouteLayout(Post, '/post/:id', props)} />
          <Route path="/update" render={(props: RouteComponentProps<any>) => renderRouteLayout(Update, '/update', props)} />
          <Route path="/sign" component={Sign} />
          <Route path="/register" component={Register} />
          <Route component={NotFound}/>
        </AnimatedSwitch>
      </Router>
    </DocumentTitle>
  );
};

const mapStateToProps = (state: ReducerStores) => ({
  
});

export default connect(mapStateToProps)(RouterConfig);