import { StyleSheet } from "react-native";
import Theme, { font } from "../../../../theme/Base";

const styles = StyleSheet.create({
  image: {
    width: "100%",
    flex: 2,
    height: "100%",
    resizeMode: "stretch"
  },
  description: {
    color: "black",
    textAlign: "left",
    marginBottom: 5,
    marginTop: 5
  },
  price: {
    flex:3,
    color: "#2687ad",
    textAlign: "left"
  },
  heart: {
    flex:1,
    color: "read",
    
  },
  textView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  }
});

export default styles;
