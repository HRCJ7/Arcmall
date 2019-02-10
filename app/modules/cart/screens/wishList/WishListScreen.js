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
import styles from './WishListScreen.styles';
import NavigationBar from '../../../shared/components/NavigationBar/NavigationBar';
import Strings from '../../../shared/localization/localization';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import LoadingIndicator from '../../../shared/components/loadingIndicator/LoadingIndicator';
import { navigateToItemDetails } from '../../../../navigation/RootNavActions';
import ProductListItem from '../../../product/components/productListItem/ProductListItem';
import ProductActions from '../../../product/actions/ProductActions';
import CartActions from '../../actions/CartActions';

class WishListScreen extends React.Component<any, any> {
  static defaultProps: any

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      wishListError: null,
      wishList: [],
    };
  }

  componentDidMount() {
    this.props.dispatch(CartActions.getWishList());
  }

  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    return {
      wishList: props.wishList,
      isLoading: props.isLoading,
      wishListError: props.wishListError,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate() {
    
  }

  componentWillUnmount() {
   
  }

  handleProductOnPress = (itemId: number) => {
    this.props.navigation.dispatch(navigateToItemDetails({itemId}));
  }

  handleOnBackPress = () => {
    this.props.navigation.goBack(null);
  }

  renderNavBar = () => {
    return (
      <NavigationBar
        title={Strings.WISH_LIST}
      >
      </NavigationBar>
    )
  }

  renderListItem = (item, index) => {
    return (
      <ProductListItem
        hasDelete
        addedToWishList
        item={item}
        onPress={this.handleProductOnPress}
        addToCart={this.addToCart}
      /> 
    )
  }

  renderEmptyComponent = () => {
    let content = null;
    content = (
      <Text style={styles.headingText}>{Strings.NO_ITEMS}</Text>
    )
    return content;
  }

  render() {
    const {
      isLoading,
      wishList,
      wishListError,
    } = this.state;

    let content = null;
    let navBar = this.renderNavBar();

    if (isLoading) {
      content = (
        <View style={styles.container}>
          {navBar}
          <LoadingIndicator />
        </View>
      )
    } else if (!wishListError){
      content = (
        <View style={styles.container}>
          {navBar}
          <FlatList
            ListEmptyComponent={this.renderEmptyComponent()}
            keyExtractor={(item, index) => `${item.description}${index}`}
            data={wishList}
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

WishListScreen.propTypes = {
  isLoading: PropTypes.bool,
  productList: PropTypes.any,
  productListError: PropTypes.any, 
};

WishListScreen.defaultProps = {
  isLoading: false,
  productList: null,
  productListError: null, 
};

const mapStateToProps = (state, ownProps) => {  
  return {
    wishList: state.cart.wishlistData,
    isLoading: state.cart.wishlistLoading,
    wishListError: state.cart.wishlistError,
  };
};

export default connect(mapStateToProps)(WishListScreen);
