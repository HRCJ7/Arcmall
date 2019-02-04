import React, { Component } from "react";
import {
  Platform,
  View,
  FlatList,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import WishListItem from "../../components/wishList/WishListItem";
import NavigationBar from "../../../shared/components/NavigationBar/NavigationBar";
import Strings from "../../../shared/localization/localization";


const arr = ["1", "1", "1", "1", "1", "1", "1", "1", "1"];

export default class WishListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { enableScrollViewScroll: true };
  }
  
  renderNavBar = () => {
    return <NavigationBar title={Strings.WISH_LIST} />;
  };  
  renderItem = ({ item }) => {
    return <WishListItem />;
  };

  render() {
    const navBar = this.renderNavBar();
    return (
      <View
        style={{ flex: 1 }}
        >
       {navBar}      
          <FlatList
            numColumns={3}
            data={arr}
            renderItem={this.renderItem}
            columnWrapperStyle={styles.row}
          />
      </View>
    );
  }
}
const styles = StyleSheet.create({

  row: {
      flex: 1,
    marginTop:10,  
    justifyContent: "space-around"
  }
});
