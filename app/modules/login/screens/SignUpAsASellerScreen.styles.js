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

  remember_button: {
    height: 50,
    backgroundColor: "#47AFA5",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10
  },
  remember_text: {
    textAlign: "center",
    fontSize: 18,
    color: "white"
  },
  space: {
    height: "5%"
  },

  already_memeber_view: {
    width: "80%",
    alignSelf: "center",
    position: "absolute",
    bottom: 60
  },

  text_row: {
    marginBottom: 10,
    alignSelf: "center",
    flexDirection: "row"
  },
  check_box: {
    marginRight: 5,
    height: 30,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    width: 30
  },
  agreement_text: {
    textAlign: "center",
    fontSize: 14,
    color: "black"
  },
  detail_view: {
    width: "80%",
    marginTop: 10,
    alignSelf: "center"
  },
  text_input: {
    height: 30
  }
});
export default styles;
