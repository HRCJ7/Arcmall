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
import { getFeaturedItems } from './HomeApis';

const arr = ["1", "1", "1", "1", "1", "1", "1", "1", "1"];
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

      featuredItemsLoading: true,
    };
    this.getCategoryList(props);
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


  getFeaturedItems = async () => {
    let items = await getFeaturedItems();
    console.log(items)
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

  handleOnSearchPress = () => {
    this.props.navigation.dispatch(navigateToProductList({
      fromHome: true,
    }))
  }

  render() {
    const {isLoading} = this.props;
    const {categories, languageLoading} = this.state;
    let content = null;
    if(!isLoading && categories) {
      content = (
        <ScrollView
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
