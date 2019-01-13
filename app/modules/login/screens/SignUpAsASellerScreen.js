// @flow
import React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  SafeAreaView,
  TextInput,
  Button,
  ImageBackground
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./SignUpAsASellerScreen.styles";
import { navigateToMainTabScreen } from "../../../navigation/RootNavActions";
import Icon from "react-native-vector-icons/FontAwesome";

class SignUpAsASellerScreen extends React.Component<any, any> {
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
        <Text style={styles.select_your_role}>Sign up as a Seller</Text>
        <Text style={styles.description}>
          Great! Lets's get all set up to start selling items on Arcmall.We hope
          to see a greate collection from you.
        </Text>

        <View style={styles.detail_view}>
          <View>
            <Text>Company Name</Text>
            <TextInput style={styles.text_input} placeholder="Arcmall PVT Ltd" />
          </View>
          <View>
            <Text>Your Name</Text>
            <TextInput style={styles.text_input} placeholder="TJohn Smith" />
          </View>
          <View>
            <Text>E-mail</Text>
            <TextInput
             style={styles.text_input}
              placeholder="johnsmiath@gmail.com"
            />
          </View>
          <View>
            <Text>password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.text_input}
              placeholder="abcde"
            />
          </View>
        </View>

        <View style={styles.already_memeber_view}>
          <View style={styles.text_row}>
            <View style={styles.check_box} />
            <View
              style={{
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={styles.agreement_text}>
                I agree to Terms and Condition of Arcmall
              </Text>
            </View>
          </View>
          <TouchableHighlight style={styles.remember_button}>
            <Text style={styles.remember_text}>Register</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}

SignUpAsASellerScreen.propTypes = {};

SignUpAsASellerScreen.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(SignUpAsASellerScreen);
