// @flow
import React from "react";
import { Text, View, TouchableOpacity, FlatList, Modal } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./CartCheckoutScreen.styles";
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
import Theme, { showToast } from "../../../../theme/Base";
import { ACTIVE_SCREEN_SHIPPING } from "../../../user/screens/settingsScreen/SettingsScreen";
import { getShippingDetails, setShippingDetails, addOrder, getPaymentMethods, setPaymentMethod, pay, getPaypalAccessToken, configurePaypal } from "../cartCheckout/CartCheckoutApis";
import WhiteCard from "../../../shared/components/whiteCard/WhiteCard";
import UserActions from "../../../user/actions/UserActions";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { ORDER_HISTORY } from "../../../../Constants";
import { setPaymentAddress } from "../../../user/screens/settingsScreen/settingApis";
import { ROOT_NAV_YOUR_CART } from "../../../../navigation/RootRoutes";

const BASE_URL: string = `${Config.API_URL}`;

const SHIPPING_METHOD_MODAL = 'shippingModal';

const getValueFromCurrency = (currency) => {
  return Number(currency.replace(/[^0-9.-]+/g,''));
}

class CartCheckoutScreen extends React.Component<any, any> {
  static defaultProps: any;

  static navigationOptions: any = ({navigation}) => ({
    title: Strings.CHECKOUT,
  });

  constructor(props) {
    super(props);
    const params = props.navigation.state.params;
    this.state = {
      isLoading: true,
      isComponentsLoading: false,
      products: null,
      totals: [],
      isLoggedIn: props.user,
      shippingMethods: [],
      shippingMethods: [],
      selectedShippingMethod: 'free.free',

      address: props.addresses? props.addresses[0]: null,
      shippingMethod: null,
      paymentMethod: null,
      
      subtotal: null,
      total: '',
      currency: 'USD',
    };
  }

