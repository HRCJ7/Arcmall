// @flow
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Button,
  ImageBackground
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./SelectRoleScreen.styles";
import { navigateToMainTabScreen, navigateToSignInBuyerScreen, navigateToSignInSellerScreen } from "../../../navigation/RootNavActions";
import Icon from "react-native-vector-icons/EvilIcons";
import ArcmallButton from "../../shared/components/arcmallButton/ArcmallButton";
import Strings from "../../shared/localization/localization";

class SelectRoleScreen extends React.Component<any, any> {
  static defaultProps: any;

  constructor(props) {
    super(props);

    this.state = {
      error: null
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

  handleNavigatePress = () => {
    this.props.navigation.dispatch(navigateToMainTabScreen());
  };

  handleSignUpBuyer = () => {
    this.props.navigation.dispatch(navigateToSignInBuyerScreen());
  }

  handleSignUpSeller = () => {
    this.props.navigation.dispatch(navigateToSignInSellerScreen());
  }

  handleOnBackPress = () => {
    this.props.navigation.goBack(null);
  }

  handleSignInPress = () => {
    this.handleOnBackPress();
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
    return (
      <ImageBackground
        source={require("../../../../assets/login_background.png")}
        style={styles.container}
      >
        <View style={styles.headerComponent}>
          {this.renderLeftAction()}
          <View style={styles.headerComponent}>
          </View>
          <View style={styles.textComponent}>
            <Text style={styles.selectRoleText}>{Strings.SELECT_YOUR_ROLE}</Text>
            <Text style={styles.wordingText}>
              {Strings.SELECT_ROLE_DESC}
            </Text>
            <ArcmallButton
              inverse
              onPress={this.handleSignUpBuyer}
              style={{marginTop: 20}}
              title='Sign up as a Buyer'
            />
            <ArcmallButton
              onPress={this.handleSignUpSeller}
              style={{marginTop: 20}}
              title='Sign up as a Seller'
            />
            <View style={styles.footerComponent}>
              <Text style={styles.label}>{Strings.ALREADY_MEMBER}</Text>
              <TouchableOpacity onPress={this.handleSignInPress}>
                <Text style={styles.signUpText}>{` ${Strings.SIGN_IN}`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

SelectRoleScreen.propTypes = {};

SelectRoleScreen.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(SelectRoleScreen);
