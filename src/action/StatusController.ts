import { DispatchAbstract } from './index';
import { CHANGE_ROUTE } from '../constants';
import history from '../history';

export interface ChangeRouteI {
  route: string;
}

class StatusController {

  public changeRoute = (params: DispatchAbstract<ChangeRouteI>) => {
    const { dispatch, param } = params;
    
    const { route } = param;

    dispatch({
      type: CHANGE_ROUTE,
      payload: { currentRoute: route }
    });

    history.push(`/${route}`);
  }
}

export default new StatusController();