// @flow
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ImageBackground,
  Image,
  AsyncStorage
} from "react-native";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from "./ForgetPasswordScreen.styles";
import Icon from "react-native-vector-icons/FontAwesome";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import Strings from "../../shared/localization/localization";
import ArcmallButton from "../../shared/components/arcmallButton/ArcmallButton";
import LoginActions from "../actions/LoginActions";
import { COOKIE_PHPSSID, COOKIE_LANGUAGE, COOKIE_CURENCY, STORAGE_USER } from "../../../Constants";
import { clearCookies, getUser } from "../../../store/AsyncStorageHelper";
import { showToast } from "../../../theme/Base";
import CartActions from "../../cart/actions/CartActions";

class ForgetPasswordScreen extends React.Component<any, any> {
  static defaultProps: any;

  constructor(props) {
    super(props);
    this.state = {
      email: null,
     
    };
  }

  componentDidMount() {
    
  }



  componentDidUpdate() {}
  handleNavigatePress = () => {
    this.props.navigation.dispatch(navigateToMainTabScreen());
  };

  handleSignUpPress = () => {
    this.props.navigation.dispatch(navigateToSelectRoleScreen());
  }

  handleForgetPassword = () => {
    let { email } = this.state;
    this.props.dispatch(LoginActions.forgetPassword(email))
  }

  handleOnBackPress = () => {
    this.props.navigation.goBack(null);
  }

  renderLeftAction = () => {
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={this.handleOnBackPress}>
        <EvilIcon name='close' color='white' size={30}/>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ImageBackground
        source={require("../../../../assets/login_background.png")}
        style={styles.container}
      >
        {this.renderLeftAction()}
        <KeyboardAwareScrollView
        enableOnAndroid
        extraScrollHeight={100}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.headerComponent}>
          <View style={styles.headerComponent}>
            <View style={styles.headerComponent}></View>
            <Image
              resizeMode='contain'
              style={styles.logo}
              source={require("../../../../assets/logo.png")}
            />
          </View>
          <View style={styles.textComponent}>
          
            <Text style={styles.label}>{Strings.EMAIL}</Text>
            <TextInput
              onChangeText={(email) => this.setState({email})}
              style={styles.textInput}
            />
         
            <ArcmallButton
              onPress={this.handleForgetPassword}
              title={Strings.SEND}
              style={{marginTop: 20}}
            />
          
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

ForgetPasswordScreen.propTypes = {};

ForgetPasswordScreen.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    user: state.login.user,
    error: state.login.error,
  };
};

export default connect(mapStateToProps)(ForgetPasswordScreen);
