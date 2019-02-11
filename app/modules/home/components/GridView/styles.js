import { Dimensions } from "react-native";

const { height: width } = Dimensions.get("window");

import { StyleSheet } from "react-native";
import Theme, { font } from "../../../../theme/Base";

export const styles = StyleSheet.create({
  container: {
    height: 280,
    width: "100%"
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 3,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 10
  },

  imageText: {
    // height: 60,
    position: "absolute",
    right: 10,
    top: 25
  },
  text: {
    ...font,
    textAlign: "right",
    color: "black",
    fontSize: Theme.fontSizes.medium
  },
  countText: {
    ...font,
    textAlign: "right",
    color: "black",
    paddingTop: 5,
    fontSize: Theme.fontSizes.small
  },
  rowStyle: {
    backgroundColor: "white",
    marginBottom: 5,
    marginRight: 5
  },
  rowStyle1: {
    backgroundColor: "white",
    marginBottom: 5,
    marginRight: 5
  }
});
