// @flow
import React from 'react';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';
import {mainTabRoutes, MAIN_TAB_HOME, MAIN_TAB_PROFILE} from './MainTabRoutes';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Theme, { font } from '../../theme/Base';

const config = {
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: 'black',
    labelStyle: {
      ...font,
      fontSize: Theme.fontSizes.xSmall,
    },
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName  = '';
      if (routeName === MAIN_TAB_HOME) {
        iconName = 'ios-home'; 
      } else if (routeName === MAIN_TAB_PROFILE) {
        iconName = 'ios-contact';
      }
      return <Ionicon name={iconName} size={23} color={tintColor} />;
    },
  }),
};

const MainTabNavigator = createBottomTabNavigator(mainTabRoutes, config);

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

export default connect(mapStateToProps)(MainTabNavigator);
