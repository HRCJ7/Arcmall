import {
  StyleSheet,
  Dimensions
} from 'react-native';

let {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  app_image: {
    flex: 1,
    width: width,
    height: 150,
    resizeMode: 'cover',
  },
  featuredShopsImage: {
    flex: 1,
    height: 150,
    resizeMode: 'cover',
    paddingHorizontal: 50,
  },  
  slider_view: {
    flex: 1,
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  },
  flatList: {
    flex: 1,
  },
});
export default styles;