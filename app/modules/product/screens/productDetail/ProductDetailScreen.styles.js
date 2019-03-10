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
  imageSwiper: {
    height: 300,
  },
  image: {
    flex: 1,
    marginVertical: 10,
  },
  titleText: {
    ...font,
    fontSize: Theme.fontSizes.xMedium,
  },
  headingText: {
    ...font,
    fontSize: Theme.fontSizes.medium,
  },
  info: {
    flex: 1, 
    flexDirection:'row',
  },
  categoryText: {
    ...font,
    flex: 1,
    fontSize: Theme.fontSizes.small,
    textAlign: 'left',
    color: Theme.colors.secondary,
  },
  priceText: {
    ...font,
    flex: 1,
    fontSize: Theme.fontSizes.xLarge,
    textAlign: 'right',
    fontWeight: Theme.fontWeight.medium,
  },
  smallText: {
    flex: 1,
    ...font,
    ...marginTop,
    fontSize: Theme.fontSizes.small,
    textAlign: 'left',
    color: Theme.colors.smallText,
  },
  contactSellerText: {
    ...font,
    flex: 1,
    fontSize: Theme.fontSizes.small,
    textAlign: 'right',
    color: Theme.colors.secondary,
  },
  description: {
    marginTop: 40,
    flex: 1, 
  },
  contactSellerView: {
    flexDirection: 'row',
  },
  rightButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  descriptionText: {
    ...font,
    ...marginTop,
    flex: 1,
    fontSize: Theme.fontSizes.xSmall,
    textAlign: 'left',
  },
  blueButton: {
    right: 0,
    alignSelf: 'flex-end',
  },
  blueButtonText: {
    marginTop: 10,
    ...font,
    flex: 1,
    fontSize: Theme.fontSizes.xSmall,
    textAlign: 'right',
    color: Theme.colors.secondary,
  },
  categoryText: {
    marginTop: 10,
    ...font,
    flex: 1,
    fontSize: Theme.fontSizes.xSmall,
    textAlign: 'left',
    color: Theme.colors.secondary,
  },
  ratings: {
    ...marginTop,
    flexDirection: 'row',
  },
  ratingIcon: {
    color: Theme.colors.secondary,
    marginRight: 10,
  },
  optionContainer: {
    // flex: 1,
    borderBottomColor: Theme.colors.darkGray,
    borderBottomWidth: 0.5,
  },
  optionsHeadingText: {
    ...font,
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.darkGray,
    marginLeft: -16,
  },
  ratingItem: {
    paddingTop: 20,
    width: 200,
  },
});
export default styles;