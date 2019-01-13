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
import styles from "./SignUpAsABuyerScreen.styles";
import { navigateToMainTabScreen } from "../../../navigation/RootNavActions";
import Icon from "react-native-vector-icons/FontAwesome";

class SignUpAsABuyerScreen extends React.Component<any, any> {
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
        <Text style={styles.select_your_role}>Sign up as a Buyer</Text>
        <Text style={styles.description}>
          A wonderful collection of products awaits you.Let's get your all set
          up to explore a world of glamourous fashion
        </Text>

        <View style={styles.detail_view}>
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

SignUpAsABuyerScreen.propTypes = {};

SignUpAsABuyerScreen.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(SignUpAsABuyerScreen);
