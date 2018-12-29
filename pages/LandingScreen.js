import React, { Component } from "react";
import {
  Platform,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  BackHandler
} from "react-native";
import { Text, View, Dimensions, Alert } from "react-native";

const { width, height } = Dimensions.get("window");

export default class LandingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Test App</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  activity_indicator_view: {
    flex: 1,
    flexDirection: "row",
    height: "40%",
    justifyContent: "space-around",
    padding: 10
  }
});
