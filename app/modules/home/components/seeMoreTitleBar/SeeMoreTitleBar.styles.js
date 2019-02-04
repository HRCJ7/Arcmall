import { StyleSheet } from "react-native";
import Theme, { font } from "../../../../theme/Base";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 15,
    flexDirection: "row",
  },
  seeMoreTextView: {
    flex: 1,
  },
  titleText: {
    flex: 1,
    ...font,
    textAlign: "left",
    color: 'black',
    fontSize: Theme.fontSizes.medium,
  },
  seeMoreContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'flex-end',
  },
  seeMoreText: {
    ...font,
    textAlign: "right",
    color: 'black',
    fontSize: Theme.fontSizes.small,
  }
});