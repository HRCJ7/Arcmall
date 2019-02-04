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
import CartDetailsScreen from '../modules/cart/screens/cartDetails/CartDetailsScreen';
import OrderConfirmationScreen from '../modules/cart/screens/orderConfirmation/OrderConfirmationScreen';
import OrderHistoryScreen from '../modules/cart/screens/orderHistory/OrderHistoryScreen';

import ReviewsScreen from '../modules/product/screens/reviews/ReviewsScreen';
import SettingsScreen from '../modules/user/screens/settingsScreen/SettingsScreen';
import ChangePasswordScreen from '../modules/user/screens/changePassword/ChangePasswordScreen';
import AccountSettingScreen from '../modules/user/screens/accountSettings/AccountSettingScreen';
import NavMenuScreen from '../modules/product/screens/navMenu/NavMenuScreen';
import AddProductScreen from '../modules/product/screens/addProduct/AddProductScreen';

export const ROOT_NAV_LOGIN = 'Login';
export const ROOT_NAV_SELECT_ROLE = 'SelectRole';
export const ROOT_NAV_MAIN_TAB = 'MainTab';
export const ROOT_NAV_ITEM_LIST = 'ItemList';
export const ROOT_NAV_ITEM_DETAILS = 'ItemDetails';
export const ROOT_NAV_SIGN_UP_AS_A_BUYER = 'SignUpAsABuyerScreen';
export const ROOT_NAV_SIGN_UP_AS_A_SELLER = 'SignUpAsASellerScreen';
export const ROOT_NAV_ALL_CATEGORIES = 'AllCategories';
export const ROOT_NAV_YOUR_CART = 'CartDetailsScreen';
export const ROOT_NAV_ORDER_CONFIRMATION = 'OrderConfirmationScreen';
export const ROOT_NAV_ORDER_HISTORY = 'OrderHistoryScreen';
export const ROOT_NAV_REVIEWS = 'Reviews';
export const ROOT_NAV_PRODUCT_LIST = 'ProductList';

export const ROOT_NAV_OPTIONS = 'NavMen';
export const ROOT_NAV_OPTIONS_1 = 'NavMen1';
export const ROOT_NAV_OPTIONS_2 = 'NavMen2';
export const ROOT_NAV_OPTIONS_3 = 'NavMen3';

export const ROOT_NAV_SETTINGS = 'Settings';
export const ROOT_NAV_SETTINGS_LANGUAGE = 'SettingsLanguage';
export const ROOT_NAV_SETTINGS_SHIPPING = 'SettingsShipping';
export const ROOT_NAV_SETTINGS_SHIPPING_ADD = 'SettingsShippingAdd';
export const ROOT_NAV_CHANGE_PASSWORD = 'SettingsChangePassword';
export const ROOT_NAV_ACCOUNT_SETTINGS = 'AccountSettingScreen';
export const ROOT_NAV_ADD_ITEM = 'Add Item';

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
  [ROOT_NAV_YOUR_CART]: {
    screen: CartDetailsScreen,
    path: `/${ROOT_NAV_YOUR_CART}`,
  },
  [ROOT_NAV_REVIEWS]: {
    screen: ReviewsScreen,
    path: `/${ROOT_NAV_REVIEWS}`,
  },
  [ROOT_NAV_SETTINGS]: {
    screen: SettingsScreen,
    path: `/${ROOT_NAV_SETTINGS}`,
  },
  [ROOT_NAV_SETTINGS_LANGUAGE]: {
    screen: SettingsScreen,
    path: `/${ROOT_NAV_SETTINGS_LANGUAGE}`,
  },
  [ROOT_NAV_SETTINGS_SHIPPING]: {
    screen: SettingsScreen,
    path: `/${ROOT_NAV_SETTINGS_SHIPPING}`,
  },
  [ROOT_NAV_SETTINGS_SHIPPING_ADD]: {
    screen: SettingsScreen,
    path: `/${ROOT_NAV_SETTINGS_SHIPPING_ADD}`,
  },
  [ROOT_NAV_CHANGE_PASSWORD]: {
    screen: SettingsScreen,
    path: `/${ROOT_NAV_CHANGE_PASSWORD}`,
  },
  [ROOT_NAV_OPTIONS_1]: {
    screen: NavMenuScreen,
    path: `/${ROOT_NAV_OPTIONS_1}`,
  },
  [ROOT_NAV_OPTIONS_2]: {
    screen: NavMenuScreen,
    path: `/${ROOT_NAV_OPTIONS_2}`,
  },
  [ROOT_NAV_OPTIONS_3]: {
    screen: NavMenuScreen,
    path: `/${ROOT_NAV_OPTIONS_3}`,
  },
  [ROOT_NAV_ADD_ITEM]: {
    screen: AddProductScreen,
    path: `/${ROOT_NAV_ADD_ITEM}`,
  },
  [ROOT_NAV_PRODUCT_LIST]: {
    screen: ProductListScreen,
    path: `/${ROOT_NAV_PRODUCT_LIST}`,
  },
  [ROOT_NAV_ACCOUNT_SETTINGS]: {
    screen: AccountSettingScreen,
    path: `/${ROOT_NAV_ACCOUNT_SETTINGS}`,
  },
  [ROOT_NAV_ORDER_CONFIRMATION]: {
    screen: OrderConfirmationScreen,
    path: `/${ROOT_NAV_ORDER_CONFIRMATION}`,
  },
  [ROOT_NAV_ORDER_HISTORY]: {
    screen: OrderHistoryScreen,
    path: `/${ROOT_NAV_ORDER_HISTORY}`,
  },
};
