import React from "react";
import { View, Text, Image } from "react-native";
import {
  sliderItemWidth,
  sliderItemHorizontalMargin,
  slideWidth,
  styles
} from "./styles";

const Card = ({ title }) => (
  <View
     style={styles.container}
  >
   <Image
      style={styles.image}
      resizeMode='stretch'
      source={require("../../../../../assets/sliderimage1.png")}
    />
    <View
      style={styles.textView}
    >
      <Text
        style={styles.textDescription}
      >
        Ladies Wedding dress latest trend model
      </Text>
      <Text  style={styles.text_amount}>$500.00</Text>
    </View>
  </View>
);

export default Card;
