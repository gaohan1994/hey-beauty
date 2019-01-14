/**
 * created by Ghan 9.13
 * 
 * 首页
 * @todo 展示各个模块的入口
 */
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
// import AppHeader from 'src/component/Header/AppHeader';

interface AppProps {
  dispatch?: Dispatch;
}
interface AppState {}

class App extends React.Component<AppProps, AppState> {

  public render() {
    return (
      <div className={styles.container}>
        beauty
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
