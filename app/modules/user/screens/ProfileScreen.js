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
import {navigateToMainTabScreen, navigateToLoginScreen, navigateToSignInBuyerScreen} from '../../../navigation/RootNavActions';
import { PROFILE_TAB, HOME_TAB } from '../../../navigation/mainTab/MainTabRoutes';
import LoginActions from '../../login/actions/LoginActions';

class ProfileScreen extends React.Component<any, any> {
  static defaultProps: any

  static navigationOptions: any = ({navigation}) => ({
    tabBarOnPress: async ({previousScene, scene, jumpToIndex}) => {
      let user = await AsyncStorage.getItem('user');
      if (user) {
        navigation.navigate(PROFILE_TAB);
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
  handleNavigatePress = () => {
    this.props.dispatch(LoginActions.signOut());
    this.props.navigation.navigate(HOME_TAB);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>New PROFILE screen!</Text>
        <Button
          onPress={this.handleNavigatePress}
          title={"Singn out"}
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
