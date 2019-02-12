import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./ProductListItem.styles";
import PropTypes from 'prop-types';
import {
  CachedImage,
} from 'react-native-cached-image';
import RatingItem from '../ratingItem/RatingItem';
import CartActions from '../../../cart/actions/CartActions';
import Swipeout from 'react-native-swipeout';

const ICON_SIZE = 12;

class ProductListItem extends Component {

  handleOnPress = () => {
    const {item: {item}, onPress} = this.props;
    onPress(item.product_id);
  }

  addRemoveWatchList = (add, product_id) => {
    if (add) {
      this.props.dispatch(CartActions.addToWishList({product_id}))
    } else {
      this.props.dispatch(CartActions.removeFromWishList({product_id}))
    }
  }

  render() {
    let content = null;
    const {item, onPress} = this.props.item;
    const {hasDelete, addedToWishList} = this.props;

    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => { 
        this.addRemoveWatchList(false, item.product_id)
      }
    }];

    let icon = {name: 'ios-heart-empty', color: 'black'};
    if (addedToWishList) {
      icon = {name: 'ios-heart', color: 'red'};
    }
    let category = '';
    const categoryArr = item.categories? item.categories[item.categories.length - 1]: {};

    if (categoryArr) {
      category = categoryArr.name;
    }

    let itemConent = (
      <TouchableOpacity style={styles.itemContainer} onPress={this.handleOnPress}>
        <CachedImage 
          style={styles.itemImage}
          resizeMode='contain'
          source={{uri: item.thumb}}/>
        <View style={styles.itemContent}>
          <View style={styles.itemDescription}>
            <Text style={styles.itemDescriptionText}>{item.name}</Text>
          </View>
          <View style={styles.itemDetails}>
            <View style={styles.container}>
              <Text style={styles.blueText}>{category}</Text>
            </View>
            <View style={styles.starContainer}>
              <RatingItem 
                rating={item.rating}
              />
            </View>
          </View>
          <View style={styles.bottomRow}>
            <TouchableOpacity onPress={() => {
              this.addRemoveWatchList(!addedToWishList, item.product_id);
            }} style={styles.bottomRowAction} numberOfLines={1}>
              <Icon name={icon.name} color={icon.color} size={25}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomRowAction} numberOfLines={1} onPress={this.addToCart}>
              <Text></Text>
            </TouchableOpacity>
            <Text style={styles.itemPrice} numberOfLines={1}>{item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );

    if (hasDelete) {
      content = (
        <View style={styles.container}>
          <Swipeout
            right={swipeBtns}
            style={styles.swipeout}
            >
            {itemConent}
          </Swipeout>
        </View>
      )
    } else {
      content = (
        <View style={styles.container}>
          <Swipeout
            right={swipeBtns}
            style={styles.swipeout}
            >
            {itemConent}
          </Swipeout>
        </View>
      )
    }

   
    return content;
  }
}

ProductListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

ProductListItem.defaultProps = {
  item: {},
  onPress: () => {},
};

const mapStateToProps = (state, ownProps) => {
  let addedToWishList = false;
  const wishlist = state.cart.wishListIds;
  if (ownProps.item.item) {
    addedToWishList = wishlist[ownProps.item.item.product_id];
  }
  return {
    addedToWishList: addedToWishList,
  };
};

export default connect(mapStateToProps)(ProductListItem);