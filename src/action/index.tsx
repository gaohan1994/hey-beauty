import {
  CHANGE_LOADING,
  CHANGE_ROUTE,
  RECEIVE_PRODUCT_LIST,
  RECEIVE_PRODUCT_INFOS,
  RECEIVE_CURRENT_PRODUCT,
  UPDATE_CART,
  RECEIVE_POST_LIST,
  RECEIVE_USERINFO,
  RECEIVE_POST_DETAIL,
  RECEIVE_RECOMMEND_POST
} from '../constants';
import { Dispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

export interface AbstractInterface {
  type: 
    CHANGE_LOADING |
    CHANGE_ROUTE |
    RECEIVE_PRODUCT_LIST |
    RECEIVE_PRODUCT_INFOS |
    RECEIVE_CURRENT_PRODUCT |
    UPDATE_CART |
    RECEIVE_POST_LIST |
    RECEIVE_USERINFO |
    RECEIVE_POST_DETAIL |
    RECEIVE_RECOMMEND_POST;

  payload: any;
}

type Actions = AbstractInterface;

export default Actions;

export type MyDispatch = ThunkDispatch<any, any, any> | Dispatch<Actions>;

/**
 * @param `抽象参数接口`
 */

export interface AbstractParams<T extends Object> {
   param: T;
}

export interface DispatchAbstract<T extends Object = {}> {
  param: T;
  dispatch: MyDispatch;
}

export interface  DispatchAbstract<T extends Object = {}, P extends Object = {}> {
  param: T;
  option?: P;
  dispatch: MyDispatch;
}

export interface AbstractInterfaceParam<T extends Object> {
  result?: T;
  success: boolean;
}

export interface ComponentUserAbstractProps {

}
