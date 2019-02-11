import { StyleSheet, Dimensions } from 'react-native';
import Theme, { font } from '../../../../theme/Base';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  itemContainer: {
    flex: 1,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  swipeout: {
    backgroundColor: 'white',
  },
  itemImageContainer: {
    flex:3,
    flexDirection: 'row',
  },
  itemInfoContainer: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  itemImage: {
    flex: 1,
  },
  itemSelect: {
    flex: 0.25,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    // alignItems: 'center',
  },
  bottomRowAction : {
    // flex: 1,
    // width: 100,
    paddingLeft: 10,
    flexDirection : 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  minusAction: {
    ...font,
    fontSize: Theme.fontSizes.tiny,
  },
  plusAction: {
    ...font,
    fontSize: Theme.fontSizes.tiny,
    // marginLeft:5
  },
  itemPrice: {
    ...font,
    flex: 6,
    fontSize: Theme.fontSizes.large,
    textAlign: 'left',
    fontWeight: Theme.fontWeight.semibold,
  },
  count: {
    ...font,
    fontSize: Theme.fontSizes.small,
    textAlign: 'center',
    color: 'black',
    padding: 10,
    fontWeight: Theme.fontWeight.light,
  },
  text: {
    ...font,
    fontSize: Theme.fontSizes.small,
    textAlign: 'center',
    color: 'black',
    paddingTop: 3,
    fontWeight: Theme.fontWeight.light,
  },
  itemCount: {
    flex: 1,
    // flexDirection : 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueText: {
    ...font,
    fontSize: Theme.fontSizes.xSmall,
    color: Theme.colors.secondary,
    fontWeight: Theme.fontWeight.light,
  },
  textBold: {
    ...font,
    marginTop:10,
    fontSize: Theme.fontSizes.small,
    textAlign: 'left',
    fontWeight: Theme.fontWeight.bold,
  },
  textNormal: {
    ...font,
    marginTop:10,
    fontSize: Theme.fontSizes.small,
    textAlign: 'left',
    fontWeight: Theme.fontWeight.regular,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 20/2,
    backgroundColor: Theme.colors.secondary
}
  
});

export default styles;