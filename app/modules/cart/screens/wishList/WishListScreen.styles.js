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
  searchBar: {
    flex: 1,
    backgroundColor: "white", 
    borderWidth: 0.5, 
    borderColor: 'gray', 
    borderRadius: 10,
  },
  searchBarView: {
    padding: 10,
    flexDirection: 'row',
  },
  cancelButton: {
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 10
  },
  cancelButtonText: {
    color: Theme.colors.primary,
  }
});
export default styles;