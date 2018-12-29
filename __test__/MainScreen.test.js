import "react-native";
import React from "react";
import MainScreen from "../pages/MainScreen";
import renderer from "react-test-renderer";

it("renders correctly", () => {
const tree = renderer.create(<MainScreen />).toJSON();
    expect(tree).toMatchSnapshot();
});
  
// These serve as integration tests for the jest-react-native preset.

it("renders the Tiles component", () => {
    const TileComponent = require("TileComponent");
    const tree = renderer
        .create(<TileComponent />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});