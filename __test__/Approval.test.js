import "react-native";
import React from "react";
import Module1 from "../modules/Module1";

import renderer from "react-test-renderer";

it("renders correctly", () => {
const tree = renderer.create(<Module1 />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  // These serve as integration tests for the jest-react-native preset.
  it("renders the ActivityIndicator component", () => {
    const ActivityIndicator = require("ActivityIndicator");
    const tree = renderer
      .create(<ActivityIndicator animating={true} size="small" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders the FlatList ListView component", () => {
    const FlatList = require("FlatList");
    const tree = renderer
      .create(<FlatList/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });