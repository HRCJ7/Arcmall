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
    flex: 1,
  },
  itemInfoContainer: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  bottomRowAction: {
    flex: 1,
    width: "80%",
    flexDirection: "row",
  },
  bottomTotalAction: {
    flex: 1,
    marginTop: 5,
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
  bold: {
    ...font,
    flex: 1,
    fontSize: Theme.fontSizes.small,
    textAlign: "left",
    alignSelf: 'center',
    fontWeight: Theme.fontWeight.bold
  },
  normal: {
    ...font,
    fontSize: Theme.fontSizes.small,
    
    fontWeight: Theme.fontWeight.regular
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  optionContainer: {
    // flex: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    flexDirection: 'row',
    width: "80%",
    borderColor: Theme.colors.darkGray,
    borderRadius: 5,
    borderWidth: 0.5,
  },
  errorText: {
    ...font,
    flex: 1, 
    color: 'black', 
    justifyContent: 'center',
    textAlign: 'center', 
    paddingTop: 200,
  }
});
export default styles;
