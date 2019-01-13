import {StyleSheet} from 'react-native';
import Theme, {font} from '../../../../theme/Base';
import {Header} from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Theme.colors.gray,
  },
  header: {
    height: 10,
    backgroundColor: Theme.colors.grayBackground,
  }
});

export default styles;
