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
import { navigateToReviews,navigateToShopDetails } from '../../../../navigation/RootNavActions';
import {Picker, Header} from "native-base";
import { Button } from 'react-native-elements';
import CartActions from '../../../cart/actions/CartActions';

const NONE = 'none';
const getOptionDataFromString = (value) => {
  const optionData = value.split('-');
  const optionId = optionData[0];
  const optionValueId = optionData[1]; 
  return {optionId, optionValueId};
}
const mergeOptionsToString = (optionId, optionValueId) => {
  return `${optionId}-${optionValueId}`
}
class ProductDetailScreen extends React.Component<any, any> {
  static defaultProps: any

  constructor(props) {
    super(props);
    const {itemId} = this.props.navigation.state.params;
    this.state = {
      isLoading: true,
      cartLoading: false,
      addCartForm: {
        option: [],
        quantity: 1,
        product_id: itemId,
      },
    };
    
    this.props.dispatch(ProductActions.getProductById(itemId))
  }

  componentDidMount() {
    // let {itemId} = this.props.navigation.state.params;
    // this.props.dispatch(ProductActions.getProductById(itemId))
  }

  goToShop = () => {
    const {data: {seller}} = this.props;
        // this.props.navigation.dispatch(navigateToShopDetails({itemId}));
    this.props.navigation.dispatch(navigateToShopDetails({ seller: seller }));
       
      }
  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    return {
      cartLoading: props.cartLoading,
    };
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

  handleAddToCart = () => {
    let cart = {...this.state.addCartForm};
    
    for (const optionkey of Object.keys(cart.option)) {
      let newKey = `option[${optionkey}]`;
      cart[newKey] = cart.option[optionkey];
    }
    delete cart.option;

    this.props.dispatch(CartActions.addToCart(cart));
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

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



  renderOptionsChildren = (productOption, optionId) => {
    let children = {props: {}};
    
    const nonItem = (
      <Picker.Item 
        label={'None'} 
        value={`${optionId}-${NONE}`} 
      />
    )

    if (productOption) {
      children = productOption.map((optionVal, index) => {
        return(
          <Picker.Item 
            label={`${optionVal.name} (${optionVal.price_prefix} ${optionVal.price})`} 
            value={mergeOptionsToString(optionId, optionVal.product_option_value_id)}
          />
        )
      });
    }

    children.unshift(nonItem)
    
    return children;
  }

  renderOptions = () => {
    const {data: {options}} = this.props;
    let content = null;
    let optionsArr = null;

    const onValueChange = (value: string) => {
      const {optionId, optionValueId} = getOptionDataFromString(value);

      let options = {...this.state.addCartForm.option};
      if (optionValueId === NONE) {
        delete options[optionId];
      } else {
        options[optionId] = optionValueId;
      }

      this.setState({
        addCartForm: {
          ...this.state.addCartForm,
          option: options,
        },
      });
    }

    if (options && options.length > 0) {
      optionsArr = options.map((option, index) => {
        let children = this.renderOptionsChildren(option.product_option_value, option.product_option_id);
        let  selectedValue = null;
        const {addCartForm: {option: stateOptions}} = this.state;
        console.log(stateOptions)
        if (stateOptions[option.product_option_id]) {
          selectedValue = `${option.product_option_id}-${stateOptions[option.product_option_id]}`;
        }

        console.log(selectedValue)

        content = (
          <View style={styles.optionContainer}>
            <Text style={styles.headingText}>{option.name}</Text>
            <Picker
              headerTitleStyle={{height: 0}}
              mode="dropdown"
              placeholder={`${Strings.SELECT}`}
              placeholderStyle={styles.optionsHeadingText}
              placeholderIconColor="#007aff"
              textStyle={styles.optionsHeadingText}
              style={{ width: undefined }}
              selectedValue={selectedValue}
              onValueChange={onValueChange}
            >
              {children}
            </Picker>
          </View>
        )
      });
    }
    
    return (
      <WhiteCard>
        {content}
      </WhiteCard>
    )
  }

  renderStoreDetailsCard = () => {
    const {data: {seller}} = this.props;
    let content = null;
    if (seller) {
      content = (
        <TouchableOpacity
        onPress={this.goToShop}
        >
        <WhiteCard >
          <Text style={styles.headingText}>{Strings.STORE_DETAILS}
            {/* {JSON.stringify(seller)} */}
           </Text>
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
          </TouchableOpacity>  
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

  renderCartButton = () => {
    return (
      <View style={{position: 'absolute', bottom: 10, left: 0, right: 0}}>
        <Button
          raised
          loading={this.state.cartLoading}
          onPress={this.handleAddToCart}
          rightIcon={{name: 'shopping-cart'}}
          title='Add to cart' />
      </View>
      
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
      const reviewsCard = this.renderReviewsCard();
      const optionsCard = this.renderOptions();
      const storeDetails = this.renderStoreDetailsCard();
      const refundPolicyCard = this.renderReturnPolicyCard();
      const cartButtons = this.renderCartButton();
      
       content = (
        <View style={styles.container}>
          {navBar}
          <ScrollView contentContainerStyle={{paddingBottom: 50}} style={styles.container}>
            {imageSwiper}
            {descriptionCard}
            {reviewsCard}
            {optionsCard}
            {storeDetails}
            {refundPolicyCard}
          </ScrollView>
          {cartButtons}
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
  return {
    data: state.product.productData,
    isLoading: state.product.productLoading || !state.product.productData,
    error: state.product.productError,
    cartLoading: state.cart.cartLoading,
  };
};

export default connect(mapStateToProps)(ProductDetailScreen);
