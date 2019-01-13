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
  info: {
    ...marginTop,
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
    fontSize: Theme.fontSizes.large,
    textAlign: 'right',
    fontWeight: Theme.fontWeight.medium,
  },
  description: {
    ...marginTop,
    flex: 1, 
  },
  descriptionText: {
    ...font,
    ...marginTop,
    flex: 1,
    fontSize: Theme.fontSizes.small,
    textAlign: 'left',
  },
});
export default styles;