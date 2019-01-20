// @flow
import React from 'react';
import {SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import {rootRoutes, ROOT_NAV_MAIN_TAB,ROOT_NAV_SIGN_UP_AS_A_BUYER} from './RootRoutes';
import ProductActions from '../modules/product/actions/ProductActions';
import Theme from '../theme/Base';

const STACK_NAVIGATOR_CONFIG = {
  initialRouteName: ROOT_NAV_MAIN_TAB,
  headerMode: 'none',
};

export const RootStackNavigation = createStackNavigator(rootRoutes, STACK_NAVIGATOR_CONFIG)
export const AppContainer = createAppContainer(RootStackNavigation);
const RootNavigation = (props: any) => {
  // props.dispatch(ProductActions.getProductById(264))
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Theme.colors.primary}}>
      <AppContainer />
    </SafeAreaView>
  );
};

RootNavigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // navigation: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

export default connect(mapStateToProps)(RootNavigation);
