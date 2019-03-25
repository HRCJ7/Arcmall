// @flow
import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  Button,
  FlatList,
  AsyncStorage,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./ShopDetailScreen.styles";
import {
  navigateToMainTabScreen,
  navigateToLoginScreen,
  navigateToSignInBuyerScreen,
  navigateToSettings,
  navigateToItemDetails
} from "../../../../navigation/RootNavActions";
import {
  MAIN_TAB_PROFILE,
  MAIN_TAB_HOME
} from "../../../../navigation/mainTab/MainTabRoutes";
import LoginActions from "../../../login/actions/LoginActions";
import {
  ACTIVE_SCREEN_SETTINGS,
  STORAGE_USER,
  COOKIE_PHPSSID
} from "../../../../Constants";
import { getUser } from "../../../../store/AsyncStorageHelper";
import NavigationBar from "../../../shared/components/NavigationBar/NavigationBar";
import Strings from "../../../shared/localization/localization";
import EvilIcons from "react-native-vector-icons/dist/EvilIcons";
import LoadingIndicator from "../../../shared/components/loadingIndicator/LoadingIndicator";
import Theme from "../../../../theme/Base";
import ShopListItem from "../../components/shopListItem/ShopListItem";
import { getSellerProducts } from "../productList/ProductApis";
import ProductListItem from "../../components/productListItem/ProductListItem";

let nextStart = 0
const ITEM_LIMIT = 10;
class ShopDetailScreen extends React.Component<any, any> {
  static defaultProps: any;

  constructor(props) {
  
    super(props);
    const {seller} = this.props.navigation.state.params;
    this.state = {
      seller: seller,
      isLoading: null,
      sellerProducts: [],
    };
  }

  componentDidMount() {
    this.getSellerProducts();
  }

  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate() {}

  onListEndReached = async () => {
    
  }

  getSellerProducts = async () => {
    let {seller} = this.state;
    if (seller) {
      let sellerProducts = await getSellerProducts(seller.customer_id, nextStart, ITEM_LIMIT);
      nextStart = nextStart + ITEM_LIMIT;
      this.setState({
        sellerProducts: sellerProducts.products,
      })
    }
    
  }
  
  handleProductOnPress = (itemId: number) => {
    alert(itemId)
    this.props.navigation.dispatch(navigateToItemDetails({itemId}));
  }

  handleOnBackPress = () => {
    this.props.navigation.goBack(null);
  };

  renderLeftAction = () => {
    return (
      <TouchableOpacity onPress={this.handleOnBackPress}>
        <EvilIcons name="chevron-left" color="white" size={50} />
      </TouchableOpacity>
    );
  };

  renderNavBar = () => {
    return (
      <NavigationBar
        title={Strings.SHOP}
        leftAction={this.renderLeftAction()}
      />
    );
  };

  render() {
    let content = null;
    const {sellerProducts} = this.state;
    const navBar = this.renderNavBar();

    // if (!userInfo) {
    //   content = (
    //     <View style={styles.container}>
    //       {navBar}
    //       <LoadingIndicator />
    //     </View>
    //   )
    // } else {
    content = (
      <View style={styles.container}>
        {navBar}
        <ImageBackground
            source={require("../../../../../assets/profile.png")}
            style={styles.imageContainer}
          >
          <Text style={styles.shopName}>{`${this.state.seller.companyname}`}</Text>  
        </ImageBackground>
        <FlatList
          onEndReached={this.onListEndReached}
          ListEmptyComponent={
            <View style={styles.container}>
              <LoadingIndicator />
            </View>
          }
          style={styles.flatStyle}
          extraData={this.state}
          keyExtractor={item => item.product_id}
          data={sellerProducts}
          renderItem={({item, index}) => (
            <ProductListItem
              item={{item}}
              de
              onPress={this.handleProductOnPress}
            />
          )}
        />
      </View>
    );
    // }

    return content;
  }
}

ShopDetailScreen.propTypes = {};

ShopDetailScreen.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(ShopDetailScreen);
