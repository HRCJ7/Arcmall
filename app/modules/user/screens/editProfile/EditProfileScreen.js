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
import Theme from '../../../../theme/Base';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import NavigationBar from '../../../shared/components/NavigationBar/NavigationBar';
import ArcmallButton from "../../../shared/components/arcmallButton/ArcmallButton";
import Camera from '../../components/Camera'

// import LoginActions from "../actions/LoginActions";


import Strings from "../../../shared/localization/localization";
import { STORAGE_USER } from "../../../../Constants";
import { getUser } from "../../../../store/AsyncStorageHelper";

class EditProfileScreen extends React.Component<any, any> {
  static defaultProps: any;

  constructor(props) {
    super(props);

    this.state = {
     camera:false,
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
        
      >
      </NavigationBar>
    )
  }

  handleSavePassword = () => {

    // let user = await getUser();  
    // const {checked, firstname, email, password, lastname} = this.state;
    // if(checked && firstname && lastname && email && password) {
    //   this.props.dispatch(LoginActions.registration(this.state))
    // }
  }
  takePicture = () => {
    this.setState({
      camera: true
    });
  };

  render() {
    const navBar = this.renderNavBar();
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
        {navBar}  
        {this.state.camera ? <Camera /> :
          <View style={styles.container}>
            <View style={styles.textContainer}>
              <TouchableOpacity onPress={this.takePicture}>
                <View style={styles.circle}>
                  <EvilIcons
                    style={styles.icon}
                    name='user' color={Theme.colors.black} size={40} />
                </View>
              </TouchableOpacity>
          
              <Text style={[styles.label, { paddingTop: 20 }]}>{Strings.FIRST_NAME}</Text>
              <TextInput
                onChangeText={(password) => this.setState({ current: password })}
        
                style={styles.textInput}
              />
              <Text style={[styles.label, { paddingTop: 20 }]}>{Strings.LAST_NAME}</Text>
              <TextInput
                onChangeText={(password) => this.setState({ password: password })}
           
                style={styles.textInput}
              />
              <Text style={[styles.label, { paddingTop: 20 }]}>{Strings.EMAIL}</Text>
              <TextInput
                onChangeText={(password) => this.setState({ confirm: password })}
            
                style={styles.textInput}
              />
          
              <Text style={[styles.label, { paddingTop: 20 }]}>{Strings.MOBILE_NUMBER}</Text>
              <TextInput
                onChangeText={(password) => this.setState({ confirm: password })}
            
                style={styles.textInput}
              />
      
            </View>
        
            <View style={styles.footerComponent}>
              <ArcmallButton
                title='Save Profile'
                onPress={this.handleSavePassword}
              />
            </View>
          </View>
        }
      </View>
    );
  }
}

EditProfileScreen.propTypes = {};

EditProfileScreen.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    // registrationdata: state.login.registrationData,
    // isLoading: state.login.registrationLoading,
    // error: state.login.registrationError,
  };
};

export default connect(mapStateToProps)(EditProfileScreen);
