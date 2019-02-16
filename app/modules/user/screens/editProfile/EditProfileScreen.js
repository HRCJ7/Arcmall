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
import { getUser, getFullUser, setUser } from "../../../../store/AsyncStorageHelper";
import { editProfile } from "../EditProfileApis";
import LoginActions from "../../../login/actions/LoginActions";

class EditProfileScreen extends React.Component<any, any> {
  static defaultProps: any;

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      firstname: null,
      lastname: null,
      email: null,
      telephone: null
    };
    this.setUser()
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

  setUser = async () => {
    const fullUser = await getFullUser();
    const user = fullUser.customer_info;
    if (user) {
      this.setState({
        user: fullUser,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        telephone: user.telephone,
      })
    }
  }
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

  handleSaveProfile = async () => {
    let details = {...this.state};
    delete details.user;
    const response = await editProfile(details);
    if (response.status === 'success') {
      let user = {...this.state.user};
      let customerInfo = user.customer_info;
      let updatedCustomerInfo = {
        ...customerInfo,
        ...details,
      }
      user.customer_info = updatedCustomerInfo;
      console.log(user)
      await setUser(JSON.stringify(user));
      this.props.dispatch(LoginActions.postLogin({user}));
      if (response.message) {
        alert(response.message)
      }
    }
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
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={[styles.label, { paddingTop: 20 }]}>
              {Strings.FIRST_NAME}
            </Text>
            <TextInput
              value={this.state.firstname}
              onChangeText={firstname =>
                this.setState({ firstname: firstname })}
              style={styles.textInput}
            />
            <Text style={[styles.label, { paddingTop: 20 }]}>
              {Strings.LAST_NAME}
            </Text>
            <TextInput
              value={this.state.lastname}
              onChangeText={lastname => this.setState({ lastname: lastname })}
              style={styles.textInput}
            />
            <Text style={[styles.label, { paddingTop: 20 }]}>
              {Strings.EMAIL}
            </Text>
            <TextInput
              value={this.state.email}
              onChangeText={email => this.setState({ email: email })}
              style={styles.textInput}
            />

            <Text style={[styles.label, { paddingTop: 20 }]}>
              {Strings.MOBILE_NUMBER}
            </Text>
            <TextInput
              value={this.state.telephone}
              onChangeText={telephone =>
                this.setState({ telephone: telephone })}
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
      </View>
    );
  }
}

EditProfileScreen.propTypes = {};

EditProfileScreen.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    user: state.login.user,
  };
};

export default connect(mapStateToProps)(EditProfileScreen);