  componentDidMount() {
    // this.props.dispatch(CartActions.getCart());
    this.getCart();
    this.getShippingMethods();
    this.setAddress();
    // this.setPaymentMethods();
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

  setAddress = async () => {
    if(this.state.address) {
      const response = await setPaymentAddress(this.state.address);
      if (response.error) {
        alert(JSON.stringify(response.error));
      }
    }
  }

  getShippingMethods = async () => {
    let shippingMethods = await getShippingDetails();
    if (shippingMethods && shippingMethods.length > 0) {
      this.setState({
        shippingMethods: shippingMethods,
      })
    }
  }

  setTotal = async (totalText) => {
    setTimeout(() => { 
      this.setState({
        total: getValueFromCurrency(totalText),
      })
    }, 2000);
  }

  getCart = () => {
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

  onAddressSelected = (address) => {
    this.setState({
      address: address,
      shippingMethod: null,
      paymentMethod: null,
    });
    this.getCart();
  }

  onClose = (variable) => {
    this.setState({
      [variable]: false,
    })
  }

  showModal = (variable) => {
    this.setState({
      [variable]: true,
    })
  }

  onShippingMethodSelected = async (method) => {
    this.setState({
      shippingMethod: method,
      isComponentsLoading: true,
    });
    const response = await setShippingDetails(method.code);
    console.log(response)
    if (response.error) {
      this.setState({
        isComponentsLoading: false,
      });
      alert(JSON.stringify(response.error));
    } else {
      const paymentMethods = await getPaymentMethods();
      if (paymentMethods.error) {
        this.setState({
          isComponentsLoading: false,
        });
        alert(JSON.stringify(paymentMethods.error));
      }
      if (paymentMethods.length > 0) {
        const paymentResponse = await setPaymentMethod(paymentMethods[0].code)
        if (paymentResponse.error) {
          this.setState({
            isComponentsLoading: false,
          });
          alert(paymentResponse.error)
        } else if (paymentResponse.success){
          this.setState({
            paymentMethods: paymentMethods,
            paymentMethod: paymentMethods[0],
            isComponentsLoading: false,
          })
          this.getCart();
        }
      }
    }
  }

  handleOnBackPress = () => {
    this.props.navigation.goBack(null);
  };

  handleCheckoutPress = async () => {

    const {total, currency, address} = this.state;

    if(address.address_1 === "" || 
    address.address_2 === "" ||
    address.city === "" ||
    address.zone_id === "0" ||
    address.country_d === "0"
    ) {
      alert(Strings.PLEASE_VALID_ADDRESS);
    } else {
      const response = await addOrder({
        affiliate_id: 0,
        order_status_id: ORDER_HISTORY.PROCESSING,
      });
      if (response.success) {
        const response = await configurePaypal(total, currency, 'Arcmall Cart');
        console.log(response)
        this.props.navigation.goBack(null);
        if (response.response.state === 'approved') {
          this.props.navigation.goBack(null);
        }
      } else if (response.error) {
        alert(response.error)
      }
    }
    
    // let obj = {
    //   intent: 'sale',
    //   payer: {
    //     payment_method: 'paypal'
    //   },
    //   transactions: [
    //     {
    //       amount: {
    //         total: total,
    //         currency: currency,
    //         // details: {
    //         //   subtotal: '30.00',
    //         //   tax: '0.07',
    //         //   shipping: '0.03',
    //         //   handling_fee: '1.00',
    //         //   shipping_discount: '-1.00',
    //         //   insurance: '0.01'
    //         // }
    //       },
    //       description: 'The payment transaction description.',
    //       // custom: 'EBAY_EMS_90048630024435',
    //       // invoice_number: '48787589673',
    //       payment_options: {
    //         allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
    //       },
    //       // soft_descriptor: 'ECHI5786786',
    //       item_list: {
    //         // items: [
    //         //   {
    //         //     name: 'hat',
    //         //     description: 'Brown hat.',
    //         //     quantity: '5',
    //         //     price: '3',
    //         //     tax: '0.01',
    //         //     sku: '1',
    //         //     currency: 'USD'
    //         //   },
    //         //   {
    //         //     name: 'handbag',
    //         //     description: 'Black handbag.',
    //         //     quantity: '1',
    //         //     price: '15',
    //         //     tax: '0.02',
    //         //     sku: 'product34',
    //         //     currency: 'USD'
    //         //   }
    //         // ],
    //         shipping_address: {
    //           recipient_name: `${address.firstname} ${address.lastname}`,
    //           line1: address.address_1,
    //           line2: address.address_2,
    //           city: address.city,
    //           country_code: address.iso_code_3,
    //           postal_code: address.postcode,
    //           phone: '',
    //           state: address.zone_code,
    //         }
    //       }
    //     }
    //   ],
    //   note_to_payer: 'Contact us for any questions on your order.',
    //   redirect_urls: {
    //     return_url: 'https://example.com/return',
    //     cancel_url: 'https://example.com/cancel'
    //   }
    // }

    // const response = await configurePaypal(total, currency, 'Arcmall Cart');
    // console.log(response)
    // console.log(response)
    // if (response.access_token) {
    //   let token = `Bearer ${response.access_token}`;
    //   const payresp = await pay(token, obj)
    //   console.log(payresp)
    // } else {
    //   alert('authentication failed');
    // }

    // const response = await addOrder({
    //   affiliate_id: 0,
    //   order_status_id: ORDER_HISTORY.PROCESSING,
    // });
    // if (response.success) {

    // } else if (response.error) {
    //   alert(response.error)
    // }

    

    // this.props.navigation.dispatch(navigateToSettings({activeScreen: ACTIVE_SCREEN_SHIPPING, fromCart: true}))
  }

  renderLeftAction = () => {
    return (
      <TouchableOpacity onPress={this.handleOnBackPress}>
        <EvilIcons name="chevron-left" color="white" size={50} />
      </TouchableOpacity>
    );
  };

  renderNavBar = () => {
    return <NavigationBar
    leftAction={this.renderLeftAction()}
    title={Strings.YOUR_CART} />;
  };

  getOptionModalView = (variable, options, selectedItem, onSelected, onClose) => {
    const listView = (options, selected) => {
      return (
        <FlatList 
          data={options}
          exrtaData={this.state}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => {
            let isSelected = (item.code === selected? selected.code: '');
            const fontWeight = isSelected? Theme.fontWeight.semibold: Theme.fontWeight.light;
            return (
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => {
                  if (!isSelected) {
                    onClose(variable);
                    onSelected(item);
                  }
              }}>
              <ListItem
                title={`${item.title} (+ ${item.price})`}
                titleStyle={{ color: 'black', fontWeight}}
                chevronColor="white"
              />
             </TouchableOpacity>
            )
          }}
        />
      )
    }

    return (
      <Modal
        animationType="slide"
        transparent={false}
        presentationStyle='overFullScreen'
        visible={this.state[variable]? this.state[variable]: false}
        onRequestClose={() => {
          onClose(variable)
        }}>
        <View style={{flex: 1, justifyContent:'flex-end'}}>
          <View style={{height: 50, justifyContent:'flex-end', paddingLeft: 10}}>
            <TouchableOpacity onPress={() => {
              onClose(variable)
            }} style={{height: 50, width: 50, justifyContent:'flex-end'}}>
              <EvilIcons name='close' size={25} />
            </TouchableOpacity>
          </View>
          {listView(options, selectedItem)}
        </View>
      </Modal>
    )
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
          <View style={{height: 30, width: '100%'}}>
            {(() => {
              if (index === totals.length - 1) {
                this.setTotal(total.text);
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
        <View style={{paddingVertical: 20}}>
          {getTotalView()}
        </View>
        <ArcmallButton
          title={Strings.CHECKOUT}
          onPress={this.handleCheckoutPress}
        />
      </View>
    )

    return content;
  }

  renderAddressComponent = () => {
    let content = null;

    const {address} = this.state;
    if (address) {
      content =  (
        <View style={{flex: 1, alignItems: "flex-start"}}>
          <Text style={styles.addressName}>{`${address.firstname} ${address.lastname}`}</Text>
          <Text style={styles.address}>{`${address.address_1}`}</Text>
          <Text style={styles.address}>{`${address.city}`}</Text>
          <Text style={styles.address}>{`${address.country}`}</Text>
          <Text style={styles.address}>{`${address.postcode}`}</Text>
        </View>
      )
    }
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.dispatch(navigateToSettings({
            activeScreen: ACTIVE_SCREEN_SHIPPING,
            fromCart: true,
            onShippingPressed: this.onAddressSelected,
          }))
        }}style={styles.addressView}>
        <WhiteCard>
          <Text style={styles.titleText}>{'Address'}</Text>
          <View style={styles.flexRowView}>
            {content}
            <EvilIcons style name="chevron-right" size={20} color="#000000" />
          </View>
        </WhiteCard>
      </TouchableOpacity>
    );
  }

