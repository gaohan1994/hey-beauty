import {
  CHANGE_LOADING,
} from '../constants';

export interface AbstractInterface {
  type: 
    CHANGE_LOADING;

  payload: any;
}

type Actions = AbstractInterface;

export default Actions;