import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./ProductListItem.styles";
import PropTypes from 'prop-types';
import {
  CachedImage,
} from 'react-native-cached-image';
import RatingItem from '../ratingItem/RatingItem';

const ICON_SIZE = 12;

export default class ProductListItem extends Component {

  handleOnPress = () => {
    const {item: {item}, onPress} = this.props;
    onPress(item.product_id);
  }

  render() {
    const {item, onPress} = this.props.item;
    return (
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
              <Text style={styles.blueText}>{'item.categotyName'}</Text>
            </View>
            <View style={styles.container}>
              <RatingItem 
                rating={item.rating}
              />
            </View>
          </View>
          <View style={styles.bottomRow}>
            <TouchableOpacity style={styles.bottomRowAction} numberOfLines={1}>
              <EvilIcon name="heart" size={25}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomRowAction} numberOfLines={1}>
              <EvilIcon name="cart" size={25}/>
            </TouchableOpacity>
            <Text style={styles.itemPrice} numberOfLines={1}>{item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
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