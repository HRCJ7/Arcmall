import React, { Component } from "react";
import { View} from "react-native";

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

  renderListComponent = ({ item }) => <Card title={item.title} />;

  render() {
    return (
      <View style={styles.item_slider_container}>
        <Carousel
          containerCustomStyle={{ backgroundColor: "white" }}
          contentContainerCustomStyle={{
            backgroundColor: "#ffffff",
            height: 200
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


