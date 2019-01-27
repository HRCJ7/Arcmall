// @flow
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './CategoryListScreen.styles';
import NavigationBar from '../../../shared/components/NavigationBar/NavigationBar';
import Strings from '../../../shared/localization/localization';
import LoadingIndicator from '../../../shared/components/loadingIndicator/LoadingIndicator';
import {navigateToItemListScreen } from '../../../../navigation/RootNavActions';
import ProductActions from '../../actions/ProductActions';
import GridView from '../../components/GridView/GridView';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';

class CategoryListScreen extends React.Component<any, any> {
  static defaultProps: any

  constructor(props) {
    super(props);
    const params = props.navigation.state.params;
    props.dispatch(ProductActions.getProductList({
      search: '',
      category_id: params.category_id,
    }))
  }

  componentDidMount() {
  
  }

  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    return state;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate() {
    
  }

  handleOnBackPress = () => {
    this.props.navigation.goBack(null);
  }

  handleOnGridPress = (categories) => {
    this.props.navigation.dispatch(navigateToItemListScreen({categories}))
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
        title={Strings.ALL_CATEGORIES}
        leftAction={this.renderLeftAction()}
      >
      </NavigationBar>
    )
  }

  render() {
    const {isLoading, productList, productListError, navigation: {state: {params: {loadingCategories}}}} = this.props;
    let content = null;
    const navBar = loadingCategories? null: this.renderNavBar();
    if (isLoading) {
      content = (
        <View style={styles.container}>
          {navBar}
          <LoadingIndicator />
        </View>
      )
    } else {
      content = (
        <View style={styles.container}>
          {navBar}
          <ScrollView style={styles.container}>
            <GridView
              all
              categories={this.props.categoryList}
              onPress={this.handleOnGridPress}
            />
          </ScrollView>
        </View>
      );
    }
    return (
      content
    );
  }
}

CategoryListScreen.propTypes = {
  isLoading: PropTypes.bool,
  productList: PropTypes.any,
  productListError: PropTypes.any, 
};

CategoryListScreen.defaultProps = {
  isLoading: true,
  productList: null,
  productListError: null, 
};

const mapStateToProps = (state, ownProps) => {
  return {
    categoryList: state.product.categoryList,
    isLoading: state.product.categoryListLoading,
  };
};

export default connect(mapStateToProps)(CategoryListScreen);
