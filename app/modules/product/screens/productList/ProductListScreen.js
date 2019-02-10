// @flow
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import styles from './ProductListScreen.styles';
import NavigationBar from '../../../shared/components/NavigationBar/NavigationBar';
import Strings from '../../../shared/localization/localization';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import LoadingIndicator from '../../../shared/components/loadingIndicator/LoadingIndicator';
import ProductListItem from '../../components/productListItem/ProductListItem';
import { navigateToItemDetails } from '../../../../navigation/RootNavActions';
import ProductActions from '../../actions/ProductActions';
import {SearchBar} from "react-native-elements";
import { getProductsByOrder, getSellerProducts } from './ProductApis';

let endLoading = false;
let nextStart = 0;
const ITEMS_LIMIT = 10;
class ProductListScreen extends React.Component<any, any> {
  static defaultProps: any

  constructor(props) {
    super(props);
    let params = props.navigation.state.params;
    this.state = {
      fromHome: params.fromHome,
      orderId: params.orderId,
      productList: [],
      isLoading: true,
      isComponentsLoading: false,
      itemPressDisabled: params.orderId,
      productListError: null,
      isSellerProducts: params.sellerProducts, // Boolean
      hasLazyLoading: params.sellerProducts, // Boolean
      loadFromState: params.sellerProducts || params.orderId, //Boolean
    };
  }

