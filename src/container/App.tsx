/**
 * created by Ghan 9.13
 * 
 * 首页
 * @todo 展示各个模块的入口
 */
import * as React from 'react';
import styles from './style/app.less';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { mergeProps } from '../common/config';
import { Stores } from '../store/index';
import classnames from 'classnames';

interface AppProps {
  dispatch?: Dispatch;
}
interface AppState {}

class App extends React.Component<AppProps, AppState> {

  public render() {
    return (
      <div className={styles.container}>
        <div className={classnames(styles['app-prefix'])}>
          <div className={classnames(styles['app-prefix-left'])}>
            <span className={styles['app-prefix-left-title']} >HEY-BUAUTY</span>
            <span className={styles['app-prefix-left-title']} >找到你想要的生活</span>
            <img className={styles['app-prefix-left-img']} src="//ci.xiaohongshu.com/e7088961-073f-4699-8b9a-c4bf8c2abd19@r_640w_640h_ss1.jpg" />
          </div>
          <div className={classnames(styles['app-prefix-right'])}>
            <img className={styles['app-prefix-right-img']} src="//ci.xiaohongshu.com/faa6e72f-f7b3-4d0c-9dbe-ffc5ae87df2f" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Stores) => ({
  
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);
