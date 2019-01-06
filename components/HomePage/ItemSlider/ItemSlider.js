import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import Carousel from "react-native-snap-carousel";

// You can import from local files
import { sliderWidth, sliderItemWidth } from "./styles";
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

  renderListComponent = ({ item }) => <Card title={item.title} />;

  render() {
    return (
      <View style={styles.container}>
        <Carousel
          containerCustomStyle={{ backgroundColor: "white" }}
          contentContainerCustomStyle={{
            backgroundColor: "white",
            height: 150
          }}
          data={this.state.data}
          renderItem={this.renderListComponent}
          sliderWidth={sliderWidth}
          itemWidth={sliderItemWidth}
          activeSlideAlignment={"start"}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    paddingTop: 10,
    backgroundColor: "#ecf0f1"
  }
});
