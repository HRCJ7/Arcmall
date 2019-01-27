import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import {
  styles
} from "./SeeMoreTitleBar.styles";
import Strings from "../../../shared/localization/localization";
export default class SeeMoreTitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>{this.props.name}</Text>

        <TouchableOpacity
          style={styles.seeMoreContainer}
          onPress={this.props.onPress}
        >
          <Text style={styles.seeMoreText}>{Strings.SEE_MORE}</Text>
          <Icon name="chevron-right" size={20} color="#000000" />
        </TouchableOpacity>
      </View>
    );
  }
}

