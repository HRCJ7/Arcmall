import React from "react";
import { View, Text, Image } from "react-native";
import {
  sliderItemWidth,
  sliderItemHorizontalMargin,
  slideWidth,
  styles
} from "./styles";
import { CachedImage } from "react-native-cached-image";

const Card = ({ item }) => (
  <View
     style={styles.container}
  >
   <CachedImage
      style={styles.image}
      resizeMode='contain'
      source={{uri: item.thumb}}
    />
    <View
      style={styles.textView}
    >
      <Text
        style={styles.textDescription}
      >
        {item.name}
      </Text>
      <Text  style={styles.text_amount}>{item.price}</Text>
    </View>
  </View>
);

export default Card;
