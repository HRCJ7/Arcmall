// @flow
import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList
} from 'react-native';
import { SearchBar } from "react-native-elements";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './HomeScreen.styles';
import ItemSlider from "../components/ItemSlider/ItemSlider";
import Card from "../components/ItemSlider/Card";
import TitleBar from "../components/TitleBar/TitleBar";
import GridView from "../components/GridView/GridView";

const arr = ["1", "1", "1", "1", "1", "1", "1", "1", "1"];
class HomeScreen extends React.Component<any, any> {
  static defaultProps: any

  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  componentDidMount() {

  }

  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate() {
    
  }

  _renderItem = ({ item }) => {
    return <Card title="{item.title}" />;
  };



  render() {
    return (
      <View style={styles.container}>
        <ScrollView
    
    contentContainerStyle={{
      flexGrow: 1
  }}>
       <SearchBar
            containerStyle={{ backgroundColor: "white" }}
            inputStyle={{ backgroundColor: "white" }}
            lightTheme
            placeholder="Search"
          />
          <Image
            style={styles.app_image}
            source={require("../../../../assets/arcmall.png")}
        />
          <TitleBar name="Featured Shop" />
          <View  style={styles.slider_view}>
            <ItemSlider />
            </View>   
          <TitleBar name="Featured Shop" />
          <Image
            style={styles.app_image}
            source={require("../../../../assets/salepromo.png")}
          /> 
          <TitleBar name="Featured Shop" />
          <GridView />
          <TitleBar name="Featured Shop" />
          <FlatList
            numColumns={3}
            data={arr}
            renderItem={this._renderItem}
            columnWrapperStyle={styles.row}
          />
          </ScrollView>
      </View>
    );
  }
}

HomeScreen.propTypes = {

};

HomeScreen.defaultProps = {

};

const mapStateToProps = (state, ownProps) => {
  return {
    
  };
};

export default connect(mapStateToProps)(HomeScreen);
