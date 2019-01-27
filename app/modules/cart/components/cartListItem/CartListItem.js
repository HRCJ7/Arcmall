import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import EvilIcon from "react-native-vector-icons/EvilIcons";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./CartListItem.styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CachedImage } from "react-native-cached-image";
import Swipeout from 'react-native-swipeout';

const ICON_SIZE = 12;

class CartListItem extends Component {
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
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => { this.props.onDelete(item) }
    }];
    return (
      <View style={styles.container}>
        <Swipeout
          right={swipeBtns}
          style={styles.swipeout}
          >
          <TouchableOpacity 
            style={styles.itemContainer} 
            onPress={this.props.handleProductOnPress}>
            <View style={styles.itemImageContainer}>
              <CachedImage
                style={styles.itemImage}
                resizeMode="contain"
                source={{uri: item.thumb}}
              />
              <View style={styles.itemContent}>
                <View style={styles.itemDescription}>
                  <Text style={styles.itemDescriptionText}>{item.name}</Text>
                </View>
                <View style={styles.itemDetails}>
                  <Text style={styles.blueText}>category</Text>
                </View>
                <View style={styles.bottomRow}>
                  <Text style={styles.itemPrice} numberOfLines={1}>
                    {item.price}
                  </Text>
                </View>
              </View>
              <View style={{flex: 1}}>
                <View style={styles.itemCount}>
                  <TouchableOpacity
                    style={styles.minusAction}
                    numberOfLines={1}
                    onPress={()=> {
                      let item = {...this.state.item}
                      // if (item.quantity > 1) {
                      //   item.quantity = item.quantity - 1;
                      // }
                      // this.setState({
                      //   item: item,
                      // })
                      this.props.onSubtract(item);
                    }}
                  >
                    <EvilIcon name="minus" size={25} />
                  </TouchableOpacity>
                  <Text style={styles.count} numberOfLines={1}>
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    style={styles.plusAction}
                    numberOfLines={1}
                    onPress={()=> {
                      // let item = {...this.state.item}
                      // item.quantity = item.quantity + 1;
                      // this.setState({
                      //   item: item,
                      // })
                      this.props.onAdd(item);
                    }}
                  >
                    <EvilIcon name="plus" size={25} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.itemInfoContainer}>
              <View style={styles.bottomRowAction}>
                <Text style={styles.textBold}>Color:</Text>
                <Text style={styles.textNormal}>White</Text>
              </View>
              <View style={styles.bottomRowAction}>
                <Text style={styles.textBold}>Color:</Text>
                <Text style={styles.textNormal}>White</Text>
              </View>
              <View style={styles.bottomRowAction}>
                <Text style={styles.textBold}>Color:</Text>
                <Text style={styles.textNormal}>White</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Swipeout> 
      </View>
    );
  }
}

CartListItem.propTypes = {};

CartListItem.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {};
};

export default connect(mapStateToProps)(CartListItem);
