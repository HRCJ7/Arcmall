import React, { Component } from "react";
import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";
import styles from "./WishListItem.styles";
import EvilIcon from "react-native-vector-icons/EvilIcons";

class WishListItem extends Component {
  constructor(props) {
    super(props);
    const { item } = props;
    this.state = {
      item: item
    };
  }

  render() {
    const { item } = this.state;
    let swipeBtns = [
      {
        text: "Delete",
        backgroundColor: "red",
        onPress: () => {
          this.props.onDelete(item);
        }
      }
    ];
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../../../../assets/wishlist.png")}
        />
        <View style={styles.textView}>
          <Text style={styles.description}>
            Ladies Wedding dress latest trend modelß
          </Text>
          <View style={{flexDirection:"row"}}>
            <Text style={styles.price}>$500.00</Text>
            <TouchableOpacity
                    style={styles.heart}
                  
                  >
                    <EvilIcon name="heart" color="red" size={25} />
                  </TouchableOpacity>
            </View>  
        </View>
      </View>
    );
  }
}

export default WishListItem;
