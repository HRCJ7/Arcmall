import { StyleSheet } from "react-native";
import Theme, { font } from "../../../../theme/Base";

const marginTop = {
  marginTop: 15
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  flatStyle: {
    height: "40%"
  },
  itemInfoContainer: {
    flex: 2,
    marginTop: "10%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
  bottomRowAction: {
    flex: 1,
    width: "80%",

    flexDirection: "row"
  },
  bottomTotalAction: {
    flex: 1,
    marginTop: "4%",
    width: "80%",

    flexDirection: "row"
  },
  textBold: {
    ...font,

    flex: 1,
    fontSize: Theme.fontSizes.small,

    textAlign: "left",
    fontWeight: Theme.fontWeight.bold
  },
  textNormal: {
    ...font,
    flex: 1,

    fontSize: Theme.fontSizes.small,
    textAlign: "right",
    fontWeight: Theme.fontWeight.regular
  },
  line: {
    width: "80%",
    borderBottomColor: "black",
    borderBottomWidth: 1
  }
});
export default styles;
