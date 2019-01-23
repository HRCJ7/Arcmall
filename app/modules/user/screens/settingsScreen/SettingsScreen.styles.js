import {
  StyleSheet,
} from 'react-native';
import Theme, { font } from '../../../../theme/Base';
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingText: {
    flex: 1,
    ...font,
    textAlign: 'left',
    padding: 20,
    fontSize: Theme.fontSizes.medium,
  },
  listItem: {
    flex: 1,
    borderBottomColor: Theme.colors.darkGray,
    borderBottomWidth: 0.5,
  },
  rightIcon: {
    paddingRight: 20,
    paddingTop: 5
  },
  listItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkBox: {
    backgroundColor: 'transparent', 
    borderWidth: 0,
  }
});
export default styles;