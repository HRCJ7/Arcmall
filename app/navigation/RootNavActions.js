// @flow
import {
  ROOT_NAV_MAIN_TAB,
  ROOT_NAV_SELECT_ROLE,
  ROOT_NAV_SIGN_UP_AS_A_BUYER,
  ROOT_NAV_SIGN_UP_AS_A_SELLER
} from './RootRoutes';
import {RootStackNavigation, AppContainer} from './RootNavigation';

export const navigateToMainTabScreen = (navParams: any) => {
  return AppContainer
  .router
  .getActionForPathAndParams(`/${ROOT_NAV_MAIN_TAB}`, navParams);
};
