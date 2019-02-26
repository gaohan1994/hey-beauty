import {
  RECEIVE_USERINFO
} from '../constants';
import { Stores } from './index';
import Actions from '../action/index';

export type User = {
  userinfo: any;
};

export const initState = {
  userinfo: {},
};

export default function user ( state: User = initState,  action: Actions ): User {
  switch (action.type) {

    case RECEIVE_USERINFO:
      const { payload: { userinfo } } = action;
      return {
        ...state,
        userinfo
      };
    
    default: return state;
  }
}

export const getUserinfo = (state: Stores) => state.user.userinfo;