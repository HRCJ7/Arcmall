// @flow
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './ProductListScreen.styles';
import NavigationBar from '../../../shared/components/NavigationBar/NavigationBar';
import Strings from '../../../shared/localization/localization';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import LoadingIndicator from '../../../shared/components/loadingIndicator/LoadingIndicator';
import ProductListItem from '../../components/productListItem/ProductListItem';

class ProductListScreen extends React.Component<any, any> {
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

  renderListItem = (item, index) => {
    return (
      <ProductListItem 
        item={item}
      />
    )
  }

  render() {
    const {isLoading, productList, productListError} = this.props;
    let content = null;
    const navBar = this.renderNavBar();
    if (isLoading) {
      content = (
        <View style={styles.container}>
          {navBar}
          <LoadingIndicator />
        </View>
      )
    } else if (!productListError){
      content = (
        <View style={styles.container}>
          {navBar}
          <FlatList
            data={productList}
            renderItem={this.renderListItem}
          />
        </View>
      );
    } else {

    }
    return (
      content
    );
  }
}

ProductListScreen.propTypes = {

};

ProductListScreen.defaultProps = {

};

const mapStateToProps = (state, ownProps) => {
  return {
    productList: state.product.productList.products,
    isLoading: state.product.productListLoading,
    productListError: state.product.productListError,
  };
};

export default connect(mapStateToProps)(ProductListScreen);
