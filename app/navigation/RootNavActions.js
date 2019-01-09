// @flow
import {
  ROOT_NAV_MAIN_TAB
} from './RootRoutes';
import {RootStackNavigation, AppContainer} from './RootNavigation';

export const navigateToMainTabScreen = (navParams: any) => {
  return AppContainer
  .router
  .getActionForPathAndParams(`/${ROOT_NAV_MAIN_TAB}`, navParams);
};
