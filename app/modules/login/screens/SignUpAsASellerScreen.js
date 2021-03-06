// @flow
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Button,
  ImageBackground
} from "react-native";

import PropTypes from "prop-types";
import { CheckBox } from 'react-native-elements'
import { connect } from "react-redux";
import styles from "./SignUpAsASellerScreen.styles";
import { navigateToMainTabScreen } from "../../../navigation/RootNavActions";
import Icon from "react-native-vector-icons/EvilIcons";
import NavigationBar from "../../shared/components/NavigationBar/NavigationBar";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import ArcmallButton from "../../shared/components/arcmallButton/ArcmallButton";
import Theme, { showToast } from "../../../theme/Base";
import LoginActions from "../actions/LoginActions";
import Strings from "../../shared/localization/localization";
import { STORAGE_USER } from "../../../Constants";
import { getUser } from "../../../store/AsyncStorageHelper";

class SignUpAsASellerScreen extends React.Component<any, any> {
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
      shoppartner: null,
      errorShown: false,
    };
  }

  componentDidMount() {}

  static getDerivedStateFromProps(props, state) {
    let modState = {...state};
    if(!state.errorShown && props.error) {
      showToast(props.error);
      modState.errorShown = true;
    } else if (props.registrationdata) {
      console.log(props.navigation.state)
      props.navigation.goBack(props.navigation.state.params.goBackFrom);
    }
    return modState;
  }

  async shouldComponentUpdate(nextProps, nextState) {
    let user = await getUser();
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
    this.setState({
      errorShown: false,
    })
    const {checked} = this.state;
    if(checked) {
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
    let {checked} = this.state;
    const {error} = this.props;
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
              <Text style={styles.selectRoleText}>Sign up as a Seller</Text>
              <Text style={styles.wordingText}>
                Great! Lets's get all set up to start selling items on Arcmall.We hope
                to see a greate collection from you.
              </Text>
              <Text style={[styles.label, {paddingTop: 10}]}>{Strings.COMPANY_NAME}</Text>
              <TextInput
                onChangeText={(shoppartner) => this.setState({shoppartner})}
                style={styles.textInput}
              />
              <Text style={[styles.label, {paddingTop: 10}]}>{Strings.FIRST_NAME}</Text>
              <TextInput
                onChangeText={(firstname) => this.setState({firstname})}
                style={styles.textInput}
              />
              <Text style={[styles.label, {paddingTop: 10}]}>{Strings.LAST_NAME}</Text>
              <TextInput
              onChangeText={(lastname) => this.setState({lastname})}
              style={styles.textInput}
              />
              <Text style={[styles.label, {paddingTop: 10}]}>{Strings.EMAIL}</Text>
              <TextInput
                onChangeText={(email) => this.setState({email})}
                style={styles.textInput}
              />
              <Text style={[styles.label, {paddingTop: 10}]}>{Strings.PASSWORD}</Text>
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
                style={{height: 40}}
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

SignUpAsASellerScreen.propTypes = {};

SignUpAsASellerScreen.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    registrationdata: state.login.registrationData,
    isLoading: state.login.registrationLoading,
    error: state.login.registrationError,
  };
};

export default connect(mapStateToProps)(SignUpAsASellerScreen);
