import React, { Component } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
const arr = ["1", "1", "1", "1", "1", "1", "1", "1", "1"];
import Card from "../ItemSlider/Card";

export default class CollectionView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _renderItem = ({ item }) => {
    return <Card title="{item.title}" />;
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          numColumns={3}
          data={arr}
          renderItem={this._renderItem}
          columnWrapperStyle={styles.row}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 400
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  }
});
