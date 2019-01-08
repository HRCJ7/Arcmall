import React, { Component } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
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
const styles = StyleSheet.create({
  see_more_bar: {
    marginTop: "2%",
    flexDirection: "row",
    height: "3%",
    width: "100%"
  },
  see_more_bar_text1: {
    flex: 1,
    textAlign: "left",
    marginLeft: 5,
    justifyContent: "flex-start"
  },
  see_mre_bar_text2: {
    flex: 1,
    flexDirection: "row",
    textAlign: "right",
    marginRight: 5,
    justifyContent: "flex-end"
  }
});
