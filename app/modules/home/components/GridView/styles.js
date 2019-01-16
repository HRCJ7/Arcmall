import {Dimensions} from 'react-native';

const {height: width} = Dimensions.get('window');

import {
  StyleSheet,
} from 'react-native';
import Theme, { font } from '../../../../theme/Base';
  
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
  },
  image: {
    flex: 1,
    height: 150,
    width: '100%',
    // resizeMode: 'cover'
  },
  imageText: {
    // height: 60, 
    position: 'absolute', 
    right: 10,
    top: 75,
  },
  text: {
    ...font,
    textAlign: "right",
    color: 'black',
    fontSize: Theme.fontSizes.medium,
  },
  countText: {
    ...font,
    textAlign: "right",
    color: 'black',
    paddingTop: 5,
    fontSize: Theme.fontSizes.small,
  }
});