  componentDidMount() {
    const {fromHome, orderId, isSellerProducts} = this.state;
    if (!fromHome) {
      if (orderId) {
        this.loadOrderItems(orderId);
      } else if (isSellerProducts) {
        this.loadSellerProducts(nextStart);
      }
      else {
        this.loadItems(this.props.navigation.state.params);
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    if (state.loadFromState) {
      return state;
    } else {
      return {
        productList: props.productList,
        isLoading: props.productListLoading,
        productListError: props.productListError,
      };
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate() {
    
  }

  componentWillUnmount() {
    this.loadItems({categoryId: 0})
  }

  onListEndReached = () => {
    console.log('end')
    const {hasLazyLoading, orderId, isSellerProducts} = this.state;
    if (hasLazyLoading && !endLoading) {
      this.loadSellerProducts(nextStart);
    }
  }

  handleProductOnPress = (itemId: number) => {
    const {itemPressDisabled} = this.state;
    if(!itemPressDisabled) {
      this.props.navigation.dispatch(navigateToItemDetails({itemId}));
    }
  }

  handleOnBackPress = () => {
    this.props.navigation.goBack(null);
  }

  loadItems = (params) => {
    this.setState({
      isLoading: true,
    })
    let nextParams = {};
    nextParams.search = params.searchText? params.searchText: null;
    if(params.category_id) {
      nextParams.category_id = params.category_id;
    }
    this.props.dispatch(ProductActions.getProductList(nextParams));
  }

  loadOrderItems = async (orderId) => {
    this.setState({
      isLoading: true,
    })
    const response = await getProductsByOrder(orderId);
    this.setState({
      productList: response.products,
      isLoading: false,
    })
  }

  loadSellerProducts = async (start) => {
    if (start === 0) {
      this.setState({
        isLoading: true,
      });
    }
    
    const {productList} = this.state;
    const {user} = this.props;

    loadingItems = true;
    const response = await getSellerProducts(user.customer_id, nextStart, ITEMS_LIMIT);
    nextStart = nextStart + ITEMS_LIMIT;
    loadingItems = false;
    if (response.products) {
      let modifiedProductList = productList.concat(response.products);
      this.setState({
        productList: modifiedProductList,
        isLoading: false,
      });
    } else {
      endLoading = true;
    }
    
  }


  loadSearchItems = (text) => {
    let nextParams = {
      search: text,
    };
    this.props.dispatch(ProductActions.getProductList(nextParams));
  }

  renderLeftAction = () => {
    return (
      <TouchableOpacity onPress={this.handleOnBackPress}>
        <EvilIcons name='chevron-left' color='white' size={50}/>
      </TouchableOpacity>
    )
  }

  renderNavBar = () => {
    return (
      <NavigationBar
        title={Strings.PRODUCT_DETAILS}
        leftAction={this.renderLeftAction()}
      >
      </NavigationBar>
    )
  }

  renderListItem = (item, index) => {
    return (
      <ProductListItem
        item={item}
        onPress={this.handleProductOnPress}
        addToCart={this.addToCart}
      /> 
    )
  }

  renderEmptyComponent = () => {
    const {fromHome} = this.state;
    let content = null;
    if (!fromHome) {
      content = (
        <Text style={styles.headingText}>{Strings.NO_ITEMS}</Text>
      )
    }
    return content;
  }

  renderSearchBar = () => {
    let content = null;
    const {fromHome} = this.state;
    if(fromHome) {
      content = (
        <View style={styles.searchBarView}>
          <SearchBar
            onChangeText={(text) => {
              this.loadSearchItems(text);
            }}
            autoCorrect={false}
            autoCapitalize={false}
            autoFocus={true}
            containerStyle={styles.searchBar}
            inputStyle={{ backgroundColor: "white" }}
            lightTheme
            placeholder={Strings.SEARCH}
          />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
            style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>{Strings.CANCEL}</Text>
          </TouchableOpacity>
        </View>
      )
    }
    return content;
  }

  render() {
    const {
      navigation
    } = this.props;

    const {
      fromHome,
      isLoading,
      productList,
      productListError,
      isComponentsLoading,
    } = this.state;

    let content = null;
    let navBar = null;
    let searchBar = null;
    if (!fromHome) {
      loadingCategories = navigation.state.params.loadingCategories;
      navBar = loadingCategories? null: this.renderNavBar();
    } else {
      searchBar = this.renderSearchBar();
    }
    
    if (isLoading || isComponentsLoading) {
      content = (
        <View style={styles.container}>
          {navBar}
          {searchBar}
          <LoadingIndicator />
        </View>
      )
    } else if (!productListError){
      content = (
        <View style={styles.container}>
          {navBar}
          {searchBar}
          <FlatList
            onEndReached={this.onListEndReached}
            onEndReachedThreshold={0.5}
            extraData={this.state}
            ListEmptyComponent={this.renderEmptyComponent()}
            keyExtractor={(item, index) => `${item.description}${index}`}
            data={productList}
            renderItem={this.renderListItem}
          />
        </View>
      );
    } else {
      Toast.show(Strings.SOMETHING_WENT_WRONG);
    }
    return (
      content
    );
  }
}

ProductListScreen.propTypes = {
  isLoading: PropTypes.bool,
  productList: PropTypes.any,
  productListError: PropTypes.any, 
};

ProductListScreen.defaultProps = {
  isLoading: false,
  productList: null,
  productListError: null, 
};

const mapStateToProps = (state, ownProps) => {
  let navigation = ownProps.navigation;
  let productList = [];

  
  const fromHome = navigation.state.params.fromHome;

  if(fromHome) {
    if (state.product.productList.search) {
      productList = state.product.productList.search.products;
    }
  } else {
    console.log(navigation.state)
    const categoryId = navigation.state.params.category_id;

    //Change navigation object for tab bar.
    if (categoryId) {
      navigation = ownProps.navigation.state.params.navigation;
      navigation.state.params = {...navigation.state.params, ...ownProps.navigation.state.params};
    }
    const products = state.product.productList;

    if (categoryId && products[categoryId]) {
      productList = state.product.productList[categoryId].products;
    } else {
      productList = state.product.productList.products;
    }
  }
  
  return {
    productList: productList,
    isLoading: state.product.productListLoading,
    productListError: state.product.productListError,
    navigation: navigation,
    user: state.login.user,
  };
};

export default connect(mapStateToProps)(ProductListScreen);
