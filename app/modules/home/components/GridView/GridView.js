
import React, { Component } from "react";
import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import Theme, { font } from '../../../../theme/Base';
import { splitCategoryName } from "../../../../services/ExternalServices";
import {styles} from "./styles";
import Strings from "../../../shared/localization/localization";
import { CachedImage } from "react-native-cached-image";

const IMAGES = [
  require('../../../../../assets/bag.png'),
  require('../../../../../assets/computers.png'),
  require('../../../../../assets/electronics.png'),
  require('../../../../../assets/her.png'),
];

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
    
    let index = 0;
    for (let category in categories) {

      let {name, count} = splitCategoryName(categories[category].name);
      
      images.push(
        <TouchableOpacity 
        style={styles.imageContainer}
        key={`category${category}`}
        onPress={() => {
          this.handleOnImagePressed(categories[category].categories, name)
        }}>
         <CachedImage
            style={styles.image}
            source={IMAGES[index]}
          />
          <View style={styles.imageText}>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.countText}>{`${count} ${Strings.ITEMS}`}</Text>
          </View>
        </TouchableOpacity>
      );
      index ++;
    }
    return images;
  }

  handleOnImagePressed = (categories, name) => {
    this.props.onPress(categories, name);
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


