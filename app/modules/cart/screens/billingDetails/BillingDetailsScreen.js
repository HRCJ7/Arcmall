// @flow
import React from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./BillingDetailsScreen.styles";
import NavigationBar from "../../../shared/components/NavigationBar/NavigationBar";
import Strings from "../../../shared/localization/localization";
import EvilIcons from "react-native-vector-icons/dist/EvilIcons";
import LoadingIndicator from "../../../shared/components/loadingIndicator/LoadingIndicator";
import CartListItem from "../../components/cartListItem/CartListItem";
import { navigateToItemDetails } from "../../../../navigation/RootNavActions";
import ArcmallButton from "../../../shared/components/arcmallButton/ArcmallButton";
import CartActions from "../../actions/CartActions";
import { getForm, defaultRequestHeaders, getCookie } from "../../../../services/RestService";
import Config from 'react-native-config';
import {Picker, Header, Icon} from "native-base";
import { showToast } from "../../../../theme/Base";

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
      // subTotal: 0,
      // total: 0,
      // tax: 0,
      // shipping: 0,
      shippingMethods: null,
      selectedShippingMethod: 'free.free',
    };

    this.props.dispatch(CartActions.getCart());

  }

  componentDidMount() {
    this.getShippingDetails();
  }

  static getDerivedStateFromProps(props, state) {
    // Return state object, retun null to update nothing;
    const {cartData} = props;

    return {
      products: cartData? cartData.products: [],
      isLoading: props.isLoading,
      totals: cartData && cartData.totals? cartData.totals: [],
      // subTotal: cartData && cartData.totals? cartData.totals[0]: {},
      // total: cartData && cartData.totals? cartData.totals[1]: {},
      // shipping: cartData && cartData.totals? ca
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if(this.props.cartData) {
    //   return false;
    // }
    return true;
  }

  componentDidUpdate() {
  }

  handleProductOnPress = (item, index) => {
    const products = [...this.state.products];
   
  };

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
    return <NavigationBar title={Strings.YOUR_CART} />;
  };

  renderShipingRow = ({item}) => {
    let address2 = null;
    if (item.address_2 !== '') {
      address2 = (<Text style={styles.address}>{`${item.address_2}`}</Text>)
    }

    return (
      <View style={styles.addressView}>
        <Text style={styles.addressName}>{`${item.firstname} ${item.lastname}`}</Text>
        <Text style={styles.address}>{`${item.address_1}`}</Text>
        {address2}
        <Text style={styles.address}>{`${item.city}`}</Text>
        <Text style={styles.address}>{`${item.country}`}</Text>
        <Text style={styles.address}>{`${item.postcode}`}</Text>
      </View>
    )
  }

  renderShippingContent = () => {
    const {addresses} = this.state;
    let content = null;
    if(addresses) {
      content = (
        <View style={styles.container}>
          {this.renderNavBar(this.renderRightAction())}
          <FlatList
            style={{flex: 1}}
            extraData={this.state}
            data={addresses? addresses: []}
            keyExtractor={(item, index) => item.address_id.toString()}
            renderItem={this.renderShipingRow}
          />
        </View>
      )
    } else {
      content = (
        <View style={styles.container}>
          {this.renderNavBar()}
          <LoadingIndicator />
        </View>
      )
    }
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
    // else if(!user) {
    //     content = (
    //       <View style={styles.container}>
    //         {navBar}
    //         <Text style={styles.errorText}>{Strings.LOGIN_TO_SEE}</Text>
    //       </View>
    //     )
    // } 
    
    else {
      content = (
        <View style={styles.container}>
          {navBar}
          <FlatList
            style={styles.flatStyle}
            extraData={this.props}
            keyExtractor={item => item.product_id}
            data={products}
            renderItem={({ item, index }) => (
              <CartListItem
                item={item}
                onSubtract={this.onSubtract}
                onAdd={this.onAdd}
                onDelete={this.onDelete}
                onPress={this.handleProductOnPress(item, index)}
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
