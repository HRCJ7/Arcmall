// @flow
import React from 'react';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';
import {mainTabRoutes} from './MainTabRoutes';

const config = {
  swipeEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: 'blue',
    },
  }
};

const MainTabNavigator = createBottomTabNavigator(mainTabRoutes, config);
export const AppContainer = createAppContainer(MainTabNavigator);

class MainTabNavigation extends React.PureComponent<any, any> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AppContainer />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

export default connect(mapStateToProps)(MainTabNavigation);
