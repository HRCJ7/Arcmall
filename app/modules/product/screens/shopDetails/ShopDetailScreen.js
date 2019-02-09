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
  navigateToSettings
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

class ShopDetailScreen extends React.Component<any, any> {
  static defaultProps: any;

  constructor(props) {
  
    super(props);
    const {seller} = this.props.navigation.state.params;
    this.state = {
      seller:seller,
      clicked: "products",
      isLoading: null,
      userInfo: null
    };

    props.navigation.setParams({
      loadProfile: true
    });
    // this.getUserInfo();
  }

  componentDidMount() {}

  static getDerivedStateFromProps(props, state) {
    //Return state object, retun null to update nothing;
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate() {}

  // getUserInfo = async () => {
  //   const userInfo = await getUser();
  //   this.setState({
  //     userInfo: userInfo,
  //   })

  // }

  handleNavigatePress = async () => {
    this.props.dispatch(LoginActions.signOut());
    this.props.navigation.navigate(MAIN_TAB_HOME);
  };

  handleProductButtonPress = () => {
    this.setState({
      clicked: "products"
    });
  };
  handleReviewButtonPress = () => {
    this.setState({
      clicked: "review"
    });
  };

  handleSettingPress = () => {
    this.props.navigation.dispatch(navigateToSettings());
  };

  renderRightAction = () => {
    return (
      <TouchableOpacity onPress={this.handleSettingPress}>
        <EvilIcons name="gear" color="white" size={30} />
      </TouchableOpacity>
    );
  };

  renderNavBar = () => {
    return (
      <NavigationBar
        title={Strings.SHOP}
        leftAction={null}
        rightAction={this.renderRightAction()}
      />
    );
  };

  render() {
    let content = null;
    // const {userInfo} = this.state;
    const navBar = this.renderNavBar();
    const product = [{ thumb: "", name: "item1", price: 400, quantity: 2 }];

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
         <Text style={styles.shopName}>{`${this.state.seller.firstname} ${this.state.seller.lastname}`}</Text>  
        </ImageBackground>
        {/* <View style={styles.itemInfo}>
            <TouchableOpacity style={styles.listItem} onPress={this.handleProductButtonPress}>
              <View style={styles.listItemWrapper}>
                <Text style={styles.settingText}>{Strings.STORE_PRODUCTS}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem} onPress={this.handleReviewButtonPress}>
              <View style={styles.listItemWrapper}>
                <Text style={styles.settingText}>{Strings.REVIEWS}</Text>
              </View>
            </TouchableOpacity>
       
          </View> */}

        {this.state.clicked == "products" ? (
          <FlatList
            style={styles.flatStyle}
            extraData={this.props}
            keyExtractor={item => item.product_id}
            data={product}
            renderItem={({ item, index }) => (
              <ShopListItem
                item={item}
                onDelete={this.onDelete}
                // onPress={this.handleProductOnPress(item, index)}
              />
            )}
          />
        ) : (
          <Text>False</Text>
        )}
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
