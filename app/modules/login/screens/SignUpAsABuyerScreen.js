// @flow
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Button,
  ImageBackground,
  AsyncStorage
} from "react-native";

import PropTypes from "prop-types";
import { CheckBox } from 'react-native-elements'
import { connect } from "react-redux";
import styles from "./SignUpAsABuyerScreen.styles";
import { navigateToMainTabScreen } from "../../../navigation/RootNavActions";
import Icon from "react-native-vector-icons/EvilIcons";
import NavigationBar from "../../shared/components/NavigationBar/NavigationBar";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ArcmallButton from "../../shared/components/arcmallButton/ArcmallButton";
import Theme from "../../../theme/Base";
import LoginActions from "../actions/LoginActions";
import Toast from 'react-native-simple-toast';
import { HOME_TAB } from "../../../navigation/mainTab/MainTabRoutes";
import Strings from "../../shared/localization/localization";

class SignUpAsABuyerScreen extends React.Component<any, any> {
  static defaultProps: any;

  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      firstname: null,
      email: null,
      password: null,
      confirm: null,
      lastname: null,
      error: null,
    };
  }

  componentDidMount() {}

  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    // const {error} = state;
    return null;
  }

   async shouldComponentUpdate(nextProps, nextState) {
    // const {registrationdata} = nextProps;
    // if (registrationdata) {
    //   console.log(registrationData)
    //   this.props.dispatch(LoginActions.login({
    //     email: registrationdata.email,
    //     password: registrationdata.password,
    //   }))
    // }
    let user = await AsyncStorage.getItem('user');
    if(user) {
      this.props.navigation.navigate(HOME_TAB);
    }
    return true;
  }

  componentDidUpdate() {}

  handleNavigatePress = () => {
    this.props.navigation.dispatch(navigateToMainTabScreen());
  };

  handleOnBackPress = () => {
    this.props.navigation.goBack(null);
  }

  handleRegister = () => {
    const {checked, firstname, email, password, lastname} = this.state;
    if(checked && firstname && lastname && email && password) {
      this.props.dispatch(LoginActions.registration(this.state))
    }
  }

  renderLeftAction = () => {
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={this.handleOnBackPress}>
        <Icon name='chevron-left' color='white' size={50}/>
      </TouchableOpacity>
    )
  }

  render() {
    let {checked, error} = this.state;
    if (error) {
      let string = '';
      for (let key in error) {
        string.concat(`${error[key]} \n`);
      }
      // Toast.show(string, Toast.LONG);
    }

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
            <View style={styles.textComponent}>
              <Text style={styles.selectRoleText}>Sign up as a Buyer</Text>
              <Text style={styles.wordingText}>
                {Strings.SIGN_AS_BUYER_DESC}
              </Text>
              <Text style={[styles.label, {paddingTop: 20}]}>{Strings.FIRST_NAME}</Text>
              <TextInput
                onChangeText={(firstname) => this.setState({firstname})}
                style={styles.textInput}
              />
              <Text style={[styles.label, {paddingTop: 20}]}>{Strings.LAST_NAME}</Text>
              <TextInput
              onChangeText={(lastname) => this.setState({lastname})}
              style={styles.textInput}
              />
              <Text style={[styles.label, {paddingTop: 20}]}>{Strings.EMAIL}</Text>
              <TextInput
                onChangeText={(email) => this.setState({email})}
                style={styles.textInput}
              />
              <Text style={[styles.label, {paddingTop: 20}]}>{Strings.PASSWORD}</Text>
              <TextInput
                onChangeText={(password) => this.setState({password, confirm: password})}
                secureTextEntry={true}
                style={styles.textInput}
              />
            </View>
            
            <View style={styles.footerComponent}>
              <View style={styles.checkBoxRow}>
                <CheckBox
                  containerStyle={{flex: 1, backgroundColor: 'transparent', borderWidth: 0}}
                  textStyle={styles.acceptText}
                  title='I agree to Terms and Condition of Arcmall'
                  checked={this.state.checked}
                  checkedColor={Theme.colors.smallText}
                  onPress={()=> this.setState({checked: !checked})}
                />
              </View>
              <ArcmallButton
                title='Register'
                onPress={this.handleRegister}
              />
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
    ...state,
    registrationdata: state.login.registrationData,
    isLoading: state.login.registrationLoading,
    error: state.login.registrationError,
  };
};

export default connect(mapStateToProps)(SignUpAsABuyerScreen);
