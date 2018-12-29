import "react-native";
import React from "react";
import Row from "../components/Row";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Row />).toJSON();
  expect(tree).toMatchSnapshot();
});

// These serve as integration tests for the jest-react-native preset.
it("renders the Text component", () => {
  const Text = require("Text");
  const tree = renderer
    .create(<Text/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});