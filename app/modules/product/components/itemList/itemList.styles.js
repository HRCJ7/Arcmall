import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemContainer: {
    height: 200,
    flexDirection: 'row',
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  itemImage: {
    flex: 1,
    height: 200
  },
  itemContent: {
    flex: 2,
    flexDirection: 'column',
    padding: 20
  },
  itemDescription: {
    flex: 1,
    fontSize: 15
  },
  itemDetails: {
    flex : 1,
    flexDirection: 'row'
  },
  itemRatingIcon: {
    flex: 1,
    maxWidth: 25
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
    fontSize: 10,
    marginLeft: 10,
    marginTop: 5
  },
  itemPrice: {
    flex: 2,
    fontSize: 20,
    textAlign: 'right',
    fontWeight: 'bold'
  },
});

export default styles;