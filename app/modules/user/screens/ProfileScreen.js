// @flow
import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Button,
  AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './ProfileScreen.styles';
import {navigateToMainTabScreen, navigateToLoginScreen, navigateToSignInBuyerScreen, navigateToSettings} from '../../../navigation/RootNavActions';
import { MAIN_TAB_PROFILE, MAIN_TAB_HOME } from '../../../navigation/mainTab/MainTabRoutes';
import LoginActions from '../../login/actions/LoginActions';
import UserActions from '../actions/UserActions';
import { ACTIVE_SCREEN_SETTINGS, STORAGE_USER, COOKIE_PHPSSID } from '../../../Constants';
import { getUser } from '../../../store/AsyncStorageHelper';

class ProfileScreen extends React.Component<any, any> {
  static defaultProps: any

  static navigationOptions: any = ({navigation}) => ({
    tabBarOnPress: async ({previousScene, scene, jumpToIndex}) => {
      let user = await getUser();
      if (user) {
        navigation.navigate(MAIN_TAB_PROFILE);
      } else {
        navigation.dispatch(navigateToLoginScreen());
      }
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
    props.navigation.setParams({
      loadProfile: true,
    })
  }

  componentDidMount() {
    
  }

  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate() {
    
  }
  handleNavigatePress = async () => {
    this.props.dispatch(LoginActions.signOut());
    this.props.navigation.navigate(MAIN_TAB_HOME);
  }

  handleSettingPress = () => {
    this.props.navigation.dispatch(navigateToSettings());
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>New PROFILE screen!</Text>
        <Button
          onPress={this.handleNavigatePress}
          title={"Sign out"}
        />
        <Button
          onPress={this.handleSettingPress}
          title={"Settings"}
        />
      </View>
    );
  }
}

ProfileScreen.propTypes = {

};

ProfileScreen.defaultProps = {

};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(ProfileScreen);
