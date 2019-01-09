// @flow
import LoginScreen from '../modules/login/screens/LoginScreen';
import MainTabNavigation from './mainTab/MainTabNavigation';

export const ROOT_NAV_LOGIN = 'Login';
export const ROOT_NAV_MAIN_TAB = 'MainTab';

export const rootRoutes = {
  [ROOT_NAV_LOGIN]: {
    screen: LoginScreen,
    path: `/${ROOT_NAV_LOGIN}`,
  },
  [ROOT_NAV_MAIN_TAB]: {
    screen: MainTabNavigation,
    path: `/${ROOT_NAV_MAIN_TAB}`,
  },
};
