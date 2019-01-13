// @flow
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  iconBackground: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  spinnerLarge: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  spinnerSmall: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  spinnerInvisible: {
    height: 0,
    width: 0,
  },
});

export default styles;
