import { Dimensions,StyleSheet } from "react-native";

const { width: viewportWidth } = Dimensions.get("window");

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

export const styles = StyleSheet.create({
  card_container: {
    width: sliderItemWidth,
   flex:1,
    paddingHorizontal: sliderItemHorizontalMargin,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8ff",
    marginLeft: "4%",
    marginRight : "4%"
  },
  image: {
    width: "100%",
    flex: 2,
    height: "100%",
    resizeMode: "stretch"
  },
  text_view: {
    width: slideWidth,
    flex: 1,
    alignItems: "center",
    marginBottom:"8%",
    justifyContent: "center",
    backgroundColor: "#f8f8ff"
  },
  text_description: {
    color: "black",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 5
  },
  text_amount: {
    color: "#2687ad",
    textAlign: "center"
  },
  item_slider_container: {
   flex:4,
    backgroundColor: "#ffffff"
  }
});

export const slideWidth = wp(39.4);
export const sliderItemHorizontalMargin = wp(4);

export const sliderWidth = viewportWidth;
export const sliderItemWidth = slideWidth + sliderItemHorizontalMargin * 2;
