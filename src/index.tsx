/**
 * build by Ghan 9.3
 * 
 * @todo 主渲染文件
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { configureStore } from './store';
import { Provider } from 'react-redux';
import RouterConfig from './routes';
import SignController from './action/SignController';

export const store = configureStore();

SignController.updateUserinfo();

ReactDOM.render(
  <Provider store={store}>
    <RouterConfig />
  </Provider>,
  document.getElementById('root') as HTMLElement
);