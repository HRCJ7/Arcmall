// @flow
import HomeScreen from "../../modules/home/screens/HomeScreen";
import ProfileScreen from "../../modules/user/screens/ProfileScreen";
import ProductDetailScreen from "../../modules/product/screens/productDetail/ProductDetailScreen";
import ProductListScreen from "../../modules/product/screens/productList/ProductListScreen";
import LoginScreen from "../../modules/login/screens/LoginScreen";
import SignUpAsABuyerScreen from "../../modules/login/screens/SignUpAsABuyerScreen";
import SelectRoleScreen from "../../modules/login/screens/SelectRoleScreen";
import SignUpAsASellerScreen from "../../modules/login/screens/SignUpAsASellerScreen";

export const HOME_TAB = 'Home';
export const PROFILE_TAB = 'Profile';

export const mainTabRoutes = {
  [HOME_TAB]: {
    screen: HomeScreen,
    path: `/${HOME_TAB}`,
    navigationOptions: {
      tabBarLabel: 'Home',
    },
  },
  [PROFILE_TAB]: {
    screen: ProfileScreen,
    path: `/${PROFILE_TAB}`,
    navigationOptions: {
      tabBarLabel: 'Profile',
    },
  },
};
