import { StyleSheet } from 'react-native';
import Theme, { font } from '../../../../theme/Base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderBottomColor: Theme.colors.smallText,
    borderBottomWidth: 0.5,
  },
  headingText: {
    ...font,
    fontSize: Theme.fontSizes.medium,
  },
  dateText: {
    ...font,
    fontSize: Theme.fontSizes.small,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  descriptionText: {
    ...font,
    flex: 1,
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.smallText,
    paddingTop: 30,
  },
  ratingIcon: {
    flex: 1,
    maxWidth: 14
  },
  heading: {
    flex: 1,
  },
  rating: {
    flex: 1,
    paddingTop: 15,
    flexDirection: 'row',
  }

});

export default styles;