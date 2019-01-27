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
  },
  addressView: {
    flex: 1, 
    padding: 20,
    paddingLeft: 30,
    borderBottomColor: Theme.colors.darkGray,
    borderBottomWidth: 0.5,
  },
  addressName: {
    ...font,
    fontWeight: Theme.fontWeight.medium,
    fontSize: Theme.fontSizes.sMedium,
  },
  address: {
    ...font,
    paddingTop: 5,
    fontWeight: Theme.fontWeight.light,
    fontSize: Theme.fontSizes.small,
  },
  formStyle: {
    flex: 1,
    padding: 20
  },
  addText: {
    ...font,
    color: 'white',
    paddingRight: 10,
  }
});
export default styles;