import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./ReviewListItem.styles";
import PropTypes from 'prop-types';
import {
  CachedImage,
} from 'react-native-cached-image';
import RatingItem from '../ratingItem/RatingItem';


export default class ReviewListItem extends Component {


  render() {
    const {item: {rating, date_added, author, text}, onPress} = this.props.item;
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>{author}</Text>
          <View style={styles.rating}>
            <RatingItem
              rating={rating}
            />
            <Text style={styles.dateText}>{date_added}</Text>
          </View>
          <Text style={styles.descriptionText}>{text}</Text>
        </View>
      </View>
    );
  }
}

ReviewListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

ReviewListItem.defaultProps = {
  item: {},
  onPress: () => {},
};