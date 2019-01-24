// @flow
import HomeScreen from "../../modules/home/screens/HomeScreen";
import ProfileScreen from "../../modules/user/screens/ProfileScreen";
import ProductDetailScreen from "../../modules/product/screens/productDetail/ProductDetailScreen";
import ProductListScreen from "../../modules/product/screens/productList/ProductListScreen";
import LoginScreen from "../../modules/login/screens/LoginScreen";
import SignUpAsABuyerScreen from "../../modules/login/screens/SignUpAsABuyerScreen";
import SelectRoleScreen from "../../modules/login/screens/SelectRoleScreen";
import SignUpAsASellerScreen from "../../modules/login/screens/SignUpAsASellerScreen";
import ReviewsScreen from "../../modules/product/screens/reviews/ReviewsScreen";
import SettingsScreen from "../../modules/user/screens/settingsScreen/SettingsScreen";

export const MAIN_TAB_HOME = 'Home';
export const MAIN_TAB_PROFILE = 'Profile';

export const mainTabRoutes = {
  [MAIN_TAB_HOME]: {
    screen: SettingsScreen,
    path: `/${MAIN_TAB_HOME}`,
    navigationOptions: {
      tabBarLabel: 'Home',
    },
  },
  [MAIN_TAB_PROFILE]: {
    screen: ProfileScreen,
    path: `/${MAIN_TAB_PROFILE}`,
    navigationOptions: {
      tabBarLabel: 'Profile',
    },
  },
};
