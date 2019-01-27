// @flow
import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Button,
  AsyncStorage,
  TouchableOpacity,
  ImageBackground,
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
import NavigationBar from '../../shared/components/NavigationBar/NavigationBar';
import Strings from '../../shared/localization/localization';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import LoadingIndicator from '../../shared/components/loadingIndicator/LoadingIndicator';
import Theme from '../../../theme/Base';

class ProfileScreen extends React.Component<any, any> {
  static defaultProps: any

  static navigationOptions: any = ({navigation}) => ({
    title: Strings.MY_PROFILE,
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
      isLoading: null,
      userInfo: null,
    };

    props.navigation.setParams({
      loadProfile: true,
    });
    this.getUserInfo();
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

  getUserInfo = async () => {
    const userInfo = await getUser();
    this.setState({
      userInfo: userInfo,
    })

  }

  handleNavigatePress = async () => {
    this.props.dispatch(LoginActions.signOut());
    this.props.navigation.navigate(MAIN_TAB_HOME);
  }

  handleSettingPress = () => {
    this.props.navigation.dispatch(navigateToSettings());
  }

  renderRightAction = () => {
    return (
      <TouchableOpacity onPress={this.handleSettingPress}>
       <EvilIcons name='gear' color='white' size={30}/>
      </TouchableOpacity>
    )
  }

  renderNavBar = () => {
    return (
      <NavigationBar
        title={Strings.MY_PROFILE}
        leftAction={null}
        rightAction={this.renderRightAction()}
      >
      </NavigationBar>
    )
  }

  render() {
    let content = null;
    const {userInfo} = this.state;
    const navBar = this.renderNavBar();

    if (!userInfo) {
      content = (
        <View style={styles.container}>
          {navBar}
          <LoadingIndicator />
        </View>
      )
    } else {
      content = (
        <View style={styles.container}>
          {navBar}
          <ImageBackground 
            source={require('../../../../assets/profile.png')}
            style={styles.imageContainer}>
            <View style={styles.image}>
              
            </View>
            <Text style={styles.nameText}>{`${userInfo.firstname} ${userInfo.lastname}`}</Text>
            <Text style={styles.emailText}>{userInfo.email}</Text>
          </ImageBackground>
          <View style={styles.itemInfo}>
            <TouchableOpacity style={styles.listItem} onPress={null}>
              <View style={styles.listItemWrapper}>
                <Text style={styles.settingText}>{Strings.PROCESSING}</Text>
                <EvilIcons
                  style={styles.rightIcon}
                  name='chevron-right' color={Theme.colors.darkGray} size={30}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem} onPress={null}>
              <View style={styles.listItemWrapper}>
                <Text style={styles.settingText}>{Strings.SHIPPED}</Text>
                <EvilIcons
                  style={styles.rightIcon}
                  name='chevron-right' color={Theme.colors.darkGray} size={30}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem} onPress={null}>
              <View style={styles.listItemWrapper}>
                <Text style={styles.settingText}>{Strings.COMPLETED}</Text>
                <EvilIcons
                  style={styles.rightIcon}
                  name='chevron-right' color={Theme.colors.darkGray} size={30}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    return content;
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
