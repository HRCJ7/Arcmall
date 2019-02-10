// @flow
import React from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./OrderHistoryScreen.styles";
import NavigationBar from "../../../shared/components/NavigationBar/NavigationBar";
import Strings from "../../../shared/localization/localization";
import EvilIcons from "react-native-vector-icons/dist/EvilIcons";
import LoadingIndicator from "../../../shared/components/loadingIndicator/LoadingIndicator";
import { navigateToItemDetails, navigateToProductList } from "../../../../navigation/RootNavActions";
import ArcmallButton from "../../../shared/components/arcmallButton/ArcmallButton";
import { getForm, defaultRequestHeaders, getCookie } from "../../../../services/RestService";
import Config from 'react-native-config';
import {Picker, Header, Icon} from "native-base";
import OrderHistoryListItem from "../../components/orderHistoryListItem/OrderHistoryListItem";
import CartActions from "../../../cart/actions/CartActions";
import { getOrdersByStatus } from "./OrderHistoryApis";

const BASE_URL: string = `${Config.API_URL}`;

const getValueFromCurrency = (currency) => {
  return Number(currency.replace(/[^0-9.-]+/g,''));
}

class OrderHistoryScreen extends React.Component<any, any> {
  static defaultProps: any;

  static navigationOptions: any = ({navigation}) => ({
    title: Strings.ORDER_HISTORY,
  });

  constructor(props) {
    super(props);
    const params = props.navigation.state.params;
    console.log(params)
    this.state = {
      isLoading: true,
      products: null,
      isLoggedIn: props.user,
      orders: [],
      status: params.status,
    };

    this.getOrders(params.status);

  }

  componentDidMount() {}

  static getDerivedStateFromProps(props, state) {
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  componentDidUpdate() {
  }

  getOrders = async (status) => {
    const response = await getOrdersByStatus(status);
    this.setState({
      orders: response.orders? response.orders: [],
      isLoading: false,
    })
  }

  handleProductOnPress = (order_id) => {
    this.props.navigation.dispatch(navigateToProductList({fromHome: false, orderId: order_id}))
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
    return <NavigationBar
      leftAction={this.renderLeftAction()}
      title={Strings.ORDER_HISTORY} 
    />;
  };

  // renderListItem = (item, index) => {
  //   return <CartListItem item={item}
  //   onSubtract={() => this.onSubtract(item, index)}
  //   onAdd={() => this.onAdd(item, index)} onPress={this.handleProductOnPress} />;
  // };


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

  render() {
    const {orders, isLoading} = this.state;
    const {user} = this.props;
    const navBar = this.renderNavBar();
    let content = null;
    if (isLoading) {
      content = (
        <View style={styles.container}>
          {navBar}
          <LoadingIndicator />
        </View>
      )
    }
    else {
      content = (
        <View style={styles.container}>
          {navBar}
          <FlatList
            style={styles.flatStyle}
            extraData={this.state}
            keyExtractor={item => item.product_id}
            data={this.state.orders}
            renderItem={({ item, index }) => (
              <OrderHistoryListItem
                onItemPress={this.handleProductOnPress}
                item={item}
              />
            )}
          />
        </View>
      );
    }

    return content;
  }
}

OrderHistoryScreen.propTypes = {
  isLoading: PropTypes.bool,
  productList: PropTypes.any,
  productListError: PropTypes.any
};

OrderHistoryScreen.defaultProps = {
  isLoading: true,
  productList: null,
  productListError: null
};

const mapStateToProps = (state, ownProps) => {
  return {
    // cartData: state.cart.cartData,
    // isLoading: state.cart.cartLoading,
    // cartError: state.cart.cartError,
    // user: state.login.user,
  };
};

export default connect(mapStateToProps)(OrderHistoryScreen);
