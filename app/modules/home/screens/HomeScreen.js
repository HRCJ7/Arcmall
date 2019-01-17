// @flow
import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
  AsyncStorage,
} from 'react-native';
import {SearchBar} from "react-native-elements";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './HomeScreen.styles';
import ItemSlider from "../components/ItemSlider/ItemSlider";
import Card from "../components/ItemSlider/Card";
import SeeMoreTitleBar from "../components/seeMoreTitleBar/SeeMoreTitleBar";
import GridView from "../components/GridView/GridView";
import ProductActions from '../../product/actions/ProductActions';
import LoadingIndicator from '../../shared/components/loadingIndicator/LoadingIndicator';
import LoginActions from '../../login/actions/LoginActions';
import {navigateToItemListScreen, navigateToAllCategories} from '../../../navigation/RootNavActions';

const arr = ["1", "1", "1", "1", "1", "1", "1", "1", "1"];
class HomeScreen extends React.Component<any, any> {
  static defaultProps: any

  constructor(props) {
    super(props);

    this.state = {
      categories: null,
    };
    this.getCategoryList(props);
  }

  componentDidMount() {
    
  }

  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = true;
    const {categoryList: newCategories} = nextProps;
    const {categoryList: oldCategories} = this.props;
    
    if (!oldCategories && newCategories) {
      this.saveCategoryList(nextProps.categoryList)
      shouldUpdate = false;
    }
    
    return shouldUpdate;
  }

  componentDidUpdate() {
    
  }

  saveCategoryList = async (categories) => {
    this.setState({
      categories: categories,
    })
    await AsyncStorage.setItem('categories', JSON.stringify(categories));
  }

  getCategoryList = async (props) => {
    let categories = await AsyncStorage.getItem('categories');
    console.log(categories)
    if (!categories) {
      this.props.dispatch(ProductActions.getCategoryList());
    } else {
      this.setState({
        categories: JSON.parse(categories),
      })
    }

    let user = await AsyncStorage.getItem('user');
    this.props.dispatch(LoginActions.postLogin({categories, user}));
    
  }

  _renderItem = ({ item }) => {
    return <Card 
    title="{item.title}" />;
  };

  handleOnGridPress = (categories) => {
    this.props.navigation.dispatch(navigateToItemListScreen({categories}))
  }

  hanleOnSeeMoreCategoriesPressed = () => {
    this.props.navigation.dispatch(navigateToAllCategories());
  }

  render() {
    const {isLoading} = this.props;
    const {categories} = this.state;
    console.log(categories)
    let content = null;
    if(!isLoading && categories) {
      content = (
        <ScrollView
          style={styles.container}>
          <View style={styles.container}>
            <View style={styles.searchBarView}>
              <SearchBar
                containerStyle={styles.searchBar}
                inputStyle={{ backgroundColor: "white" }}
                lightTheme
                placeholder="Search"
              />
            </View>
            <Image
              style={styles.headerImage}
              resizeMode='stretch'
              source={require("../../../../assets/arcmall.png")}
            />
            <View style={styles.sliderView}>
              <ItemSlider />
            </View>
            <View style={styles.seeMoreView}>
              <SeeMoreTitleBar name="Featured Shops" />
              <Image
                style={styles.featuredShopsImage}
                resizeMode='contain'
                source={require("../../../../assets/salepromo.png")}
              /> 
              <SeeMoreTitleBar 
                name="Top Categories"
                onPress={this.hanleOnSeeMoreCategoriesPressed}
              />
              <GridView
                categories={categories}
                onPress={this.handleOnGridPress}
              />
            </View>
            
            {/* <FlatList
              style={{flex: 1}}
              numColumns={3}
              data={arr}
              renderItem={this._renderItem}
              columnWrapperStyle={styles.row}
            /> */}
          </View>
        </ScrollView>
      )
    } else {
      content = (
        <View style={styles.container}>
          <LoadingIndicator />
        </View>
      )
    }
      
      return content;
  }
}

HomeScreen.propTypes = {

};

HomeScreen.defaultProps = {

};

const mapStateToProps = (state, ownProps) => {
  return {
    categoryList: state.product.categoryList,
    isLoading: state.product.categoryListLoading,
  };
};

export default connect(mapStateToProps)(HomeScreen);
