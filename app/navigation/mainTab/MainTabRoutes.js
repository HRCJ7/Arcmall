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
import OrderHistoryScreen from '../../modules/cart/screens/orderHistory/OrderHistoryScreen';
import WishList from '../../modules/cart/screens/wishList/WishList';
import EditProfileScreen from '../../modules/user/screens/editProfile/EditProfileScreen'

export const HOME_TAB = 'Home';
export const PROFILE_TAB = 'Profile';
export const YOUR_CART = 'CartDetailsScreen';
import ReviewsScreen from "../../modules/product/screens/reviews/ReviewsScreen";
import SettingsScreen from "../../modules/user/screens/settingsScreen/SettingsScreen";
import Strings from "../../modules/shared/localization/localization";
import AddProductScreen from "../../modules/product/screens/addProduct/AddProductScreen";

export const MAIN_TAB_HOME = 'Home';
export const MAIN_TAB_PROFILE = 'Profile';

export const mainTabRoutes = {
  [MAIN_TAB_HOME]: {
    screen: EditProfileScreen,
    path: `/${MAIN_TAB_HOME}`,
  },
  [MAIN_TAB_PROFILE]: {
    screen: ProfileScreen,
    path: `/${MAIN_TAB_PROFILE}`,
  },
  [YOUR_CART]: {
    screen: CartDetailsScreen,
    path: `/${YOUR_CART}`,
  },
};
