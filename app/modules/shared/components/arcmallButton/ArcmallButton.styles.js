import {
    StyleSheet,
  } from 'react-native';
import Theme, {centerPaddedContainer, font} from '../../../../theme/Base';
   
const styles = StyleSheet.create({
  container: {
    ...centerPaddedContainer,
    borderRadius: 5,
    height: 50,
    width: '100%',
    backgroundColor: Theme.colors.primary,
  },
  containerInverse: {
    ...centerPaddedContainer,
    borderRadius: 5,
    borderColor: Theme.colors.primary,
    borderWidth: 1,
    height: 50,
    width: '100%',
    backgroundColor: 'white',
  },
  text: {
    ...font,
    fontSize: Theme.fontSizes.medium,
    textAlign: 'center',
    color: 'white',
  },
  textInverse: {
    ...font,
    fontSize: Theme.fontSizes.medium,
    textAlign: 'center',
    color: Theme.colors.primary,
  },
});
export default styles;