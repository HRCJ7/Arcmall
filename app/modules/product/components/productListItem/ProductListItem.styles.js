import { StyleSheet } from 'react-native';
import Theme, { font } from '../../../../theme/Base';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemContainer: {
    height: 150,
    flexDirection: 'row',
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  itemImage: {
    flex: 1,
    aspectRatio: 1,
  },
  itemContent: {
    flex: 2,
    flexDirection: 'column',
    padding: 10
  },
  itemDescription: {
    flex: 1,
    paddingTop: 10,
  },
  itemDescriptionText: {
    ...font,
    flex: 1,
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.smallText,
  },
  itemDetails: {
    flex : 1,
    flexDirection: 'row'
  },
  ratingIcon: {
    flex: 1,
    maxWidth: 14
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomRowAction : {
    flex: 1,
    flexDirection : 'row'
  },
  bottomRowActionText: {
    ...font,
    fontSize: 10,
    marginLeft: 10,
    marginTop: 5
  },
  itemPrice: {
    ...font,
    flex: 2,
    fontSize: Theme.fontSizes.large,
    textAlign: 'right',
    fontWeight: Theme.fontWeight.semibold,
  },
  blueText: {
    ...font,
    fontSize: Theme.fontSizes.xSmall,
    color: Theme.colors.secondary,
    fontWeight: Theme.fontWeight.light,
  },
  starContainer: {
    flex: 1,
    alignItems: 'flex-end'
  }
});

export default styles;