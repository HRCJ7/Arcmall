import React, { Component } from "react";
import { TouchableHighlight, View, StyleSheet, Text } from "react-native";

export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonClicked: "Daily"
    };
  }
  tabButtonClicked(name) {
    console.log(name);
    // console.log("one" + this.state.dateRange[0].firstDate);
    this.setState({ isButtonClicked: name }), this.setName(name);
  }
  setName(name) {
    if (name == "Daily") {
      // console.log("Daily ", Obj.showDaily());
      this.setState({ type: "Daily", data: [] }, () => {});
    } else if (name == "Weekly") {
      // console.log("Weekly ", Obj.showWeekly());
      this.setState({ type: "Weekly", data: [] }, () => {});
    } else if (name == "Monthly") {
      // console.log("Monthly ", Obj.showMonthly());
      this.setState({ type: "Monthly", data: [] }, () => {});
    } else if (name == "All") {
      // console.log("All ", Obj.showAll());
      this.setState({ type: "All", data: [] }, () => {});
    } else {
      this.setState({ type: "Daily", data: [] }, () => {});
    }
  }
  render() {
    return (
      <View style={styles.buttons_container}>
        <TouchableHighlight
          style={[
            styles.buttons_left,
            this.state.isButtonClicked == "Daily"
              ? { backgroundColor: "#68a0cf" }
              : { backgroundColor: "#FFF" }
          ]}
          onPress={() => this.tabButtonClicked("Daily")}
          underlayColor="#8dbbe0"
        >
          <Text style={styles.submitText}>New Arrivals</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[
            styles.center_buttons,
            this.state.isButtonClicked == "Weekly"
              ? { backgroundColor: "#68a0cf" }
              : { backgroundColor: "#FFF" }
          ]}
          onPress={() => this.tabButtonClicked("Weekly")}
          underlayColor="#8dbbe0"
        >
          <Text style={styles.submitText}>Featured</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[
            styles.center_buttons,
            this.state.isButtonClicked == "Monthly"
              ? { backgroundColor: "#68a0cf" }
              : { backgroundColor: "#FFF" }
          ]}
          onPress={() => this.tabButtonClicked("Monthly")}
          underlayColor="#8dbbe0"
        >
          <Text style={styles.submitText}>Best Sellers</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[
            styles.buttons_right,
            this.state.isButtonClicked == "All"
              ? { backgroundColor: "#68a0cf" }
              : { backgroundColor: "#FFF" }
          ]}
          onPress={() => this.tabButtonClicked("All")}
          underlayColor="#8dbbe0"
        >
          <Text style={styles.submitText}>Trending</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  buttons_container: {
    height: 50,
    backgroundColor: "#FFF",
    flexDirection: "row",
    paddingTop: "1%",
    marginTop: "1%",
    marginBottom: "0.1%"
  },
  center_buttons: {
    flex: 1,
    borderColor: "#68a0cf",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "1%",
    marginRight: "1%",
    borderBottomWidth: 2
  },
  buttons_left: {
    flex: 1,
    borderColor: "#68a0cf",
    // borderBottomLeftRadius: 15,
    // borderTopLeftRadius: 15,
    marginLeft: "2%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2
  },
  buttons_right: {
    flex: 1,
    borderColor: "#68a0cf",
    // borderTopRightRadius: 15,
    // borderBottomRightRadius: 15,
    marginRight: "2%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2
  },
  submitText: {
    color: "#1468ad",
    textAlign: "center"
  }
});
