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

class ProductListScreen extends React.Component<any, any> {
  static defaultProps: any

  constructor(props) {
    super(props);
    const params = props.navigation.state.params;
    props.dispatch(ProductActions.getProductList({
      search: '',
      category_id: params.category_id,
    }))

    this.state = {
      cartList: [],
    };
  }

  componentDidMount() {
    
  }

  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    return state;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate() {
  }

  handleProductOnPress = (itemId: number) => {
    this.props.navigation.dispatch(navigateToItemDetails({itemId}));
  }

  handleOnBackPress = () => {
    this.props.navigation.goBack(null);
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
    return (
      <Text style={styles.headingText}>{Strings.NO_ITEMS}</Text>
    )
  }

  render() {
    const {isLoading, productList, productListError, navigation: {state: {params: {loadingCategories}}}} = this.props;
    let content = null;
    const navBar = loadingCategories? null: this.renderNavBar();
    if (isLoading) {
      content = (
        <View style={styles.container}>
          {navBar}
          <LoadingIndicator />
        </View>
      )
    } else if (!productListError){
      content = (
        <View style={styles.container}>
          {navBar}
          <FlatList
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
  isLoading: true,
  productList: null,
  productListError: null, 
};

const mapStateToProps = (state, ownProps) => {
  let navigation = ownProps.navigation;
  const fromCategories = navigation.state.params.category_id;

  //Change navigation object for tab bar.
  if (fromCategories) {
    navigation = ownProps.navigation.state.params.navigation;
    navigation.state.params = {...navigation.state.params, ...ownProps.navigation.state.params};
  }

  const categoryId = navigation.state.params.category_id;
  const products = state.product.productList;

  let productList;
  if (categoryId && products[categoryId]) {
    productList = state.product.productList[categoryId].products;
  } else {
    productList = state.product.productList.products;
  }
  return {
    productList: productList,
    isLoading: state.product.productListLoading,
    productListError: state.product.productListError,
    navigation: navigation,
  };
};

export default connect(mapStateToProps)(ProductListScreen);
