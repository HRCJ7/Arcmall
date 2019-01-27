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

// const products = [
//   { _id: 1, name: "Item 1", price: 50, quantity: 0,toggle: false, },
//   { _id: 2, name: "Item 2", price: 29, quantity: 0,toggle: false, },
//   { _id: 3, name: "Item 3", price: 200, quantity: 0,toggle: false, }
// ];
class CartDetailsScreen extends React.Component<any, any> {
  static defaultProps: any;

  constructor(props) {
    super(props);
    console.log(props);
    const params = props.navigation.state.params;
    this.state = {
      products :[]
    };
  }

  componentDidMount() {}

  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    return state;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate() {
    this.getCartList();
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

  onSubtract = (item, index) => {
    const products = [...this.state.products];
    products[index].quantity -= 1;
    this.setState({ products });
  };

  onAdd = (item, index) => {
    const products = [...this.state.products];
    products[index].quantity += 1;
    this.setState({ products });
  };

  getCartList = async () => {
    let cartList = await AsyncStorage.getItem(STORAGE_CART_LIST);
    if (!cartList) {
      this.setState({
        products: [],
      })
    } else {
      this.setState({
        products: JSON.parse(cartList),
      })
    }
  }

  render() {
    const { products } = this.state;
    let totalQuantity = 0;
    let totalPrice = 0;
    const navBar = this.renderNavBar();
    products.forEach(item => {
      totalQuantity += item.quantity;
      totalPrice += item.quantity * item.price;
    });
    return (
      <View style={styles.container}>
        {navBar}
        <FlatList
          style={styles.flatStyle}
          keyExtractor={item => item._id}
          data={products}
          renderItem={({ item, index }) => (
            <CartListItem
              item={item}
              onSubtract={() => this.onSubtract(item, index)}
              onAdd={() => this.onAdd(item, index)}
              onPress={this.handleProductOnPress(item, index)}
            />
          )}
        />

        <View style={styles.itemInfoContainer}>
          <View style={styles.bottomRowAction}>
            <Text style={styles.textBold}>Sub total:</Text>
            <Text style={styles.textNormal}>{totalPrice}</Text>
          </View>
          <View style={styles.bottomRowAction}>
            <Text style={styles.textBold}>Shipping cost:</Text>
            <Text style={styles.textNormal}>$500</Text>
          </View>
          <View style={styles.bottomRowAction}>
            <Text style={styles.textBold}>Tax:</Text>
            <Text style={styles.textNormal}>$500</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.bottomTotalAction}>
            <Text style={styles.textBold}>Grand Total:</Text>
            <Text style={styles.textNormal}>$1500</Text>
          </View>
          <ArcmallButton
            // onPress={this.handleLoginPress}
            title={Strings.CHECKOUT}
            style={{ marginTop: 20, width: "80%" }}
          />
        </View>
      </View>
    );
    // const {isLoading, productList, productListError, navigation: {state: {params: {loadingCategories}}}} = this.props;
    // console.log(productList)
    // let content = null;
    // const navBar = loadingCategories? null: this.renderNavBar();
    // if (isLoading) {
    //   content = (
    //     <View style={styles.container}>
    //       {navBar}
    //       <LoadingIndicator />
    //     </View>
    //   )
    // } else if (!productListError){
    //   content = (
    //     <View style={styles.container}>
    //       {navBar}
    //       <FlatList
    //         keyExtractor={(item, index) => `${item.description}${index}`}
    //         data={productList}
    //         renderItem={this.renderListItem}
    //       />
    //     </View>
    //   );
    // } else {
    //   Toast.show(Strings.SOMETHING_WENT_WRONG);
    // }
    // return (
    //   content
    // );
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
  // let navigation = ownProps.navigation;
  // const fromCategories = navigation.state.params.category_id;

  // //Change navigation object for tab bar.
  // if (fromCategories) {
  //   navigation = ownProps.navigation.state.params.navigation;
  //   navigation.state.params = {...navigation.state.params, ...ownProps.navigation.state.params};
  // }

  // const categoryId = navigation.state.params.category_id;
  // const products = state.product.productList;

  // let productList;
  // if (categoryId && products[categoryId]) {
  //   productList = state.product.productList[categoryId].products;
  // } else {
  //   productList = state.product.productList.products;
  // }
  return {
    // productList: productList,
    // isLoading: state.product.productListLoading,
    // productListError: state.product.productListError,
    // navigation: navigation,
  };
};

export default connect(mapStateToProps)(CartDetailsScreen);
