import {StyleSheet} from 'react-native';
import Theme, {font} from '../../../../theme/Base';
import {Header} from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    height: Header.HEIGHT - 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Theme.colors.primary,
  },
  titleText: {
    ...font,
    color: 'white',
    fontSize: Theme.fontSizes.xMedium,
  },
  leftItemWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  leftItemWrapperTop: {
    flex: 1,
  },
  centerItemWrapper: {
    justifyContent: 'center',
  },
  rightItemWrapper: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  titleLeftContainer: {
    flex: 10,
    alignItems: 'flex-start',
  },
  titleCenterContainer: {
    flex: 4,
    alignItems: 'center',
  },
});

export default styles;
