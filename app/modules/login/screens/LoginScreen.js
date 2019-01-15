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
import styles from "./LoginScreen.styles";
import { navigateToMainTabScreen, navigateToSelectRoleScreen } from "../../../navigation/RootNavActions";
import Icon from "react-native-vector-icons/FontAwesome";
import EvilIcon from "react-native-vector-icons/EvilIcons";
import Strings from "../../shared/localization/localization";
import ArcmallButton from "../../shared/components/arcmallButton/ArcmallButton";
import LoginActions from "../actions/LoginActions";

class SignUpAsABuyerScreen extends React.Component<any, any> {
  static defaultProps: any;

  constructor(props) {
    super(props);
    this.state = {
      email: 'harindamail@gmail.com',
      password: 'harindamail',
    };
  }

  componentDidMount() {}

  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate() {}
  handleNavigatePress = () => {
    this.props.navigation.dispatch(navigateToMainTabScreen());
  };

  handleLoginPress = () => {
    let {email, password} = this.state;
    this.props.dispatch(LoginActions.login(email, password))
  }

  handleSignUpPress = () => {
    this.props.navigation.dispatch(navigateToSelectRoleScreen());
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
            <Text style={styles.descriptionText}>
              {Strings.LOGIN_TEXT}
            </Text>
            <Text style={styles.signInContinueText}>{Strings.SIGN_IN_TO_CONTINUE}</Text>
            <Text style={styles.label}>{Strings.EMAIL}</Text>
            <TextInput
              onChangeText={(email) => this.setState({email})}
              style={styles.textInput}
              value='harindamail@gmail.com'
            />
            <Text style={[styles.label, {paddingTop: 40}]}>{Strings.PASSWORD}</Text>
            <TextInput
              onChangeText={(password) => this.setState({password})}
              secureTextEntry={true}
              style={styles.textInput}
              value='harindamail'
            />
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>{Strings.FORGOT_PASSWORD}</Text>
            </TouchableOpacity>
            <ArcmallButton
              onPress={this.handleLoginPress}
              title={Strings.SIGN_IN}
              style={{marginTop: 20}}
            />
            <View style={styles.footerComponent}>
              <Text style={styles.label}>{Strings.NEW_TO_THIS}</Text>
              <TouchableOpacity onPress={this.handleSignUpPress}>
                <Text style={styles.signUpText}>{` ${Strings.SIGN_UP}`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}

SignUpAsABuyerScreen.propTypes = {};

SignUpAsABuyerScreen.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(SignUpAsABuyerScreen);
