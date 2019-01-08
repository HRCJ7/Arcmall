import React, { Component } from "react";
import {
  Platform,
  View,
  FlatList,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import { SearchBar } from "react-native-elements";
import Statusbar from "../components/Statusbar";
import ItemSlider from "../components/HomePage/ItemSlider/ItemSlider";
import TitleBar from "../components/HomePage/TitleBar/TitleBar";
import TabBar from "../components/HomePage/TabBar/TabBar";
import GridView from "../components/HomePage/GridView/GridView";
const arr = ["1", "1", "1", "1", "1", "1", "1", "1", "1"];
import Card from "../components/HomePage/ItemSlider/Card";
export default class LandingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { enableScrollViewScroll: true };
  }
  _renderItem = ({ item }) => {
    return <Card title="{item.title}" />;
  };
  render() {
    return (
      <View
        style={{ flex: 1 }}
        onStartShouldSetResponderCapture={() => {
          this.setState({ enableScrollViewScroll: true });
        }}
      >
        {Platform.OS === "ios" ? (
          <Statusbar backgroundColor="#000000" barStyle="light-content" />
        ) : null}
        <ScrollView style={{ flex: 1 }}>
          <SearchBar
            containerStyle={{ backgroundColor: "white" }}
            inputStyle={{ backgroundColor: "white" }}
            lightTheme
            placeholder="Search"
          />
          <Image
            style={styles.main_image_view1}
            source={require("../assets/arcmall.png")}
          />
          <TabBar />
          <ItemSlider />
          <TitleBar name="Featured Shop" />
          <Image
            style={styles.main_image_view2}
            source={require("../assets/salepromo.png")}
          />
          <TitleBar name="Top Categories" />
          <GridView />
          <TitleBar name="Our Collections" />

          <FlatList
            numColumns={3}
            data={arr}
            renderItem={this._renderItem}
            columnWrapperStyle={styles.row}
          />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main_image_view1: {
    width: "100%",
    height: 150,
    resizeMode: "contain"
  },
  main_image_view2: {
    width: "100%",
    height: 120,
    resizeMode: "contain"
  },

  row: {
    flex: 1,
    justifyContent: "space-around"
  }
});
