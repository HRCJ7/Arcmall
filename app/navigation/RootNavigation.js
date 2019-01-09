// @flow
import React from 'react';
import {SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';
import {rootRoutes, ROOT_NAV_LOGIN} from './RootRoutes';

const STACK_NAVIGATOR_CONFIG = {
  initialRouteName: ROOT_NAV_LOGIN,
  headerMode: 'none',
};

export const RootStackNavigation = createStackNavigator(rootRoutes, STACK_NAVIGATOR_CONFIG)
export const AppContainer = createAppContainer(RootStackNavigation);
const RootNavigation = (props: any) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <AppContainer />
    </SafeAreaView>
  );
};

RootNavigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

export default connect(mapStateToProps)(RootNavigation);
