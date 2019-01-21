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
import styles from './ReviewsScreen.styles';
import NavigationBar from '../../../shared/components/NavigationBar/NavigationBar';
import Strings from '../../../shared/localization/localization';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import LoadingIndicator from '../../../shared/components/loadingIndicator/LoadingIndicator';
import ProductListItem from '../../components/productListItem/ProductListItem';
import { navigateToItemDetails } from '../../../../navigation/RootNavActions';
import ProductActions from '../../actions/ProductActions';
import Toast from 'react-native-simple-toast';
import ReviewListItem from '../../components/reviewListItem/ReviewListItem';

class ReviewsScreen extends React.Component<any, any> {
  static defaultProps: any

  constructor(props) {
    super(props);
    console.log(props)
    const params = props.navigation.state.params;
    this.props.dispatch(ProductActions.getReviews({
      product_id: params.product_id,
    }));
  }

  componentDidMount() {
    // this.props.dispatch(ProductActions.getReviews({
    //   product_id: 203,
    // }));
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

  handleProductOnPress = (itemId: number) => {
    this.props.navigation.dispatch(navigateToItemDetails({itemId}));
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
        title={Strings.REVIEWS}
        leftAction={this.renderLeftAction()}
      >
      </NavigationBar>
    )
  }

  renderListItem = (item, index) => {
    return (
      <ReviewListItem
        item={item}
      /> 
    )
  }

  render() {
    const {reviews, reviewsLoading, reviewsError} = this.props;
    const navBar = this.renderNavBar();
    let content = null;
    if (reviewsLoading) {
      content = (
        <View style={styles.container}>
          {navBar}
          <LoadingIndicator />
        </View>
      )
    } else if (!reviewsLoading){
      content = (
        <View style={styles.container}>
          {navBar}
          <FlatList
            keyExtractor={(item, index) => `${item.description}${index}`}
            data={reviews}
            renderItem={this.renderListItem}
          />
        </View>
      );
    } else {
      Toast.show(Strings.SOMETHING_WENT_WRONG);
    }
    return (
      content
    );
  }
}

ReviewsScreen.propTypes = {
  reviewsLoading: PropTypes.bool,
  reviews: PropTypes.any,
  reviewsError: PropTypes.any, 
};

ReviewsScreen.defaultProps = {
  reviewsLoading: true,
  reviews: null,
  reviewsError: null, 
};

const mapStateToProps = (state, ownProps) => {
  return {
    reviews: state.product.reviews,
    reviewsLoading: state.product.reviewsLoading,
    reviewsError: state.product.reviewsError,
  };
};

export default connect(mapStateToProps)(ReviewsScreen);
