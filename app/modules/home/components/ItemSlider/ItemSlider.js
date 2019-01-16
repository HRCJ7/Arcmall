import React, { Component } from "react";
import {View, FlatList} from "react-native";

import Carousel from "react-native-snap-carousel";

import { sliderWidth, sliderItemWidth,styles } from "./styles";
import Card from "./Card";

export default class ItemSlider extends Component {
  state = {
    data: [
      {
        title: "1"
      },
      {
        title: "2"
      },
      {
        title: "3"
      },
      {
        title: "4"
      }
    ]
  };

  renderListComponent = ({ item }) => {

    return (
      <View style={styles.list}>
        <Card title={item.title} />
      </View>
    )

  };

  render() {
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={this.state.data}
        renderItem={this.renderListComponent}
      />
    );
  }
}


