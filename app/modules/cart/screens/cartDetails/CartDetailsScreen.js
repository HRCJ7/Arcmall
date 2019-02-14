// @flow
import React from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./CartDetailsScreen.styles";
import NavigationBar from "../../../shared/components/NavigationBar/NavigationBar";
import Strings from "../../../shared/localization/localization";
import EvilIcons from "react-native-vector-icons/dist/EvilIcons";
import LoadingIndicator from "../../../shared/components/loadingIndicator/LoadingIndicator";
import CartListItem from "../../components/cartListItem/CartListItem";
import { navigateToItemDetails, navigateToSettings, navigateToCartCheckoutScreen } from "../../../../navigation/RootNavActions";
import ArcmallButton from "../../../shared/components/arcmallButton/ArcmallButton";
import CartActions from "../../actions/CartActions";
import { getForm, defaultRequestHeaders, getCookie } from "../../../../services/RestService";
import Config from 'react-native-config';
import {Header, Icon} from "native-base";
import { showToast } from "../../../../theme/Base";
import { ACTIVE_SCREEN_SHIPPING } from "../../../user/screens/settingsScreen/SettingsScreen";
import { getShippingDetails, setShippingDetails } from "../cartCheckout/CartCheckoutApis";

const BASE_URL: string = `${Config.API_URL}`;

const getValueFromCurrency = (currency) => {
  return Number(currency.replace(/[^0-9.-]+/g,''));
}

class CartDetailsScreen extends React.Component<any, any> {
  static defaultProps: any;

  static navigationOptions: any = ({navigation}) => ({
    title: Strings.YOUR_CART,
  });

  constructor(props) {
    super(props);
    const params = props.navigation.state.params;
    this.state = {
      isLoading: true,
      products: null,
      totals: [],
      isLoggedIn: props.user,
      shippingMethods: null,
      selectedShippingMethod: 'free.free',
    };
  }

  componentDidMount() {
    // this.props.dispatch(CartActions.getCart());
    this.getCart();
  }

  static getDerivedStateFromProps(props, state) {
    // Return state object, retun null to update nothing;
    const {cartData} = props;

    return {
      products: cartData? cartData.products: [],
      isLoading: props.isLoading,
      totals: cartData && cartData.totals? cartData.totals: [],
    };
  }

  getCart = async () => {
    // this.setState({
    //   isLoading: true,
    // })
    // const shippingDetails = await getShippingDetails();
    // const shippingSet = await setShippingDetails('free.free');
    // console.log(shippingSet);
    this.props.dispatch(CartActions.getCart());
    // console.log(shippingDetails)
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if(this.props.cartData) {
    //   return false;
    // }
    return true;
  }

  componentDidUpdate() {
  }

  handleOnBackPress = () => {
    this.props.navigation.goBack(null);
  };

  handleCheckoutPress = () => {
    const {products} = this.state;
    if (products && products.length > 0) {
      this.props.navigation.dispatch(navigateToCartCheckoutScreen())
    } else {
      alert(Strings.EMPTY_CART)
    }
  }

  renderLeftAction = () => {
    return (
      <TouchableOpacity onPress={this.handleOnBackPress}>
        <EvilIcons name="chevron-left" color="white" size={50} />
      </TouchableOpacity>
    );
  };

  renderNavBar = () => {
    return <NavigationBar title={Strings.YOUR_CART} />;
  };

  onSubtract = (item) => {
    if (item.quantity > 1) {
      let quantity = item.quantity - 1;
      this.props.dispatch(CartActions.editCart({key: item.cart_id, quantity: quantity}));
    }
  };

  onAdd = (item) => {
    this.props.dispatch(CartActions.editCart({key: item.cart_id, quantity: 1 + item.quantity}));
  };

  onDelete = (item) => {
    this.props.dispatch(CartActions.removeFromCart({key: item.cart_id}));
  }

  renderPriceCard = () => {
    let content = null;
    const {totals} = this.state;

    const getTotalView = () => {
      const {totals} = this.state;
      let views = [];
      let index = 0;
      for (const total of totals) {
        views.push(
          <View style={{height: 30}}>
            {(() => {
              if (index === totals.length - 1) {
                return (
                  <View style={styles.line} />
                )
              }
            })()}
            <View
              key={total.title}
              style={styles.bottomRowAction}>
                <Text style={styles.textBold}>{total.title}</Text>
                <Text style={styles.textNormal}>{total.text}</Text>
              </View>
          </View>
          
        )
        index ++;
      }

      return views;
    }

    content = (
      <View style={styles.itemInfoContainer}>
        {getTotalView()}
        <ArcmallButton
          title={Strings.CHECKOUT}
          onPress={this.handleCheckoutPress}
          style={{ marginTop: 5, marginBottom: 10, width: "80%" }}
        />
      </View>
    )

    return content;
  }

  render() {
    const {products, isLoading, isLoggedIn} = this.state;
    const {user} = this.props;
    const navBar = this.renderNavBar();
    const priceCard = this.renderPriceCard();
    let content = null;

    if (isLoading) {
      content = (
        <View style={styles.container}>
          {navBar}
          <LoadingIndicator />
        </View>
      )
    } 
    else if(!user) {
        content = (
          <View style={styles.container}>
            {navBar}
            <Text style={styles.errorText}>{Strings.LOGIN_TO_SEE}</Text>
          </View>
        )
    }
    else {
      content = (
        <View style={styles.container}>
          {navBar}
          <FlatList
            style={styles.flatStyle}
            extraData={this.props}
            keyExtractor={(item) => item.product_id}
            data={products}
            renderItem={({ item, index }) => (
              <CartListItem
                item={item}
                onSubtract={this.onSubtract}
                onAdd={this.onAdd}
                onDelete={this.onDelete}
              />
            )}
          />
          {priceCard}
        </View>
      );
    }

    return content;
  }
}

CartDetailsScreen.propTypes = {
  isLoading: PropTypes.bool,
  productList: PropTypes.any,
  productListError: PropTypes.any
};

CartDetailsScreen.defaultProps = {
  isLoading: true,
  productList: null,
  productListError: null
};

const mapStateToProps = (state, ownProps) => {
  return {
    cartData: state.cart.cartData,
    isLoading: state.cart.cartLoading,
    cartError: state.cart.cartError,
    user: state.login.user,
  };
};

export default connect(mapStateToProps)(CartDetailsScreen);
