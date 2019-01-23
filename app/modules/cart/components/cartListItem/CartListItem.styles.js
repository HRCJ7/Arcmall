import { StyleSheet } from 'react-native';
import Theme, { font } from '../../../../theme/Base';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemContainer: {
    height: 150,
    
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  itemImageContainer: {
    flex:3,
    flexDirection: 'row',
    overflow: 'hidden',
   
  },
  itemInfoContainer: {
    flex:1,
    flexDirection: 'row',
    overflow: 'hidden',
   
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
  minusAction: {
    ...font,
    fontSize: 10,
    marginRight:5
  
  },
  plusAction: {
    ...font,
    fontSize: 10,
    marginLeft:5
  
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
    fontSize: Theme.fontSizes.large,
    textAlign: 'center',
    fontWeight: Theme.fontWeight.semibold,
  },
  itemCount: {
    flex: 3,
    flexDirection : 'row'
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
    flex: 1,
    fontSize: Theme.fontSizes.small,
    textAlign: 'right',
    fontWeight: Theme.fontWeight.bold,
  },
  textNormal: {
    ...font,
    flex: 1,
    marginTop:10,
    fontSize: Theme.fontSizes.small,
    textAlign: 'left',
    fontWeight: Theme.fontWeight.regular,
  }
  
});

export default styles;