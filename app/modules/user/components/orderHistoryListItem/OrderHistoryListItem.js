import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import EvilIcon from "react-native-vector-icons/EvilIcons";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./OrderHistoryListItem.styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CachedImage } from "react-native-cached-image";
import Swipeout from 'react-native-swipeout';
import Strings from "../../../shared/localization/localization";

const ICON_SIZE = 12;

class OrderHistoryListItem extends Component {
  constructor(props) {
    super(props);
    const {item} = props;
    this.state =  {
      item: item,
    }
  }

  handleOnPress = () => {
    // const {item: {item}, onPress} = this.props;
    // onPress(item.product_id);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const {item} = this.state;
    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => { this.props.onDelete(item) }
    }];
    return (
      <View style={styles.container}>
        {/* <Swipeout
          right={swipeBtns}
          style={styles.swipeout}
          > */}
          <TouchableOpacity 
            style={styles.itemContainer} 
            onPress={() => {
              this.props.onItemPress(item.order_id);
            }}>
            <View style={styles.itemImageContainer}>
              
              <View style={styles.itemContent}>
                {/* <View style={styles.itemDescription}>
                  <Text style={styles.itemDescriptionText}>{item.name}</Text>
                </View> */}
                <View style={styles.itemDetails}>
                  <Text style={styles.count}>{`${Strings.PLACED_ON}: ${item.date_added}`}</Text>
                </View>
                <View style={styles.itemDetails}>
                  <Text style={styles.count}>{`${Strings.ITEMS}: ${item.products}`}</Text>
                </View>
                <View style={styles.bottomRow}>
                  <Text style={styles.count} numberOfLines={1}>
                    {`${Strings.STATUS} : ${item.status}`}
                  </Text>
                  <Text style={styles.itemPrice} numberOfLines={1}>
                    {item.total}
                  </Text>
                </View>
                
              </View>
           
            </View>
      
          </TouchableOpacity>
        {/* </Swipeout>  */}
      </View>
    );
  }
}

OrderHistoryListItem.propTypes = {};

OrderHistoryListItem.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {};
};

export default connect(mapStateToProps)(OrderHistoryListItem);
