import {
  StyleSheet,
} from 'react-native';
import Theme, {font} from '../../../../theme/Base';

const marginTop = {
  marginTop: 15,
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headingText: {
    ...font,
    fontSize: Theme.fontSizes.medium,
    paddingTop: 200,
    alignSelf: 'center',
  },
});
export default styles;