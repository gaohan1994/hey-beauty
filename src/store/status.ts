import {
  CHANGE_ROUTE,
} from '../constants';
import { Stores } from './index';

import Actions from '../action';

export type Status = {
  showLogin: boolean;
  loading: boolean;
  currentRoute: string;
};

export const initState = {
  showLogin: false,
  loading: false,
  currentRoute: 'home',
};

/**
 * status 仓库
 *
 * @export
 * @param {Status} [state=initState]
 * @param {*} action
 * @returns {Status}
 */
export default function status (state: Status = initState,  action: Actions): Status {
  switch (action.type) {
    case CHANGE_ROUTE:
      const { payload: { currentRoute } } = action;
      return {
        ...state,
        currentRoute,
      };

    default: return state;
  }
}

export const getCurrentRoute = (state: Stores) => state.status.currentRoute;