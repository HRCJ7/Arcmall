
import React, { Component } from "react";
import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import Theme, { font } from '../../../../theme/Base';
import { splitCategoryName } from "../../../../services/ExternalServices";
import {styles} from "./styles";
import Strings from "../../../shared/localization/localization";

export default class GridView extends Component {
  constructor(props) {
    super(props);
    let categories = [];
    if (props.categories && props.categories.length > 0) {
      if (props.all) {
        categories = props.categories;
      } else {
        categories = props.categories.slice(0, 4);
      }
    }

    this.state = {
      categories: categories,
    };
  }

    getImages = () => {
    const {categories} = this.state;
    const {onPress} = this.props;
    let images = [];
    for (let category in categories) {

      let {name, count} = splitCategoryName(categories[category].name);
      
      images.push(
        <TouchableOpacity 
        style={styles.imageContainer}
        key={`category${category}`}
        onPress={() => {
          this.handleOnImagePressed(categories[category].categories)
        }}>
         <Image
                style={styles.image}
                source={require("../../../../../assets/rowimage1.png")}
              />
          <View style={styles.imageText}>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.countText}>{`${count} ${Strings.ITEMS}`}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return images;
  }

  handleOnImagePressed = (categories) => {
    this.props.onPress(categories);
  }
  render() {

        const {categories} = this.state;
    const images = this.getImages()
    return (
      <View style={styles.container}>
        <Grid>
          <Row size={1} style={styles.rowStyle}>
          {images[0]}
          </Row>
          <Row size={2} style={{ backgroundColor: "white" }}>
            <Col style={styles.rowStyle1}>
            {images[1]}
            </Col>
            <Col>
              <Row style={styles.rowStyle}>
              {images[2]}
              </Row>
              <Row style={styles.rowStyle}>
              {images[3]}
              </Row>
            </Col>
          </Row>
        </Grid>
      </View>
    );
  }
}


