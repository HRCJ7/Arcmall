import { StyleSheet } from "react-native";
import Theme, { font } from "../../../theme/Base";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerComponent: {
    flex: 1,
  },
  textComponent: {
    flex: 3,
  },
  descriptionText: {
    ...font,
    color: 'black',
    fontSize: Theme.fontSizes.large,
    fontWeight: Theme.fontWeight.ultraLight,
  },
  checkBoxRow: {
    flex: 1,
    marginTop: 10,
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
  },
  agreementText: {
    ...font,
    textAlign: "center",
    fontSize: Theme.fontSizes.small,
    color: "black"
  },
  backButton: {
    position: 'absolute',
    zIndex: 50,
    paddingTop: 20,
  },
  footerComponent: {
    flex: 1,
    // height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...font,
    color: 'black',
    fontSize: Theme.fontSizes.small,
    fontWeight: Theme.fontWeight.light,
    paddingTop: 20,
  },
  signUpText: {
    ...font,
    paddingTop: 20,
    textDecorationLine: 'underline',
    color: 'black',
    fontSize: Theme.fontSizes.small,
    fontWeight: Theme.fontWeight.regular,
  },
  selectRoleText: {
    ...font,
    color: 'black',
    fontSize: Theme.fontSizes.large,
    fontWeight: Theme.fontWeight.ultraLight,
  },
  wordingText: {
    ...font,
    lineHeight: 20,
    color: Theme.colors.smallText,
    fontSize: Theme.fontSizes.small,
    fontWeight: Theme.fontWeight.light,
    paddingVertical: 10,
  },
  label: {
    ...font,
    color: 'black',
    fontSize: Theme.fontSizes.small,
    fontWeight: Theme.fontWeight.light,
    paddingTop: 10,
  },
  textInput: {
    ...font,
    color: Theme.colors.smallText,
    height: 40,
    fontSize: Theme.fontSizes.small,
    fontWeight: Theme.fontWeight.light,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  acceptText: {
    ...font,
    color: 'black',
    fontSize: Theme.fontSizes.small,
    fontWeight: Theme.fontWeight.light,
  },
});
export default styles;
