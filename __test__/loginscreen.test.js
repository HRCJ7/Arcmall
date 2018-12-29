import "react-native";
import React from "react";
import renderer from "react-test-renderer";
  
it("renders the Image component", done => {
    const Image = require("Image");
    Image.getSize("logo.png", (width, height) => {
      const tree = renderer.create(<Image style={{ height, width }} />).toJSON();
      expect(tree).toMatchSnapshot();
      done();
    });
});

it("renders the Text component", () => {
    const Text = require("Text");
    const tree = renderer
      .create(<Text/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
});