import React, { Component } from "react";
import { TouchableOpacity, View,Text, Image } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  styles
} from "./styles";
export default class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <Grid>
          <Row size={1} style={{ backgroundColor:"white", marginBottom:5,}}>
            <Image
              style={styles.image}
             source={require("../../../../../assets/rowimage1.png")} 
            />
          </Row>
          <Row size={2} style={{ backgroundColor: "white" }}>
            <Col style={{ backgroundColor: "white", marginBottom: 5 }}>
              <Image
                style={styles.image}
                source={require("../../../../../assets/columnimage1.png")}
              />
            </Col>
            <Col>
              <Row size={1} style={{ backgroundColor: "white", marginBottom: 5 }}>
                <Image
                  style={styles.image}
                  source={require("../../../../../assets/columnimage2.png")}
                />
              </Row>
              <Row size={1} style={{ backgroundColor: "white", marginBottom: 5 }}>
                <Image
                  style={styles.image}
                  source={require("../../../../../assets/columnimage3.png")}
                />
              </Row>
            </Col>
          </Row>
        </Grid>
      </View>
    );
  }
}

