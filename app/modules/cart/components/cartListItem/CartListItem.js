import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import EvilIcon from "react-native-vector-icons/EvilIcons";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./CartListItem.styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CachedImage } from "react-native-cached-image";

const ICON_SIZE = 12;

class CartListItem extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  handleOnPress = () => {
    // const {item: {item}, onPress} = this.props;
    // onPress(item.product_id);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={this.props.handleProductOnPress}>
        <View style={styles.itemImageContainer}>
          <View style={styles.itemSelect}>
          <View style={styles.circle}>
            
        </View> 
        </View>  
          <CachedImage
            style={styles.itemImage}
            resizeMode="contain"
            source={require("../../../../../assets/logo.png")}
          />
          <View style={styles.itemContent}>
            <View style={styles.itemDescription}>
              <Text style={styles.itemDescriptionText}>name</Text>
            </View>
            <View style={styles.itemDetails}>
              <View style={styles.container}>
                <Text style={styles.blueText}>category</Text>
              </View>
            </View>
            <View style={styles.bottomRow}>
              <Text style={styles.itemPrice} numberOfLines={1}>
                $ {item.price}
              </Text>
              <View style={styles.itemCount}>
                <TouchableOpacity
                  style={styles.minusAction}
                  numberOfLines={1}
                  onPress={this.props.onSubtract}
                >
                  <EvilIcon name="minus" size={25} />
                </TouchableOpacity>
                <Text style={styles.count} numberOfLines={1}>
                  {item.quantity}
                </Text>
                <TouchableOpacity
                  style={styles.plusAction}
                  numberOfLines={1}
                  onPress={this.props.onAdd}
                >
                  <EvilIcon name="plus" size={25} />
                </TouchableOpacity>
              </View>
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
    );
  }
}

CartListItem.propTypes = {};

CartListItem.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {};
};

export default connect(mapStateToProps)(CartListItem);
