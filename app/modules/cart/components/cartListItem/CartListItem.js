import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import EvilIcon from "react-native-vector-icons/EvilIcons";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./CartListItem.styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CachedImage } from "react-native-cached-image";
import Swipeout from 'react-native-swipeout';
import Strings from "../../../shared/localization/localization";

const ICON_SIZE = 12;

class CartListItem extends Component {
  constructor(props) {
    super(props);
    const {item} = props;
    this.state =  {
      item: item,
      hideAdd: props.hideAdd,
    }
  }

  handleOnPress = () => {
    // const {item: {item}, onPress} = this.props;
    // onPress(item.product_id);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  renderAddSubstract = (item) => {
    let content = null;
    const {hideAdd} = this.state;

    if (!hideAdd) {
      content = (
        <View style={{flex: 1}}>
          <View style={styles.itemCount}>
            <TouchableOpacity
              style={styles.plusAction}
              numberOfLines={1}
              onPress={()=> {
                this.props.onAdd(item);
              }}
            >
              <EvilIcon name="plus" size={25} />
            </TouchableOpacity>
            <Text style={styles.count} numberOfLines={1}>
              {item.quantity}
            </Text>
            <TouchableOpacity
              style={styles.minusAction}
              numberOfLines={1}
              onPress={()=> {
                let item = {...this.state.item}
                this.props.onSubtract(item);
              }}
            >
              <EvilIcon name="minus" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      )
    } else {
      content = (
        <View style={{flex: 1}}>
          <View style={styles.itemCount}>
            <Text style={styles.text} numberOfLines={1}>
              {`${Strings.QUANTITY}`}
            </Text>
            <Text style={styles.text} numberOfLines={1}>
              {`${item.quantity}`}
            </Text>
          </View>
        </View>
      )
    }

    return content;
  }

  getOptionData = () => {
    const {item} = this.state;
    let views = [];

    for (const option of item.option) {
      views.push(
        <View style={styles.bottomRowAction}>
          <Text style={styles.textBold}>{`${option.name}: `}</Text>
          <Text style={styles.textNormal}>{option.value}</Text>
        </View>
      )
    }

    return views;
  }

  render() {
    const {item} = this.state;
    const {onDelete} = this.props;
    let swipeBtns = null;
    if (onDelete) {
      swipeBtns = [{
        text: 'Delete',
        backgroundColor: 'red',
        onPress: () => { this.props.onDelete(item) }
      }];
    }

    let category = '';
    const categoryArr = item.categories? item.categories[item.categories.length - 1]: {};
    if (categoryArr) {
      category = categoryArr.name;
    }
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
                  <Text style={styles.blueText}>{category}</Text>
                </View>
                <View style={styles.bottomRow}>
                  <Text style={styles.itemPrice} numberOfLines={1}>
                    {item.price}
                  </Text>
                </View>
              </View>
              {this.renderAddSubstract(item)}
            </View>
            <View style={styles.itemInfoContainer}>
              {this.getOptionData()}
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