  renderShippingComponent = () => {
    let content = null;

    const {shippingMethod, address} = this.state;
    if (shippingMethod) {
      content =  (
        <View style={{flex: 1, alignItems: "flex-start"}}>
          <Text style={styles.address}>{`${shippingMethod.title} (+ ${shippingMethod.price})`}</Text>
        </View>
      )
    }
    return (
      <TouchableOpacity
        onPress={() => {
          if(address.address_1 === "" ||
          address.address_2 === "" ||
          address.city === "" ||
          address.zone_id === "0" ||
          address.country_d === "0"
          ) {
            alert(Strings.PLEASE_VALID_ADDRESS);
          } else {
            this.showModal(SHIPPING_METHOD_MODAL)
          }
        }}style={styles.addressView}>
        <WhiteCard>
          <Text style={styles.titleText}>{'Shipping'}</Text>
          <View style={styles.flexRowView}>
            {content}
            <EvilIcons style name="chevron-right" size={20} color="#000000" />
          </View>
        </WhiteCard>
      </TouchableOpacity>
    );
  }

  renderPaymentComponent = () => {
    let content = null;

    const {paymentMethod} = this.state;
    if (paymentMethod) {
      content =  (
        <View style={{flex: 1, alignItems: "flex-start"}}>
          <Text style={styles.address}>{`${paymentMethod.title}`}</Text>
        </View>
      )
    }
    return (
      <View
        style={styles.addressView}>
        <WhiteCard>
          <Text style={styles.titleText}>{'Payment'}</Text>
          <View style={styles.flexRowView}>
            {content}
          </View>
        </WhiteCard>
      </View>
    );
  }

  render() {
    const {products, isLoading, shippingMethods, shippingMethod, isComponentsLoading} = this.state;
    const {user} = this.props;
    const navBar = this.renderNavBar();
    const priceCard = this.renderPriceCard();
    let content = null;

    if (isLoading || isComponentsLoading) {
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
          <ScrollView style={styles.container}>
            {this.renderAddressComponent()}
            {this.renderShippingComponent()}
            {this.renderPaymentComponent()}
            <WhiteCard>
              <FlatList
                ListFooterComponent={priceCard}
                style={styles.flatStyle}
                extraData={this.props}
                keyExtractor={(item) => item.product_id}
                data={products}
                renderItem={({ item, index }) => (
                  <CartListItem
                    item={item}
                    hideAdd
                    onSubtract={this.onSubtract}
                    onAdd={this.onAdd}
                  />
                )}
              />
            </WhiteCard>
            {this.getOptionModalView(SHIPPING_METHOD_MODAL, shippingMethods, shippingMethod, this.onShippingMethodSelected, this.onClose)}
          </ScrollView>
        </View>
      );
    }

    return content;
  }
}

CartCheckoutScreen.propTypes = {
  isLoading: PropTypes.bool,
  productList: PropTypes.any,
  productListError: PropTypes.any
};

CartCheckoutScreen.defaultProps = {
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
    addresses: state.user.addressesData,
  };
};

export default connect(mapStateToProps)(CartCheckoutScreen);
