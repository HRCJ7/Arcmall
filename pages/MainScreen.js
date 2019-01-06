import React from "react";
import { Text, View, Image } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import Screen1 from "./LandingScreen";
import Screen2 from "./LandingScreen";
import Screen3 from "./LandingScreen";
import Screen4 from "./LandingScreen";
import { IC_MASK } from "../assets/logout.png";
import Icon from "react-native-vector-icons/FontAwesome";

const BottomTab = createBottomTabNavigator(
  {
    Home: {
      screen: Screen1,
      tabBarLabel: "Home",
      path: "/",
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          const iconName = `ios-information-circle${focused ? "" : "-outline"}`;
          return <Icon name="home" size={25} color={tintColor} />;
        }
      }
    },
    Profile: {
      screen: Screen1,

      path: "/",
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          const iconName = `ios-information-circle${focused ? "" : "-outline"}`;
          return <Icon name="user-circle" size={25} color={tintColor} />;
        },
        title: "My Profile"
      }
    },
    Cart: {
      screen: Screen1,
      path: "/",
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          const iconName = `ios-information-circle${focused ? "" : "-outline"}`;
          return <Icon name="cart-arrow-down" size={25} color={tintColor} />;
        },
        title: "Your Cart"
      }
    },
    List: {
      screen: Screen1,
      path: "/",
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          const iconName = `ios-information-circle${focused ? "" : "-outline"}`;
          return <Icon name="heart" size={25} color={tintColor} />;
        },
        title: "Wish List"
      }
    }
  },
  {
    tabBarLabel: {},
    tabBarOptions: {
      activeTintColor: "#2687ad",
      inactiveTintColor: "gray"
      // showLabel: false,
    }
  }
);

const MainScreen = createAppContainer(BottomTab);
export default MainScreen;
