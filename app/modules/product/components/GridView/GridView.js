
import React, { Component } from "react";
import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import Theme, { font } from '../../../../theme/Base';
import {CachedImage} from 'react-native-cached-image';
import { splitCategoryName } from "../../../../services/ExternalServices";
import {styles} from "./styles";

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
          this.handleOnImagePressed(categories[category].categories, name)
        }}>
          <CachedImage
            style={styles.image}
            // transform={{scale:'0.5, 0.5'}}
            // resizeMode= 'stretech'
            source={{uri: categories[category].image}}
          /> 
          <View style={styles.imageText}>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.countText}>{`${count} items`}</Text>
          </View>
        </TouchableOpacity>
      );
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
          <Row size={1} style={styles.rowStyle}>
          {images[1]}
          </Row>
          <Row size={1} style={styles.rowStyle}>
            <Col style={styles.columnStyle}>
              {images[2]}
            </Col>
            <Col >
              {images[3]}
            </Col>
          </Row>
          <Row size={2} style={styles.rowStyle}>
            <Col style={styles.columnStyle}>
              {images[4]}
            </Col>
            <Col style={styles.rowStyle}>
              <Row style={styles.rowStyle2}>
              {images[5]}
              </Row>
              <Row >
              {images[6]}
              </Row>
            </Col>
          </Row>

          <Row size={1} style={styles.rowStyle}>
            {images[7]}
          </Row>
          <Row size={1} style={styles.rowStyle}>
            <Col style={styles.columnStyle}>
              {images[8]}
            </Col>
            <Col>
              {images[9]}
            </Col>
          </Row>
        </Grid>
      </View>
    );
  }
}


