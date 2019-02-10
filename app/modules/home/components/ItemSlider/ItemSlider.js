import React, { Component } from "react";
import {View, FlatList, TouchableOpacity} from "react-native";
import Carousel from "react-native-snap-carousel";
import {sliderWidth, sliderItemWidth,styles} from "./styles";
import Card from "./Card";
import LoadingIndicator from "../../../shared/components/loadingIndicator/LoadingIndicator";

export default class ItemSlider extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: props.items,
      horizontal: props.horizontal,
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      data: props.items,
      horizontal: props.horizontal,
    };
  }

  renderListComponent = ({item}) => {
    const {horizontal} = this.state;
    let style = !horizontal? {paddingBottom: 20}: {};
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onItemPress(item.product_id);
        }}
        style={[styles.list, style]}
      >
        <Card item={item} />
      </TouchableOpacity>
    )
  };

  renderListEmptyComponent = () => {
    return (
      <View style={{flex: 1, height: 190, justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
      </View>
    )
  }

  render() {
    const {horizontal, data, onEndReached} = this.state;
    let content = null;

    if(data && data.length > 0) {
      let style = !horizontal? {paddingLeft: 5}: {flex: 1};
      content = (
        <FlatList
          style={style}
          horizontal={horizontal}
          numColumns={horizontal? 1: 2}
          ListEmptyComponent={this.renderListEmptyComponent}
          keyExtractor={(item)=> item.product_id}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={this.renderListComponent}
        />
      );
    }
    return content;
  }
}


