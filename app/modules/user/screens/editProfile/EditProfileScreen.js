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
import styles from "./EditProfileScreen.styles";
import Theme from "../../../../theme/Base";
import UserActions from "../../actions/UserActions";
import EvilIcons from "react-native-vector-icons/dist/EvilIcons";
import NavigationBar from "../../../shared/components/NavigationBar/NavigationBar";
import ArcmallButton from "../../../shared/components/arcmallButton/ArcmallButton";
import Camera from "../../components/Camera";

// import LoginActions from "../actions/LoginActions";

import Strings from "../../../shared/localization/localization";
import { STORAGE_USER } from "../../../../Constants";
import { getUser } from "../../../../store/AsyncStorageHelper";

class EditProfileScreen extends React.Component<any, any> {
  static defaultProps: any;

  constructor(props) {
    super(props);

    this.state = {
      camera: false,
      firstName: null,
      lastName: null,
      email: null,
      mobileNumber: null
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
  };

  renderLeftAction = () => {
    return (
      <TouchableOpacity onPress={this.handleOnBackPress}>
        <EvilIcons name="chevron-left" color="white" size={50} />
      </TouchableOpacity>
    );
  };

  renderNavBar = () => {
    return (
      <NavigationBar
        title={Strings.EDIT_PROFILE}
        leftAction={this.renderLeftAction()}
      />
    );
  };

  handleSaveProfile = () => {
    let {  firstName, lastName, emaill, mobileNumber } = this.state;
    this.props.dispatch(UserActions.setProfile(firstName,lastName,email,mobileNumber));
  };
  takePicture = () => {
    this.setState({
      camera: true
    });
  };

  render() {
    const navBar = this.renderNavBar();
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
        {navBar}
        {this.state.camera ? (
          <Camera />
        ) : (
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <TouchableOpacity onPress={this.takePicture}>
                <View style={styles.circle}>
                  <EvilIcons
                    style={styles.icon}
                    name="user"
                    color={Theme.colors.black}
                    size={40}
                  />
                </View>
              </TouchableOpacity>

              <Text style={[styles.label, { paddingTop: 20 }]}>
                {Strings.FIRST_NAME}
              </Text>
              <TextInput
                onChangeText={firstName =>
                  this.setState({ firstName: firstName })}
                style={styles.textInput}
              />
              <Text style={[styles.label, { paddingTop: 20 }]}>
                {Strings.LAST_NAME}
              </Text>
              <TextInput
                onChangeText={lastName => this.setState({ lastName: lastName })}
                style={styles.textInput}
              />
              <Text style={[styles.label, { paddingTop: 20 }]}>
                {Strings.EMAIL}
              </Text>
              <TextInput
                onChangeText={email => this.setState({ email: email })}
                style={styles.textInput}
              />

              <Text style={[styles.label, { paddingTop: 20 }]}>
                {Strings.MOBILE_NUMBER}
              </Text>
              <TextInput
                onChangeText={mobileNumber =>
                  this.setState({ mobileNumber: mobileNumber })}
                style={styles.textInput}
              />
            </View>

            <View style={styles.footerComponent}>
              <ArcmallButton
                title="Save Profile"
                onPress={this.handleSaveProfile}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

EditProfileScreen.propTypes = {};

EditProfileScreen.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
    // registrationdata: state.login.registrationData,
    // isLoading: state.login.registrationLoading,
    // error: state.login.registrationError,
  };
};

export default connect(mapStateToProps)(EditProfileScreen);
