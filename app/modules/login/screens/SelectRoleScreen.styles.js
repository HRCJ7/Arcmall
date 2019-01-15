import { StyleSheet } from "react-native";
import Theme, { font } from "../../../theme/Base";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  selectRoleText: {
    ...font,
    color: 'black',
    fontSize: Theme.fontSizes.large,
    fontWeight: Theme.fontWeight.ultraLight,
  },
  descriptionText: {
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
  headerComponent: {
    flex: 1,
  },
  textComponent: {
    flex: 2,
  },
  footerComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    flexDirection: 'row',
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
  backButton: {
    left: -15,
    position: 'absolute',
    zIndex: 50,
  }
});
export default styles;
