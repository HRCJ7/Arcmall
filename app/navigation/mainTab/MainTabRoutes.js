// @flow
import HomeScreen from "../../modules/home/screens/HomeScreen";
import ProfileScreen from "../../modules/user/screens/ProfileScreen";
import ProductDetailScreen from "../../modules/product/screens/productDetail/ProductDetailScreen";
import ProductListScreen from "../../modules/product/screens/productList/ProductListScreen";

import LoginScreen from "../../modules/login/screens/LoginScreen";
import SignUpAsABuyerScreen from "../../modules/login/screens/SignUpAsABuyerScreen";
import SelectRoleScreen from "../../modules/login/screens/SelectRoleScreen";
import SignUpAsASellerScreen from "../../modules/login/screens/SignUpAsASellerScreen";
import CartDetailsScreen from '../../modules/cart/screens/cartDetails/CartDetailsScreen';
import OrderConfirmationScreen from '../../modules/cart/screens/orderConfirmation/OrderConfirmationScreen';
// import OrderHistoryScreen from '../../modules/cart/screens/orderHistory/OrderHistoryScreen';

// import EditProfileScreen from '../../modules/user/screens/editProfile/EditProfileScreen'

import ReviewsScreen from "../../modules/product/screens/reviews/ReviewsScreen";
import SettingsScreen from "../../modules/user/screens/settingsScreen/SettingsScreen";
import ChangePasswordScreen from "../../modules/user/screens/changePassword/ChangePasswordScreen";
import Strings from "../../modules/shared/localization/localization";
import AddProductScreen from "../../modules/product/screens/addProduct/AddProductScreen";
import WishListScreen from "../../modules/cart/screens/wishList/WishListScreen";
import OrderHistoryScreen from "../../modules/user/screens/orderHistory/OrderHistoryScreen";
import CartCheckoutScreen from "../../modules/cart/screens/cartCheckout/CartCheckoutScreen";



export const HOME_TAB = 'Home';
export const PROFILE_TAB = 'Profile';

 import ShopDetailScreen from "../../modules/product/screens/shopDetails/ShopDetailScreen.js";

export const MAIN_TAB_HOME = 'Home';
export const MAIN_TAB_PROFILE = 'Profile';
export const MAIN_TAB_MORE_SETTINGS = 'More Settings';
export const MAIN_TAB_YOUR_CART = 'CartDetailsScreen';
export const MAIN_TAB_WISH_LIST = 'WishList';

export const mainTabRoutes = {
  [MAIN_TAB_HOME]: {
    screen: HomeScreen,
    path: `/${MAIN_TAB_HOME}`,
  },
  [MAIN_TAB_PROFILE]: {
    screen: ProfileScreen,
    path: `/${MAIN_TAB_PROFILE}`,
  },
  [MAIN_TAB_YOUR_CART]: {
    screen: CartDetailsScreen,
    path: `/${MAIN_TAB_YOUR_CART}`,
  },
  [MAIN_TAB_WISH_LIST]: {
    screen: WishListScreen,
    path: `/${MAIN_TAB_WISH_LIST}`,
  },
  [MAIN_TAB_MORE_SETTINGS]: {
    screen: SettingsScreen,
    path: `/${MAIN_TAB_MORE_SETTINGS}`,
  },
};
