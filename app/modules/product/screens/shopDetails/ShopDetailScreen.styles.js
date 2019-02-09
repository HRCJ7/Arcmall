import {
  StyleSheet,
} from 'react-native';
import Theme, { font } from '../../../../theme/Base';
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatStyle: {
    flex: 1,
    width: '100%',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 0.2,
    flexDirection:'row',
    backgroundColor: 'white',
    width: '100%',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'black',
  },
  nameText: {
    ...font,
    paddingTop: 20,
    fontWeight: Theme.fontWeight.bold,
    fontSize: Theme.fontSizes.large,
    color: 'white',
  },
  emailText: {
    ...font,
    paddingTop: 10,
    fontWeight: Theme.fontWeight.light,
    color: Theme.colors.gray,
  },
  listItem: {
    flex: 1,
    borderBottomColor: Theme.colors.darkGray,
    borderBottomWidth: 0.5,
    backgroundColor: 'white',
  },
  rightIcon: {
    paddingRight: 20,
    paddingTop: 40,
  },
  listItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
   
    justifyContent: 'center',
  },
  settingText: {
    ...font,
    flex: 1,
    textAlign: 'center',
    padding: 20,
    fontSize: Theme.fontSizes.medium,
  },
  shopName: {
    position: "absolute",
    bottom: 0,
    opacity: 0.8,
    ...font,
    flex: 1,
    width: "100%",
    height: 60,
    backgroundColor: "black",
    color: "white",
    
    textAlign: 'left',
    padding: 20,
    fontSize: Theme.fontSizes.medium,
  },
});
export default styles;