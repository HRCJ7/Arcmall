import React, { Component } from "react";
import { TouchableOpacity, View,Text, Image } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {styles} from "./styles";
import {CachedImage} from 'react-native-cached-image';
import { splitCategoryName } from "../../../../services/ExternalServices";
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
        style={styles.container}
        key={`category${category}`}
        onPress={() => {
          this.handleOnImagePressed(categories[category].categories)
        }}>
          <CachedImage 
            style={styles.image}
            resizeMode= 'cover'
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

  handleOnImagePressed = (categories) => {
    this.props.onPress(categories);
  }

  render() {
    const {categories} = this.state;
    const images = this.getImages()
    return (
      <View style={{flex: 1}}>
        {images}
      </View>




      // <View style={styles.container}>
      //   <Grid>
      //     <Row size={1} style={{flex: 1, backgroundColor:"white", marginBottom:5,}}>
      //       <CachedImage
      //         resizeMode='contain'
      //         style={styles.image}
      //         source={{uri: categories[0].image}} 
      //       />
      //     </Row>
      //     <Row size={2} style={{ backgroundColor: "white" }}>
      //       <Col style={{ backgroundColor: "white", marginBottom: 5 }}>
      //         <CachedImage
      //           resizeMode='center'
      //           style={styles.image}
      //           source={{uri: categories[1].image}}
      //         />
      //       </Col>
      //       <Col>
      //         <Row size={1} style={{ backgroundColor: "white", marginBottom: 5 }}>
      //           <CachedImage
      //             resizeMode='center'
      //             style={styles.image}
      //             source={{uri: categories[2].image}}
      //           />
      //         </Row>
      //         <Row size={1} style={{ backgroundColor: "white", marginBottom: 5 }}>
      //           <CachedImage
      //             resizeMode='center'
      //             style={styles.image}
      //             source={{uri: categories[3].image}}
      //           />
      //         </Row>
      //       </Col>
      //     </Row>
      //   </Grid>
      // </View>
    );
  }
}

