import { StyleSheet } from 'react-native';
import Theme, { font } from '../../../../theme/Base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  headingText: {
    ...font,
    fontSize: Theme.fontSizes.medium,
  },
  dateText: {
    ...font,
    fontSize: Theme.fontSizes.small,
  },
  descriptionText: {
    ...font,
    flex: 1,
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.smallText,
  },
  ratingIcon: {
    flex: 1,
    maxWidth: 14
  },
  heading: {
    height: 40,
  },

});

export default styles;