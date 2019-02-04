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
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      data: props.items,
    };
  }

  renderListComponent = ({item}) => {
    console.log(item)
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onItemPress(item.product_id);
        }}
        style={styles.list}
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
    return (
      <FlatList
        horizontal
        ListEmptyComponent={this.renderListEmptyComponent}
        keyExtractor={(item)=> item.title}
        showsHorizontalScrollIndicator={false}
        data={this.state.data}
        renderItem={this.renderListComponent}
      />
    );
  }
}


