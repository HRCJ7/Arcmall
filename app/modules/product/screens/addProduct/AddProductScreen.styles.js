
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
  smallText: {
    ...font,
    fontSize: Theme.fontSizes.medium,
    textAlign: 'left',
    color: Theme.colors.darkGray,
  },
  enumButton: {
    flex: 1,
    height: 35,
    marginBottom: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: Theme.colors.darkGray,
    justifyContent: 'center',
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
  textInput: {
     ...font,
    height: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: Theme.colors.darkGray,
    marginBottom: 30,
    fontSize: Theme.fontSizes.medium,
    textAlign: 'left',
    color: Theme.colors.darkGray,
  }
});
export default styles;