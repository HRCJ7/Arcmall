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
import styles from "./AccountSettingScreen.styles";
import NavigationBar from '../../../shared/components/NavigationBar/NavigationBar';
import { navigateToChangePasswordtScreen } from "../../../../navigation/RootNavActions";
import Icon from "react-native-vector-icons/EvilIcons";
import ArcmallButton from "../../../shared/components/arcmallButton/ArcmallButton";
// import LoginActions from "../actions/LoginActions";


import Strings from "../../../shared/localization/localization";
import { STORAGE_USER } from "../../../../Constants";
import { getUser } from "../../../../store/AsyncStorageHelper";

class AccountSettingScreen extends React.Component<any, any> {
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

  chnagePassword = () => {
    this.props.navigation.dispatch(navigateToChangePasswordtScreen());
  
  }

  
  renderLeftAction = () => {
    return (
      <TouchableOpacity onPress={this.handleOnBackPress}>
        <Icon name='chevron-left' color='white' size={50}/>
      </TouchableOpacity>
    )
  }

  renderNavBar = () => {
  
    return (
      <NavigationBar
        title= "Account Settings"
        leftAction={this.renderLeftAction()}
      >
      </NavigationBar>
    )
  }  

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
            <View style={styles.textContainer}>
              <TouchableOpacity style={styles.row} >
            <Text style={[styles.label]}>{Strings.EDIT_ACCOUNT_DETAILS}</Text>
            <Icon style={styles.icon} name='chevron-right' color='black' size={50}/>
            </TouchableOpacity>
           
            <TouchableOpacity style={styles.row} onPress={this.chnagePassword}>
            <Text style={[styles.label]}>{Strings.CHANGE_PASSWORD}</Text>
            <Icon style={styles.icon} name='chevron-right' color='black' size={50}/>
            </TouchableOpacity>
             
            <TouchableOpacity style={styles.row}>
            <Text style={[styles.label]}>{Strings.YOUR_SHIPPING_ADDRESS}</Text>
            <Icon style={styles.icon} name='chevron-right' color='black' size={50}/>
            </TouchableOpacity>
            
          
            </View>
           
          </View>
    );
  }
}

AccountSettingScreen.propTypes = {};

AccountSettingScreen.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    // registrationdata: state.login.registrationData,
    // isLoading: state.login.registrationLoading,
    // error: state.login.registrationError,
  };
};

export default connect(mapStateToProps)(AccountSettingScreen);
