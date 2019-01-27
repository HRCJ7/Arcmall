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
import { navigateToItemDetails } from "../../../../navigation/RootNavActions";
import ArcmallButton from "../../../shared/components/arcmallButton/ArcmallButton";
import CartActions from "../../actions/CartActions";
import Toast from "react-native-simple-toast";
import ProductActions from "../../../product/actions/ProductActions";

// const products = [
//   { _id: 1, name: "Item 1", price: 50, quantity: 0,toggle: false, },
//   { _id: 2, name: "Item 2", price: 29, quantity: 0,toggle: false, },
//   { _id: 3, name: "Item 3", price: 200, quantity: 0,toggle: false, }
// ];

const getValueFromCurrency = (currency) => {
  return Number(currency.replace(/[^0-9.-]+/g,''));
}

class CartDetailsScreen extends React.Component<any, any> {
  static defaultProps: any;

  constructor(props) {
    super(props);
    console.log(props);
    const params = props.navigation.state.params;
    this.state = {
      isLoading: true,
      products: [],
      subTotal: 0,
      total: 0,
      tax: 0,
      shipping: 0
    };

    this.props.dispatch(ProductActions.getCart());

  }

  componentDidMount() {}

  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    const {cartData} = props;
    console.log(props.cartLoading);
    return {
      products: cartData? cartData.products: [],
      isLoading: props.isLoading,
      subTotal: cartData && cartData.totals? cartData.totals[0].text: 0,
      total: cartData && cartData.totals? cartData.totals[1].text: 0,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate() {
    // this.getCartList();
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

  // renderListItem = (item, index) => {
  //   return <CartListItem item={item}
  //   onSubtract={() => this.onSubtract(item, index)}
  //   onAdd={() => this.onAdd(item, index)} onPress={this.handleProductOnPress} />;
  // };

  onSubtract = (item) => {
    if (item.quantity > 1) {
      let quantity = item.quantity - 1;
      this.props.dispatch(ProductActions.editCart({key: item.cart_id, quantity: quantity}));
    }
  };

  onAdd = (item) => {
    this.props.dispatch(ProductActions.editCart({key: item.cart_id, quantity: 1 + item.quantity}));
  };

  onDelete = (item) => {
    this.props.dispatch(ProductActions.removeFromCart({key: item.cart_id}));
  }

  // getCartList = async () => {
  //   let cartList = await AsyncStorage.getItem(STORAGE_CART_LIST);
  //   if (!cartList) {
  //     this.setState({
  //       products: [],
  //     })
  //   } else {
  //     this.setState({
  //       products: JSON.parse(cartList),
  //     })
  //   }
  // }

  renderPriceCard = () => {
    const {total, subTotal, tax, shipping} = this.state;
    let content = null;
    content = (
      <View style={styles.itemInfoContainer}>
        <View style={styles.bottomRowAction}>
          <Text style={styles.textBold}>Sub total:</Text>
          <Text style={styles.textNormal}>{subTotal}</Text>
        </View>
        <View style={styles.bottomRowAction}>
          <Text style={styles.textBold}>Shipping cost:</Text>
          <Text style={styles.textNormal}>{shipping}</Text>
        </View>
        <View style={styles.bottomRowAction}>
          <Text style={styles.textBold}>Tax:</Text>
          <Text style={styles.textNormal}>{tax}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.bottomTotalAction}>
          <Text style={styles.textBold}>Grand Total:</Text>
          <Text style={styles.textNormal}>{total}</Text>
        </View>
        <ArcmallButton
          title={Strings.CHECKOUT}
          style={{ marginTop: 20, width: "80%" }}
        />
      </View>
    )

    return content;
  }

  render() {
    const {products, isLoading} = this.state;
    const navBar = this.renderNavBar();
    const priceCard = this.renderPriceCard();
    let content = null;
    console.log('rendered')

    if (isLoading) {
      content = (
        <View style={styles.container}>
          {navBar}
          <LoadingIndicator />
        </View>
      )
    } else {
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
  console.log(state.product.cartLoading)
  return {
    cartData: state.product.cartData,
    isLoading: state.product.cartLoading,
    cartError: state.product.cartError,
  };
};

export default connect(mapStateToProps)(CartDetailsScreen);
