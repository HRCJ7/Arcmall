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
  headerImage: {
    flex: 1,
    height: 150,
    width: '100%',
    resizeMode: 'cover',
  },
  featuredShopsImage: {
    flex: 1,
    height: 100,
    width: '100%',
    paddingHorizontal: 50,
  },  
  sliderView: {
    flex: 1,
    marginTop: 20,
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  },
  flatList: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: "white", 
    borderWidth: 0.5, 
    borderColor: 'gray', 
    borderRadius: 10,
  },
  searchBarView: {
    flex: 1,
    padding: 10,
  },
  seeMoreView: {
    paddingHorizontal: 15,
    paddingTop: 10,
  }
});
export default styles;