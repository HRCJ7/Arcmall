// @flow
import HomeScreen from "../../modules/home/screens/HomeScreen";
import ProfileScreen from "../../modules/user/screens/ProfileScreen";

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
