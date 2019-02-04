import { StyleSheet } from "react-native";
import Theme, { font } from "../../../../theme/Base";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    flex: 1,
    height: "100%",
    resizeMode: "stretch"
  },
  description: {
    color: "black",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 5
  },
  price: {
    color: "#2687ad",
    textAlign: "center"
  },
  textView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  }
});

export default styles;
