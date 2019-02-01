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
// import { CheckBox } from 'react-native-elements'
import { connect } from "react-redux";
import styles from "./ChangePasswordScreen.styles";
import Icon from "react-native-vector-icons/EvilIcons";
import ArcmallButton from "../../../shared/components/arcmallButton/ArcmallButton";
// import LoginActions from "../actions/LoginActions";


import Strings from "../../../shared/localization/localization";
import { STORAGE_USER } from "../../../../Constants";
import { getUser } from "../../../../store/AsyncStorageHelper";

class ChangePasswordScreen extends React.Component<any, any> {
  static defaultProps: any;

  constructor(props) {
    super(props);

    this.state = {
     
      password: null,
      confirm: null,
      current : null
    };
  }

  componentDidMount() {}

  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    // const {error} = state;
    return null;
  }

//    async shouldComponentUpdate(nextProps, nextState) {
//     let user = await getUser();
//     if(user) {
//     //   this.props.navigation.navigate(HOME_TAB);
//     }
//     return true;
//   }

  componentDidUpdate() {}

  handleNavigatePress = () => {
    this.props.navigation.dispatch(navigateToMainTabScreen());
  };

  handleOnBackPress = () => {
    this.props.navigation.goBack(null);
  }

  handleSavePassword = () => {

    // let user = await getUser();  
    // const {checked, firstname, email, password, lastname} = this.state;
    // if(checked && firstname && lastname && email && password) {
    //   this.props.dispatch(LoginActions.registration(this.state))
    // }
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
      <View style={styles.container}>
        <View style={styles.textContainer}>
          
        <Text style={[styles.label, {paddingTop: 20}]}>{Strings.CURRENT_PASSWORD}</Text>
        <TextInput
                onChangeText={(password) => this.setState({current: password })}     
          secureTextEntry={true}
          style={styles.textInput}
        />
          <Text style={[styles.label, {paddingTop: 20}]}>{Strings.NEW_PASSWORD}</Text>
          <TextInput
            onChangeText={(password) => this.setState({password: password})}
            secureTextEntry={true}
            style={styles.textInput}
          />
          <Text style={[styles.label, {paddingTop: 20}]}>{Strings.CONFIRM_PASSWORD}</Text>
          <TextInput
            onChangeText={(password) => this.setState({confirm: password})}
            secureTextEntry={true}
            style={styles.textInput}
            />
      
        </View>
        <View style={styles.footerComponent}>
          <ArcmallButton
            title='Save Password'
            onPress={this.handleSavePassword}
          />
        </View>
      </View>
    );
  }
}

ChangePasswordScreen.propTypes = {};

ChangePasswordScreen.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    // registrationdata: state.login.registrationData,
    // isLoading: state.login.registrationLoading,
    // error: state.login.registrationError,
  };
};

export default connect(mapStateToProps)(ChangePasswordScreen);
