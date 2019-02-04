// @flow
import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
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
import {navigateToAllCategories, navigateToProductList, navigateToItemListScreen, navigateToItemDetails} from '../../../navigation/RootNavActions';
import Strings from '../../shared/localization/localization';
import {COOKIE_LANGUAGE_CHINESE, CODE_CHINESE, CODE_ENGLISH, COOKIE_LANGUAGE, STORAGE_USER, STORAGE_CATEGORIES} from '../../../Constants';
import { getUser } from '../../../store/AsyncStorageHelper';
import CartActions from '../../cart/actions/CartActions';
import ProductListScreen from '../../product/screens/productList/ProductListScreen';
import { getFeaturedItems, getLoginStatus, getLatestItems } from './HomeApis';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 50;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};

const LATEST_ITEM_COUNT = 20;
let itemStart = 0;
let waitingTilResponse = false;
class HomeScreen extends React.Component<any, any> {
  static defaultProps: any
  static navigationOptions: any = ({navigation}) => ({
    title: Strings.HOME,
  });

  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      languageLoading: true,
      featuredItems: null,
      featuredItemsLoading: true,

      latestItems: [],
      // latestItemsStart: 0,
    };
    
    this.getLoginStatus();
    this.getCategoryList(props);
    this.handleScrollEndReached();
    this.getFeaturedItems();
    

  }

  componentDidMount() {
    // Cookie.get('http://arcmall.com/').then((cookie) => console.log('cookie', cookie));
  }

  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = true;
    const {categoryList: newCategories, user: newUser} = nextProps;
    const {categoryList: oldCategories, user: oldUser} = this.props;
    
    if (!oldCategories && newCategories) {
      this.saveCategoryList(nextProps.categoryList)
      shouldUpdate = false;
    }

    let oldId = 0;
    let newId = 0;
    if(oldUser) {
      oldId = oldUser.customer_id;
    }
    if (newUser) {
      newId = newUser.customer_id;
    }

    if (oldId != newId) {
      this.getCategoryList(nextProps);
    }
    
    return shouldUpdate;
  }

  componentDidUpdate() {
    
  }

  getLoginStatus = async () => {
    const response = await getLoginStatus();
    const user = await getUser();
    if (response.message === 'false' && user) {
      alert('Your session is expired, please log in again');
      this.props.dispatch(LoginActions.signOut());
    }
  }


  getFeaturedItems = async () => {
    let items = await getFeaturedItems();
    this.setState({
      featuredItems: items.products,
      featuredItemsLoading: false,
    })
  }

  saveCategoryList = async (categories) => {
    this.setState({
      categories: categories,
    })
    await AsyncStorage.setItem(STORAGE_CATEGORIES, JSON.stringify(categories));
  }

  getCategoryList = async (props) => {
    let categories = await AsyncStorage.getItem(STORAGE_CATEGORIES);
    if (!categories) {
      this.props.dispatch(ProductActions.getCategoryList());
    } else {
      this.setState({
        categories: JSON.parse(categories),
      })
    }

    let language = await AsyncStorage.getItem(COOKIE_LANGUAGE);
    language = language === COOKIE_LANGUAGE_CHINESE? CODE_CHINESE: CODE_ENGLISH;
    Strings.setLanguage(language);

    let user = await getUser();
    this.props.dispatch(LoginActions.postLogin({categories, user}));
    this.setState({
      languageLoading: false,
    })
  }

  handleOnGridPress = (categories) => {
    this.props.navigation.dispatch(navigateToItemListScreen({categories}))
  }

  hanleOnSeeMoreCategoriesPressed = () => {
    this.props.navigation.dispatch(navigateToAllCategories());
  }

  handleOnSearchPress = () => {
    this.props.navigation.dispatch(navigateToProductList({
      fromHome: true,
    }))
  }

  handleScrollEndReached = async () => {
    if (!waitingTilResponse) {
      let start = itemStart;
      console.log(start)
      waitingTilResponse = true;
      let response = await getLatestItems(start, LATEST_ITEM_COUNT);
      itemStart = start + LATEST_ITEM_COUNT;
      waitingTilResponse = false;
      let {latestItems, latestItemsStart} = this.state;
      if (response.products.length > 0) {
        this.setState({
          latestItems: latestItems.concat(response.products),
        })
      }
    }
    
  }

  render() {
    const {isLoading} = this.props;
    const {categories, languageLoading} = this.state;
    let content = null;
    if(!isLoading && categories) {
      content = (
        <ScrollView
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              this.handleScrollEndReached();
            }
          }}
        scrollEventThrottle={400}
          style={styles.container}>
          <View style={styles.container}>
            <View style={styles.searchBarView}>
              <SearchBar
                onFocus={() => {
                  this.handleOnSearchPress();
                }}
                containerStyle={styles.searchBar}
                inputStyle={{ backgroundColor: "white" }}
                lightTheme
                placeholder={Strings.SEARCH}
              />
            </View>
            <Image
              style={styles.headerImage}
              resizeMode='stretch'
              source={require("../../../../assets/arcmall.png")}
            />
            <View style={styles.sliderView}>
              <ItemSlider
                horizontal
                onItemPress={(itemId) => {
                  this.props.navigation.dispatch(navigateToItemDetails({itemId: itemId}))
                }}
                items={this.state.featuredItems}
              />
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
              <SeeMoreTitleBar
                hideSeeMore
                name="Our Collection"
                onPress={this.hanleOnSeeMoreCategoriesPressed}
              />
              <ItemSlider
                horizontal={false}
                onItemPress={(itemId) => {
                  this.props.navigation.dispatch(navigateToItemDetails({itemId: itemId}))
                }}
                items={this.state.latestItems}
              />
            </View>
          </View>
        </ScrollView>
      )
    } else if(isLoading || languageLoading){
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
    user: state.login.user,
  };
};

export default connect(mapStateToProps)(HomeScreen);
