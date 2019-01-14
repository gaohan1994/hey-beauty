import {
  CHANGE_LOADING,
  CHANGE_ROUTE,
} from '../constants';
import { Dispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

export interface AbstractInterface {
  type: 
    CHANGE_LOADING |
    CHANGE_ROUTE;

  payload: any;
}

type Actions = AbstractInterface;

export default Actions;

export type MyDispatch = ThunkDispatch<any, any, any> | Dispatch<Actions>;

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