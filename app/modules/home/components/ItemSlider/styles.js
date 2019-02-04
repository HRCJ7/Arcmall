import { Dimensions,StyleSheet } from "react-native";
import Theme, { font } from "../../../../theme/Base";

const { width: viewportWidth } = Dimensions.get("window");

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

export const styles = StyleSheet.create({
  container: {
    flex:1,
    width: 140,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: Theme.colors.gray,
    borderRadius: 5,
  },
  image: {
    flex: 1,
    height: 140,
    width: '100%',
  },
  textView: {
    flex: 1,
    height: 70,
    width: '100%',
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8ff",
  },
  textDescription: {
    ...font,
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.smallText,
    color: "black",
    textAlign: "center",
  },
  text_amount: {
    color: "#2687ad",
    paddingTop: 5,
    textAlign: "center"
  },
  list: {
    flex: 1, 
    marginHorizontal: 10,
    // height: 210,
  }
});

export const slideWidth = wp(39.4);
export const sliderItemHorizontalMargin = wp(4);

export const sliderWidth = viewportWidth;
export const sliderItemWidth = slideWidth + sliderItemHorizontalMargin * 2;
