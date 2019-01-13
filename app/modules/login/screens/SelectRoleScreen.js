// @flow
import React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  SafeAreaView,
  Button,
  ImageBackground
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./SelectRoleScreen.styles";
import { navigateToMainTabScreen } from "../../../navigation/RootNavActions";
import Icon from "react-native-vector-icons/FontAwesome";

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

  componentDidUpdate() {}
  handleNavigatePress = () => {
    console.log(this.props);
    this.props.navigation.dispatch(navigateToMainTabScreen());
  };

  render() {
    return (
      <ImageBackground
        source={require("../../../../assets/login_background.png")}
        style={styles.background_image}
      >
        <Icon
          name="arrow-left"
          size={25}
          color="#ffffff"
          style={styles.back_button}
        />
        <Text style={styles.select_your_role}>Select Your Role</Text>
        <Text style={styles.description}>
          Signing up as a Buyer lets you purchase items and Signing up as a
          Seller allows you to both purhase and set up your own store.
        </Text>
        <TouchableHighlight style={styles.sign_up_as_a_buyer_button}>
          <Text style={styles.sign_up_as_a_buyer_text}>Sign up as a Buyer</Text>
        </TouchableHighlight>
        <View style={styles.space} />
        <TouchableHighlight style={styles.sign_up_as_a_seller_button}>
          <Text style={styles.sign_up_as_a_seller_text}>
            Sign up as a Seller
          </Text>
        </TouchableHighlight>
        <View style={styles.already_memeber_view}>
          <View style={styles.boader_line} />
          <View style={styles.text_row}>
            <Text>Already a member?</Text>
            <Text>Sign in</Text>
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
