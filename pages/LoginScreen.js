/*
 *
 * This class includes all the cords related to the Login screen.
 * All the authentication and user login methods forget password handeling here.
 *
 */
import React, { Component } from "react";
import Config from "../utility/Config";
import {
  View,
  Text,
  Image,
  Alert,
  NetInfo,
  Platform,
  TouchableHighlight,
  ImageBackground,
  TextInput,
  AsyncStorage,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import validate from "../utility/Validation";

class LoginScreen extends Component {
  state = {};

  render() {
    return <View />;
  }
}

const styles = StyleSheet.create({});
