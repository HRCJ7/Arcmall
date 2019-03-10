import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./RatingItem.styles";
import PropTypes from 'prop-types';
import {
  CachedImage,
} from 'react-native-cached-image';

export default class RatingItem extends Component {

  handleOnPress = () => {
    const {item: {item}, onPress} = this.props;
    onPress(item.product_id);
  }

  getRatingStars = (rating) => {
    const {iconSize, iconStyle} = this.props;
    let ratingStars = [];
    for(let i=0; i<5; i++) {
      let iconName = 'ios-star-outline'
      if (i < rating) {
        iconName = 'ios-star'
      }
      ratingStars.push(
        <Icon key={i} style={[styles.ratingIcon, iconStyle]} name={iconName} size={iconSize} />
      )
    }
    return ratingStars;
  }

  render() {
    const {rating, containerStyle} = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        {this.getRatingStars(rating)}
      </View>
    );
  }
}

RatingItem.propTypes = {
  rating: PropTypes.number.isRequired,
  iconStyle: PropTypes.object,
  iconSize: PropTypes.number,
  containerStyle: PropTypes.object,
};

RatingItem.defaultProps = {
  rating: 0,
  iconStyle: {},
  iconSize: 12,
  containerStyle: {}
};