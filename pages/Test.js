import React, { Component } from "react";
import {
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  AsyncStorage,
  StatusBar,
  BackHandler
} from "react-native";
import { Text, View, Dimensions, Alert } from "react-native";
import { SearchBar } from "react-native-elements";
import Statusbar from "../components/Statusbar";
// import { TabView, TabBar, SceneMap, PagerPan } from "react-native-tab-view";
import ItemSlider from "../components/HomePage/ItemSlider/ItemSlider";
import TitleBar from "../components/HomePage/TitleBar/TitleBar";
import TabBar from "../components/HomePage/TabBar/TabBar";

// const FirstRoute = () => <ItemSlider />;
// const SecondRoute = () => <ItemSlider />;
// const initialLayout = {
//   height: 0,
//   width: Dimensions.get("window").width
// };

export default class LandingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isButtonClicked: "Daily"
      // type: "Daily",
      // index: 0,
      // routes: [
      //   { key: "new_arrivals", title: "New Arrivals" },
      //   { key: "featured", title: "Featured" },
      //   { key: "best_sellers", title: "Best Sellers" },
      //   { key: "trending", title: "Trending" }
      // ],
      // tab1Height: 100
    };
  }
  // _renderTabBar = props => (
  //   <TabBar
  //     {...props}
  //     scrollEnabled
  //     indicatorStyle={styles.indicator}
  //     style={styles.tabbar}
  //     tabStyle={styles.tab}
  //     labelStyle={styles.label}
  //   />
  // );

  render() {
    return (
      <View style={{ flex: 1 }}>
        {Platform.OS === "ios" ? (
          <Statusbar backgroundColor="#000000" barStyle="light-content" />
        ) : null}
        <SearchBar lightTheme placeholder="Type Here..." />
        <Image
          style={styles.main_image_view}
          source={{
            uri:
              "https://facebook.github.io/react-native/docs/assets/favicon.png"
          }}
        />

        {/* <TabView
          navigationState={this.state}
          renderTabBar={this._renderTabBar}
          renderScene={SceneMap({
            new_arrivals: FirstRoute,
            featured: SecondRoute,
            best_sellers: FirstRoute,
            trending: SecondRoute
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={initialLayout}
          useNativeDriver
        /> */}

        <TabBar />
        <ItemSlider />
        <TitleBar name="Featured Shop" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scene: {
    width: "100%"
  },
  main_image_view: {
    width: "100%",
    height: "25%"
  },
  tabbar: {
    backgroundColor: "#ffffff",
    height: "10%"
  },
  tab: {
    width: 130,
    height: "10%"
  },
  indicator: {
    backgroundColor: "#42b0f4"
  },
  label: {
    color: "#42b0f4",
    fontWeight: "bold",
    fontSize: 10
  }
});
