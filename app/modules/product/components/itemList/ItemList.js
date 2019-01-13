import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./list-item.styles";
import PropTypes from 'prop-types';
import {
  CachedImage,
  ImageCacheProvider
} from 'react-native-cached-image';

export default class ListItem extends Component {
  render() {
    const { item } = this.props.item;
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <ImageCacheProvider
          urlsToPreload={[item.image]}
          onPreloadComplete={() => console.log('hey there')}>
          <CachedImage style={styles.itemImage}
                        source={{ uri: item.image }}/>
        </ImageCacheProvider>
        <View style={styles.itemContent}>
          <View style={styles.itemDescription}>
            <Text>{item.description}</Text>
          </View>
          <View style={styles.itemDetails}>
            <View style={styles.container}>
              <TouchableOpacity>
                  <Text style={{ color: '#2b9eb9' }}>{item.path}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.container}>
              <View style={{flexDirection: 'row' }}>
                <Icon style={styles.itemRatingIcon} name="ios-star" size={20}/>
                <Icon style={styles.itemRatingIcon} name="ios-star" size={20} />
                <Icon style={styles.itemRatingIcon} name="ios-star" size={20} />
                <Icon style={styles.itemRatingIcon} name="ios-star-outline" size={20} />
                <Icon style={styles.itemRatingIcon} name="ios-star-outline" size={20} />
              </View>
            </View>
          </View>
          <View style={styles.bottomRow}>
            <TouchableOpacity style={styles.bottomRowAction} numberOfLines={1}>
              <EvilIcon name="heart" size={25}/>
              <Text style={styles.bottomRowActionText}>Add to Wishlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomRowAction} numberOfLines={1}>
              <EvilIcon name="cart" size={25}/>
              <Text style={styles.bottomRowActionText}>Add to Cart</Text>
            </TouchableOpacity>
            <Text style={styles.itemPrice} numberOfLines={1}>$ 500.00</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

ListItem.propTypes = {
    item: PropTypes.object.isRequired
};

ListItem.defaultProps = {
    item: {}
};