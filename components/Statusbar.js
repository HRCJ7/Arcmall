/*
*
* This class includes all the cords relate to the status bar.
* chnagin size, background color and everything related to the status bar done here.
*
*/
import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

// This function used to set statusbar color and other properties
const Statusbar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default Statusbar;
const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT
  }
});
