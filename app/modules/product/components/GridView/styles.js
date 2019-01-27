import {Dimensions} from 'react-native';

const {height: width} = Dimensions.get('window');

import {
  StyleSheet,
} from 'react-native';
import Theme, { font } from '../../../../theme/Base';
  
export const styles = StyleSheet.create({
  container: {
    height: 800,
    width: "100%"
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
 
  imageText: {
    // height: 60, 
    position: 'absolute', 
    right: 10,
    top: 25,
  },
  text: {
    ...font,
    textAlign: "right",
    color: 'white',
    fontSize: Theme.fontSizes.medium,
  },
  countText: {
    ...font,
    textAlign: "right",
    color: 'white',
    paddingTop: 5,
    fontSize: Theme.fontSizes.small,
  },
  rowStyle: {
    backgroundColor: "white", marginBottom: 10
  },
  rowStyle2: {
    backgroundColor: "white", marginBottom: 10
  },
  columnStyle: {
    backgroundColor: "white",marginRight :10
  }
});
