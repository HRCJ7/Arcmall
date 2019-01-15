import React, { Component } from "react";
import { TouchableOpacity, View,Text, Image } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {styles} from "./styles";
import {CachedImage} from 'react-native-cached-image';
import PhotoGrid from 'react-native-thumbnail-grid';
export default class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: props.categories? props.categories.slice(0, 4): [],
    };
  }

  // getGridItem = () => {
  //   const {categories} = this.state;
  //   let views = [];
  //   for (let i=0; i<categories.length; i++) {
  //     const category = categories[i];
  //     switch (i) {
  //       case 2:
  //         views.add(
  //           <Row size={2} style={{ backgroundColor:"white", marginBottom:5,}}>
  //             <CachedImage
  //               style={styles.image}
  //               source={{uri: category.image}} 
  //             />
  //           </Row>
  //         )
  //       break;
  //       default: 
  //         views.add(
  //           <Row size={1} style={{ backgroundColor:"white", marginBottom:5,}}>
  //             <CachedImage
  //               style={styles.image}
  //               source={{uri: category.image}} 
  //             />
  //           </Row>
  //         )
  //     }
  //   }
  //   return views;
  // }

  getImages = () => {
    const {categories} = this.state;
    let images = [];
    for (let category in categories) {
      images.push(categories[category].image);
    }
    return images;
  }

  handleOnImagePressed = () => {
    this.props.onPress(categories[0].categories);
  }

  render() {
    const {categories} = this.state;
    const images = this.getImages()
    return (
      <PhotoGrid 
        source={images}
        onPressImage={this.handleOnImagePressed}
      />




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

