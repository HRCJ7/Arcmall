import { StyleSheet, Dimensions } from "react-native";
import Theme, { font, centerPaddedContainer } from "../../../theme/Base";

const {height, width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerComponent: {
    flex: 1,
  },
  textComponent: {
    flex: 2,
  },
  logo: {
    flex: 1,
    width: width/1.7,
    alignSelf: 'flex-start',
    paddingBottom: 40,
  },
  descriptionText: {
    ...font,
    color: 'black',
    fontSize: Theme.fontSizes.large,
    fontWeight: Theme.fontWeight.ultraLight,
  },
  signInContinueText: {
    ...font,
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
    paddingTop: 20,
  },
  textInput: {
    ...font,
    color: Theme.colors.smallText,
    height: 30,
    fontSize: Theme.fontSizes.small,
    fontWeight: Theme.fontWeight.light,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },
  forgotPasswordText: {
    ...font,
    paddingTop: 20,
    color: 'black',
    fontSize: Theme.fontSizes.small,
    fontWeight: Theme.fontWeight.light,
    textDecorationLine: 'underline',
    textAlign:'right',
  },
  footerComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    flexDirection: 'row',
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
    position: 'absolute',
    zIndex: 50,
    padding: 10,
    paddingTop: 20,
  }
});
export default styles;
