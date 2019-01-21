// @flow
import LoginScreen from '../modules/login/screens/LoginScreen';
import MainTabNavigator from './mainTab/MainTabNavigation';
import ProductListScreen from '../modules/product/screens/productList/ProductListScreen';
import ProductDetailScreen from '../modules/product/screens/productDetail/ProductDetailScreen';

import SelectRoleScreen from '../modules/login/screens/SelectRoleScreen';
import SignUpAsABuyerScreen from '../modules/login/screens/SignUpAsABuyerScreen';
import SignUpAsASellerScreen from '../modules/login/screens/SignUpAsASellerScreen';
import MainTabNavigation from './mainTab/MainTabNavigation';
import CategoryTabNavigator from './categoryTab/CategoryTabNavigation';
import CategoryListScreen from '../modules/product/screens/categoryList/CategoryListScreen';
import ReviewsScreen from '../modules/product/screens/reviews/ReviewsScreen';

export const ROOT_NAV_LOGIN = 'Login';
export const ROOT_NAV_SELECT_ROLE = 'SelectRole';
export const ROOT_NAV_MAIN_TAB = 'MainTab';
export const ROOT_NAV_ITEM_LIST = 'ItemList';
export const ROOT_NAV_ITEM_DETAILS = 'ItemDetails';
export const ROOT_NAV_SIGN_UP_AS_A_BUYER = 'SignUpAsABuyerScreen';
export const ROOT_NAV_SIGN_UP_AS_A_SELLER = 'SignUpAsASellerScreen';
export const ROOT_NAV_ALL_CATEGORIES = 'AllCategories';
export const ROOT_NAV_REVIEWS = 'Reviews';

export const rootRoutes = {
  [ROOT_NAV_MAIN_TAB]: {
    screen: MainTabNavigator,
    path: `/${ROOT_NAV_MAIN_TAB}`,
  },
  [ROOT_NAV_ITEM_LIST]: {
    screen: CategoryTabNavigator,
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
  [ROOT_NAV_MAIN_TAB]: {
    screen: MainTabNavigation,
    path: `/${ROOT_NAV_MAIN_TAB}`,
  },
  [ROOT_NAV_SELECT_ROLE]: {
    screen: SelectRoleScreen,
    path: `/${ROOT_NAV_SELECT_ROLE}`,
  },
  [ROOT_NAV_SIGN_UP_AS_A_BUYER]: {
    screen: SignUpAsABuyerScreen,
    path: `/${ROOT_NAV_SIGN_UP_AS_A_BUYER}`,
  },
  [ROOT_NAV_SIGN_UP_AS_A_SELLER]: {
    screen: SignUpAsASellerScreen,
    path: `/${ROOT_NAV_SIGN_UP_AS_A_SELLER}`,
  },
  [ROOT_NAV_ALL_CATEGORIES]: {
    screen: CategoryListScreen,
    path: `/${ROOT_NAV_ALL_CATEGORIES}`,
  },
  [ROOT_NAV_REVIEWS]: {
    screen: ReviewsScreen,
    path: `/${ROOT_NAV_REVIEWS}`,
  }
};
