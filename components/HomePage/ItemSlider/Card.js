import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  sliderItemWidth,
  sliderItemHorizontalMargin,
  slideWidth
} from "./styles";

const Card = ({ title }) => (
  <View
    style={{
      width: sliderItemWidth,
      flex: 1,
      height: 200,
      paddingHorizontal: sliderItemHorizontalMargin,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white"
    }}
  >
    <Image
      style={styles.image}
      source={require("../../../assets/sliderimage1.png")}
    />
    <View
      style={{
        width: slideWidth,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white"
      }}
    >
      <Text
        style={{
          color: "black",
          textAlign: "center",
          marginBottom: 5,
          marginTop: 5
        }}
      >
        Ladies Wedding dress latest trend model
      </Text>
      <Text style={{ color: "#2687ad", textAlign: "center" }}>$500.00</Text>
    </View>
  </View>
);
const styles = StyleSheet.create({
  image: {
    width: "100%",
    flex: 2,
    height: "100%",
    resizeMode: "stretch"
  }
});

export default Card;
