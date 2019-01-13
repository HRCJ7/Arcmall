import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  styles
} from "./styles";
export default class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.see_more_bar}>
        <Text style={styles.see_more_bar_text1}>{this.props.name}</Text>

        <TouchableOpacity
          style={styles.see_mre_bar_text2}
          //   onPress={() => this.tabButtonClicked("Daily")}
        >
          <Text style={styles.see_mre_bar_text2}>See more </Text>
          <Icon name="arrow-right" size={15} color="#000000" />
        </TouchableOpacity>
      </View>
    );
  }
}

