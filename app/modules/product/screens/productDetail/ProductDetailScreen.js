// @flow
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './ProductDetailScreen.styles';
import LoadingIndicator from '../../../shared/components/loadingIndicator/LoadingIndicator';
import NavigationBar from '../../../shared/components/NavigationBar/NavigationBar';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Strings from '../../../shared/localization/localization';
import WhiteCard from '../../../shared/components/whiteCard/WhiteCard';
import Swiper from 'react-native-swiper';
import {CachedImage} from 'react-native-cached-image';
import ProductListItem from '../../components/productListItem/ProductListItem';
import ProductActions from '../../actions/ProductActions';
import CategoryTabNavigation from '../../../../navigation/categoryTab/CategoryTabNavigation';
import { navigateToReviews } from '../../../../navigation/RootNavActions';

class ProductDetailScreen extends React.Component<any, any> {
  static defaultProps: any

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    let {itemId} = this.props.navigation.state.params;
    console.log(itemId)
    this.props.dispatch(ProductActions.getProductById(itemId))
  }

  componentDidMount() {
    let {itemId} = this.props.navigation.state.params;
    this.props.dispatch(ProductActions.getProductById(itemId))
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

  handleOnBackPress = () => {
    this.props.navigation.goBack(null);
  }

  handleOnReviewsPress = () => {
    let {itemId} = this.props.navigation.state.params;
    this.props.navigation.dispatch(navigateToReviews({product_id: itemId}))
  }

  renderLeftAction = () => {
    return (
      <TouchableOpacity onPress={this.handleOnBackPress}>
        <Icon name='chevron-left' color='white' size={50}/>
      </TouchableOpacity>
    )
  }

  renderNavBar = () => {
    const {data: {heading_title}} = this.props;
    return (
      <NavigationBar
        title={heading_title}
        leftAction={this.renderLeftAction()}
      >
      </NavigationBar>
    )
  }

  renderSlides = () => {
    let {data: {thumb, images}} = this.props;
    let imagesArr = [thumb];
    if (images) {
      for (let image in images) {
        imagesArr.push(images[image].preview);
      }
    }

    return imagesArr.map(function(image, i){
      if (image) {
        return(
          <CachedImage
            key={i}
            resizeMode = 'contain'
            key={image}
            style={styles.image}
            source={{uri: image}}
          />
        );
      }
    });
  }

  renderImageSwiper = () => {
    return (
      <Swiper
        style={styles.imageSwiper}
        showsButtons={false}>
        {this.renderSlides()}
      </Swiper>
    )
  }

  renderButton = (title, action) => {
    return(
      <TouchableOpacity
      style={styles.blueButton}
      onPress={action}>
       <Text style={styles.blueButtonText}>{title}</Text>
      </TouchableOpacity>
    );
  }

  renderDescriptionCard = () => {
    const {data} = this.props;
    return (
      <WhiteCard>
        <Text style={styles.titleText}>{data.heading_title}</Text>
        <View style={styles.info}> 
          <Text style={styles.categoryText}>{'category name'}</Text>
          <Text style={styles.priceText}>{data.price}</Text>
        </View>
        <View style={styles.description}> 
          <Text style={styles.headingText}>{Strings.DESCRIPTION}</Text>
          <Text style={styles.smallText}>{data.description}</Text>
        </View>
      </WhiteCard>
    )
  }

  renderReviewsCard = () => {
    return (
      <WhiteCard>
        <Text style={styles.headingText}>{Strings.REVIEWS}</Text>
        <View style={styles.rightButton}> 
          {this.renderButton(Strings.SHOW_ALL, this.handleOnReviewsPress)}
        </View>
      </WhiteCard>
    )
  }

  renderStoreDetailsCard = () => {
    const {data: {seller}} = this.props;
    let content = null;
    if (seller) {
      content = (
        <WhiteCard>
          <Text style={styles.headingText}>{Strings.STORE_DETAILS}</Text>
          <View style={styles.info}> 
            <Text style={styles.smallText}>{`${seller.firstname} ${seller.lastname}`}</Text>
          </View>
          <View style={styles.ratings}>
            <IonIcon style={styles.ratingIcon} name="ios-star" size={15}/>
            <IonIcon style={styles.ratingIcon} name="ios-star" size={15} />
            <IonIcon style={styles.ratingIcon} name="ios-star" size={15} />
            <IonIcon style={styles.ratingIcon} name="ios-star-outline" size={15} />
            <IonIcon style={styles.ratingIcon} name="ios-star-outline" size={15} />
          </View>
          <View style={styles.contactSellerView}> 
            <Text style={styles.smallText}>{`281 items         28 Reviews`}</Text>
            {this.renderButton(Strings.CONTACT_SELLER)}
          </View>
        </WhiteCard>
      )
    }
    return content;
  }

  renderReturnPolicyCard = () => {
    return (
      <WhiteCard>
        <Text style={styles.headingText}>{Strings.RETURN_POLICY}</Text>
        <View style={styles.info}> 
          <Text style={styles.smallText}>{Strings.RETURN_TEXT}</Text>
        </View>
        <Text style={[styles.headingText, {marginTop: 20}]}>{Strings.BUYER_PROTECTION}</Text>
        <View style={styles.info}> 
          <Text style={styles.smallText}>{Strings.BUYER_TEXT}</Text>
        </View>
      </WhiteCard>
    )
  }

  render() {
    const {isLoading} = this.props;
    const navBar = this.renderNavBar();
    let content = null;

    if (isLoading) {
      content = (
        <View style={styles.container}>
          {navBar}
          <LoadingIndicator />
        </View>
      )
    } else {
      const imageSwiper = this.renderImageSwiper();
      const descriptionCard = this.renderDescriptionCard();
      const reviewsCard = this.renderReviewsCard()
      const storeDetails = this.renderStoreDetailsCard();
      const refundPolicyCard = this.renderReturnPolicyCard();
      

       content = (
        <View style={styles.container}>
          {navBar}
          <ScrollView style={styles.container}>
            {imageSwiper}
            {descriptionCard}
            {reviewsCard}
            {storeDetails}
            {refundPolicyCard}
          </ScrollView>
        </View>
       )
    }
    return (
      content
    );
  }
}

ProductDetailScreen.propTypes = {
  data: PropTypes.any,
  isLoading: PropTypes.bool,
};

ProductDetailScreen.defaultProps = {
  isLoading: true,
  data: null,
};

const mapStateToProps = (state, ownProps) => {
  console.log(state.product.productData)
  return {
    data: state.product.productData,
    isLoading: state.product.productLoading || !state.product.productData,
    error: state.product.productError,
  };
};

export default connect(mapStateToProps)(ProductDetailScreen);
