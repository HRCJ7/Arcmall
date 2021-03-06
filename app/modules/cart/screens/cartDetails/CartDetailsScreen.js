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
import { navigateToItemDetails, navigateToSettings } from "../../../../navigation/RootNavActions";
import ArcmallButton from "../../../shared/components/arcmallButton/ArcmallButton";
import CartActions from "../../actions/CartActions";
import { getForm, defaultRequestHeaders, getCookie } from "../../../../services/RestService";
import Config from 'react-native-config';
import {Picker, Header, Icon} from "native-base";
import { showToast } from "../../../../theme/Base";
import { ACTIVE_SCREEN_SHIPPING } from "../../../user/screens/settingsScreen/SettingsScreen";

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

    // if (products[index].toggle == false)
    // {
    //   products[index].toggle = true;
    //   this.setState({ products });
      
    // }
    // else {
    //   products[index].toggle = false;
    //   this.setState({ products });
    // }
   
  };

  getShippingDetails = async (value) => {
    let response = await fetch(`${BASE_URL}/shipping/methods`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        ...defaultRequestHeaders,
      },
    });

    response = await response.json();
    
    const shipping_methods = response.shipping_methods;
    let shippingMethods = [];

    for (const shippingMethod of Object.keys(shipping_methods)) {
      let shipMethd = shipping_methods[shippingMethod];
      let title = shipMethd.title;
      let quote = shipMethd.quote[shippingMethod];
      let code = null;
      let cost = null;
      let price = null;
      if (quote) {
        code = shipMethd.quote[shippingMethod].code;
        cost = shipMethd.quote[shippingMethod].cost;
        price = shipMethd.quote[shippingMethod].text;
      }
      
      console.log(title, code, cost, price);

      if(title && code && price) {
        shippingMethods.push({
          title,
          code,
          cost,
          price,
        });
      }
    }
    
    this.setState({
      shippingMethods: shippingMethods,
    })
  }

  setShippingDetails = async (shipping_method) => {
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...defaultRequestHeaders,
      },
      body: getForm({shipping_method: shipping_method})
    }

    console.log(options)

    let response = await fetch(`${BASE_URL}/shipping/method`, options);
    response = await response.json();
    console.log('TCL: response', response)
    
    if (response.success) {
      this.props.dispatch(CartActions.getCart());
      this.setState({
        selectedShippingMethod: shipping_method,
      });
    } else if (response.error) {
      showToast(response.error);
    }
  }

  handleOnBackPress = () => {
    this.props.navigation.goBack(null);
  };

  handleCheckoutPress = () => {
    this.props.navigation.dispatch(navigateToSettings({activeScreen: ACTIVE_SCREEN_SHIPPING, fromCart: true}))
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

  // renderListItem = (item, index) => {
  //   return <CartListItem item={item}
  //   onSubtract={() => this.onSubtract(item, index)}
  //   onAdd={() => this.onAdd(item, index)} onPress={this.handleProductOnPress} />;
  // };

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

  renderOptionsChildren = (shippingMethods) => {
    let children = shippingMethods.map((optionVal, index) => {
      return(
        <Picker.Item 
          label={`${optionVal.title} (+ ${optionVal.price})`} 
          value={optionVal.code}
        />
      )
    });
    return children;
  }

  renderOptions = () => {
    const {shippingMethods} = this.state;
    let content = null;
    const onValueChange = async (value: string) => {
      this.setState({
        isLoading: true,
      })
      this.setShippingDetails(value);
    }

    if (shippingMethods && shippingMethods.length > 0) {
      let children = this.renderOptionsChildren(shippingMethods);
      let selectedValue = this.state.selectedShippingMethod;

      content = (
        <View style={styles.optionContainer}>
          <Text style={styles.bold}>{'Select shipping'}</Text>
          <View style={{
          alignItems: 'flex-end', 
          flexDirection:'column', 
          justifyContent: 'center', 
          marginRight: -12}}>
            <Picker
              headerTitleStyle={{height: 0}}
              mode="dropdown"
              placeholder={`${Strings.SELECT}`}
              placeholderStyle={styles.optionsHeadingText}
              placeholderIconColor="#007aff"
              iosIcon={<Icon name="arrow-down"/>}
              textStyle={styles.normal}
              selectedValue={selectedValue}
              onValueChange={onValueChange}
            >
              {children}
            </Picker>
          </View>
          
        </View>
      )
    }
      
    return content;
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

    const client = {
			sandbox:    'AU0xwkp09ogOUgLWIglNEgjpuxUmAAuh1V.zQx3XPVon.5DddW5vbOhA',
			production: 'AU0xwkp09ogOUgLWIglNEgjpuxUmAAuh1V.zQx3XPVon.5DddW5vbOhA',
		}

    content = (
      <View style={styles.itemInfoContainer}>
        {this.renderOptions()}
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
