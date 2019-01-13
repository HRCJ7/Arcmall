// @flow
import LoginScreen from '../modules/login/screens/LoginScreen';
import MainTabNavigator from './mainTab/MainTabNavigation';
import ProductListScreen from '../modules/product/screens/productList/ProductListScreen';
import ProductDetailScreen from '../modules/product/screens/productDetail/ProductDetailScreen';


export const ROOT_NAV_LOGIN = 'Login';
export const ROOT_NAV_MAIN_TAB = 'MainTab';
export const ROOT_NAV_ITEM_LIST = 'ItemList';
export const ROOT_NAV_ITEM_DETAILS = 'ItemDetails';

export const rootRoutes = {
  [ROOT_NAV_MAIN_TAB]: {
    screen: MainTabNavigator,
    path: `/${ROOT_NAV_MAIN_TAB}`,
  },
  [ROOT_NAV_ITEM_LIST]: {
    screen: ProductListScreen,
    path: `/${ROOT_NAV_ITEM_LIST}`,
  },
  [ROOT_NAV_ITEM_DETAILS]: {
    screen: ProductDetailScreen,
    path: `/${ROOT_NAV_ITEM_DETAILS}`,
  },
  [ROOT_NAV_LOGIN]: {
    screen: LoginScreen,
    path: `/${ROOT_NAV_LOGIN}`,
  },
};
