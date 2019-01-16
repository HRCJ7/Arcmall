// @flow
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {createAppContainer, createMaterialTopTabNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import ProductListScreen from '../../modules/product/screens/productList/ProductListScreen';
import Theme, { font } from '../../theme/Base';
import MainTabNavigation from '../mainTab/MainTabNavigation';
import NavigationBar from '../../modules/shared/components/NavigationBar/NavigationBar';
import Strings from '../../modules/shared/localization/localization';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import { splitCategoryName } from '../../services/ExternalServices';

const config = {
  swipeEnabled: true,
  createTabNavigator: 'top',
  lazy: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
    scrollEnabled: true,
    labelStyle: {
      ...font,
      fontSize: 11,
      color: 'black',
    },
    style: {
      backgroundColor: 'white',
    },
    indicatorStyle: {
      backgroundColor: Theme.colors.secondary,
    }
  }
};

class CategoryTabNavigation extends React.Component {

  static router = null;

  constructor(props) {
    super(props);
    this.state = {
      routes: this.getRoutes(),
    }
  }

  getRoutes = () => {
    let routes = {};
    console.log(this.props)
    if (this.props.navigation && this.props.navigation.state) {
      let {navigation : {state: {params: {categories}}}} = this.props;
      console.log(categories)
      for (let categoryIndex in categories) {
        const category = categories[categoryIndex];
        // const {name, count} = splitCategoryName(category.name);
        const name = category.name;
        routes[name] = {
          screen: ProductListScreen,
          path: `/${name}`,
          navigationOptions: {
            tabBarLabel: name,
          },
          params: {
            loadingCategories: true,
            category_id: category.category_id,
            navigation: this.props.navigation, 
          } 
        };
      }

      return routes;
    }
    
  }

  handleOnBackPress = () => {
    this.props.navigation.goBack(null);
  }

  renderLeftAction = () => {
    return (
      <TouchableOpacity onPress={this.handleOnBackPress}>
        <EvilIcons name='chevron-left' color='white' size={50}/>
      </TouchableOpacity>
    )
  }

  renderNavBar = () => {
    return (
      <NavigationBar
        title={Strings.PRODUCT_DETAILS}
        leftAction={this.renderLeftAction()}
      >
      </NavigationBar>
    )
  }
  

  render() {
    const {routes} = this.state;
    let content = null;

    if (routes) {
      const CategoryTabNavigtor = createMaterialTopTabNavigator(routes, config);
      const AppContainer = createAppContainer(CategoryTabNavigtor);

      let nav = {...this.props.navigation}
      nav.goBack = this.props
      content = (
        <View style={{flex: 1}}>
          {this.renderNavBar()}
          <AppContainer goBack={this.props.navigation}/>
        </View>
      );
    }

    return content;
    
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
  };
};

export default connect(mapStateToProps)(CategoryTabNavigation);
