import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background_image: {
    width: "100%",
    height: "100%"
  },
  back_button: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: "flex-end",
    marginTop: "10%",
    marginLeft: "5%",
    position: "absolute"
  },
  select_your_role: {
    marginTop: "50%",
    width: "80%",
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "black"
  },
  description: {
    marginTop: "10%",
    width: "80%",
    alignSelf: "center",
    fontSize: 18,
    color: "black",
    marginBottom: "10%"
  },
  sign_up_as_a_buyer_button: {
    flexGrow: 0.1,
    height: null,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#47AFA5"
  },
  sign_up_as_a_buyer_text: {
    textAlign: "center",
    fontSize: 20,
    color: "#47AFA5"
  },
  sign_up_as_a_seller_button: {
    flexGrow: 0.1,
    height: null,
    backgroundColor: "#47AFA5",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#47AFA5"
  },
  sign_up_as_a_seller_text: {
    textAlign: "center",
    fontSize: 20,
    color: "white"
  },
  space: {
    height: "5%"
  },

  already_memeber_view: {
    width: "100%",
    alignSelf: "center",
    position: "absolute",
    bottom: 50
  },
  boader_line: {
    width: "80%",
    marginBottom: 20,
    borderBottomColor: "black",
    borderBottomWidth: 3,
    alignSelf: "center"
  },

  text_row: {
    alignSelf: "center",
    flexDirection: "row"
  }
});
export default styles;
