import {
    StyleSheet,
  } from 'react-native';
import Theme, {centerPaddedContainer} from '../../../../theme/Base';
   
const styles = StyleSheet.create({
  container: {
    ...centerPaddedContainer,
    height: 50,
    width: '100%',
    backgroundColor: Theme.colors.primary,
  },
  text: {
    fontSize: Theme.fontSizes.medium,
    textAlign: 'center',
    color: 'white',
  },
});
export default styles;