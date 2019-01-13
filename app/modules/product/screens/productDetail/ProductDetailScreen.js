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
import Strings from '../../../shared/localization/localization';
import WhiteCard from '../../../shared/components/whiteCard/WhiteCard';
import Swiper from 'react-native-swiper';
import {CachedImage} from 'react-native-cached-image';


class ProductDetailScreen extends React.Component<any, any> {
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

  handleOnBackPress = () => {
    this.props.navigation.goBack();
  }

  renderLeftAction = () => {
    return (
      <TouchableOpacity onPress={this.handleOnBackPress}>
        <Icon name='chevron-left' color='white' size={50}/>
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

  renderSlides = () => {
    let {data: {thumb, images}} = this.props;
    let imagesArr = [thumb];
    if (images) {
      for (let image in images) {
        imagesArr.push(images[image].preview);
      }
    }

    return imagesArr.map(function(image, i){
      return(
        <CachedImage
          key={i}
          resizeMode = {'contain'}
          key={image}
          style={styles.image}
          source={{uri: image}}
        />
      );
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

  // <View style={styles.slide3}>
  //           <Text style={styles.text}>And simple</Text>
  //         </View>

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
          <Text style={styles.titleText}>{Strings.DESCRIPTION}</Text>
          <Text style={styles.descriptionText}>{data.description}</Text>
        </View>
      </WhiteCard>
    )
  }

  renderAddCardCard = () => {
    <WhiteCard>
        <Text style={styles.titleText}>{data.heading_title}</Text>
        <View style={styles.info}> 
          <Text style={styles.categoryText}>{'category name'}</Text>
          <Text style={styles.priceText}>{data.price}</Text>
        </View>
        <View style={styles.description}> 
          <Text style={styles.titleText}>{Strings.DESCRIPTION}</Text>
          <Text style={styles.descriptionText}>{data.description}</Text>
        </View>
      </WhiteCard>
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

       content = (
        <View style={styles.container}>
          {navBar}
          <ScrollView style={styles.container}>
            {imageSwiper}
            {descriptionCard}
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
  return {
    data: state.product.productData,
    isLoading: state.product.productLoading || !state.product.productData,
    error: state.product.productError,
  };
};

export default connect(mapStateToProps)(ProductDetailScreen);
