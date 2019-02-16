// @flow
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
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
import UserActions from "../../actions/UserActions";
import Strings from "../../../shared/localization/localization";
import { STORAGE_USER } from "../../../../Constants";
import { getUser } from "../../../../store/AsyncStorageHelper";
import { changePassword } from "../EditProfileApis";
import LoginActions from "../../../login/actions/LoginActions";
import { navigateToLoginScreen, navigateToMainTabScreen } from "../../../../navigation/RootNavActions";

class ChangePasswordScreen extends React.Component<any, any> {
  static defaultProps: any;

  constructor(props) {
    super(props);

    this.state = {
      password: null,
      confirm: null,
      current: null
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

  handleOnBackPress = () => {
    this.props.navigation.goBack(null);
  };

  handleSavePassword = async () => {
    let { password, confirm, current} = this.state;
    password = password === ''? null: password;
    confirm = confirm === ''? null: confirm;
    if (confirm && password && password === confirm) {
      const response = await changePassword({password, current});
      if (response.status === 'success') {
        this.props.dispatch(LoginActions.signOut());
        this.props.navigation.dispatch
        if (response.message) {
          alert(response.message);
        }
      }
    } else {
      alert(Strings.PASSWORDS_NOT_MATCH);
    }
  };

  render() {
    let { checked, error } = this.state;
    if (error) {
      let string = "";
      for (let key in error) {
        string.concat(`${error[key]} \n`);
      }
      // Toast.show(string, Toast.LONG);
    }

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.label, { paddingTop: 20 }]}>
            {Strings.CURRENT_PASSWORD}
          </Text>
          <TextInput
            onChangeText={password => this.setState({ current: password })}
            secureTextEntry={true}
            style={styles.textInput}
          />
          <Text style={[styles.label, { paddingTop: 20 }]}>
            {Strings.NEW_PASSWORD}
          </Text>
          <TextInput
            onChangeText={password => this.setState({ password: password })}
            secureTextEntry={true}
            style={styles.textInput}
          />
          <Text style={[styles.label, { paddingTop: 20 }]}>
            {Strings.CONFIRM_PASSWORD}
          </Text>
          <TextInput
            onChangeText={password => this.setState({ confirm: password })}
            secureTextEntry={true}
            style={styles.textInput}
          />
        </View>
        <View style={styles.footerComponent}>
          <ArcmallButton
            title="Save Password"
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
    navigation: ownProps.navigation,
    // isLoading: state.login.registrationLoading,
    // error: state.login.registrationError,
  };
};

export default connect(mapStateToProps)(ChangePasswordScreen);
