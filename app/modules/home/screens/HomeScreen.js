// @flow
import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  FlatList,
  AsyncStorage,
} from 'react-native';
import {SearchBar} from "react-native-elements";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './HomeScreen.styles';
import ItemSlider from "../components/ItemSlider/ItemSlider";
import Card from "../components/ItemSlider/Card";
import TitleBar from "../components/TitleBar/TitleBar";
import GridView from "../components/GridView/GridView";
import ProductActions from '../../product/actions/ProductActions';
import LoadingIndicator from '../../shared/components/loadingIndicator/LoadingIndicator';
import LoginActions from '../../login/actions/LoginActions';
import { navigateToItemListScreen } from '../../../navigation/RootNavActions';

const arr = ["1", "1", "1", "1", "1", "1", "1", "1", "1"];
class HomeScreen extends React.Component<any, any> {
  static defaultProps: any

  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
    this.getCategoryList();
  }

  getCategoryList = async () => {
    let categories = await AsyncStorage.getItem('categories');
    if (!categories) {
      this.props.dispatch(ProductActions.getCategoryList());
    }

    let user = await AsyncStorage.getItem('user');
    console.log(user)
    this.props.dispatch(LoginActions.postLogin({categories, user}));
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
    return <Card 
    title="{item.title}" />;
  };

  handleOnGridPress = (categories) => {
    this.props.navigation.dispatch(navigateToItemListScreen({categories}))
  }

  render() {
    const {isLoading} = this.props;
    let content = null;
    if(!isLoading) {
      content = (
        <ScrollView
          style={styles.container}>
          <View style={{flex:1}}>
            <SearchBar
              containerStyle={{ backgroundColor: "white" }}
              inputStyle={{ backgroundColor: "white" }}
              lightTheme
              placeholder="Search"
            />
            <Image
              style={styles.app_image}
              resizeMode='contain'
              source={require("../../../../assets/arcmall.png")}
            />
            <TitleBar name="Featured Shop" />
            <View style={styles.slider_view}>
              <ItemSlider />
            </View>   
            <TitleBar name="Featured Shop" />
            <Image
              style={styles.featuredShopsImage}
              source={require("../../../../assets/salepromo.png")}
            /> 
            <TitleBar name="Top Categories" />
            <View style={{flex:1}}>
              <GridView
                categories={this.props.categoryList}
                onPress={this.handleOnGridPress}
              />
            </View>
            
            {/* <FlatList
              style={{flex: 1}}
              numColumns={3}
              data={arr}
              renderItem={this._renderItem}
              columnWrapperStyle={styles.row}
            /> */}
          </View>
        </ScrollView>
      )
    } else {
      content = (
        <View style={styles.container}>
          <LoadingIndicator />
        </View>
      )
    }
      
      return content;
  }
}

HomeScreen.propTypes = {

};

HomeScreen.defaultProps = {

};

const mapStateToProps = (state, ownProps) => {
  return {
    categoryList: state.product.categoryList,
    isLoading: state.product.categoryListLoading,
  };
};

export default connect(mapStateToProps)(HomeScreen);
