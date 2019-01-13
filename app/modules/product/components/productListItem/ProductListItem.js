import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./ProductListItem.styles";
import PropTypes from 'prop-types';
import {
  CachedImage,
  ImageCacheProvider
} from 'react-native-cached-image';

const ICON_SIZE = 12;

export default class ProductListItem extends Component {
  render() {
    const {item} = this.props.item;
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <CachedImage 
          style={styles.itemImage}
          resizeMode='contain'
          source={{uri: item.thumb}}/>
        <View style={styles.itemContent}>
          <View style={styles.itemDescription}>
            <Text style={styles.itemDescriptionText}>{item.description}</Text>
          </View>
          <View style={styles.itemDetails}>
            <View style={styles.container}>
              <Text style={styles.blueText}>{'item.categotyName'}</Text>
            </View>
            <View style={styles.container}>
              <View style={{flexDirection: 'row', justifyContent:'flex-end'}}>
                <Icon style={styles.ratingIcon} name="ios-star" size={ICON_SIZE}/>
                <Icon style={styles.ratingIcon} name="ios-star" size={ICON_SIZE} />
                <Icon style={styles.ratingIcon} name="ios-star" size={ICON_SIZE} />
                <Icon style={styles.ratingIcon} name="ios-star-outline" size={ICON_SIZE} />
                <Icon style={styles.ratingIcon} name="ios-star-outline" size={ICON_SIZE} />
              </View>
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
  item: PropTypes.object.isRequired
};

ProductListItem.defaultProps = {
  item: {}
};