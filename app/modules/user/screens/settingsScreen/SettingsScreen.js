// @flow
import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Button,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from './SettingsScreen.styles';
import LoginActions from '../../../login/actions/LoginActions';
import NavigationBar from '../../../shared/components/NavigationBar/NavigationBar';
import Strings from '../../../shared/localization/localization';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import {navigateToSettings} from '../../../../navigation/RootNavActions';
import Theme from '../../../../theme/Base';
import {CheckBox} from 'react-native-elements'
import UserActions from '../../actions/UserActions';
import { COOKIE_LANGUAGE, COOKIE_LANGUAGE_CHINESE, CODE_ENGLISH, CODE_CHINESE } from '../../../../Constants';
import LoadingIndicator from '../../../shared/components/loadingIndicator/LoadingIndicator';
import t from 'tcomb-form-native';
import Config from 'react-native-config';
import {getForm, defaultRequestHeaders, getCookie} from '../../../../services/RestService';
import ArcmallButton from '../../../shared/components/arcmallButton/ArcmallButton';
import { getUser } from '../../../../store/AsyncStorageHelper';
import { MAIN_TAB_HOME } from '../../../../navigation/mainTab/MainTabRoutes';
import { ROOT_NAV_CHANGE_PASSWORD } from '../../../../navigation/RootRoutes';
import ChangePasswordScreen from '../changePassword/ChangePasswordScreen';
import ProductActions from '../../../product/actions/ProductActions';
import { setLanguage } from './settingApis';

const BASE_URL: string = `${Config.API_URL}`;

const ACTIVE_SCREEN_SETTINGS = 'Settings';
const ACTIVE_SCREEN_LANGUAGE = 'Language';
const ACTIVE_SCREEN_SHIPPING = 'Shipping';
const ACTIVE_SCREEN_CHANGE_PASSWORD = 'ChangePassword';
const ACTIVE_SCREEN_SHIPPING_ADD = 'ShippingAdd';

class SettingsScreen extends React.Component<any, any> {
  static defaultProps: any

  constructor(props) {
    super(props);
    const params = props.navigation.state.params;

    let activeScreen = ACTIVE_SCREEN_SETTINGS;
    let activeList = this.getSettingsList();
    if (params && Object.keys(params).length > 0) {
      activeScreen = params.activeScreen;
      activeList = params.activeList;
    }

    this.state = {
      isLoading: false,
      showAddAdressOverlay: false,
      activeScreen: activeScreen,
      activeList: activeList,
      language: CODE_ENGLISH,
      countryZones: null,
      countries: null,
      addressFormValues: {},
    };

    if (activeScreen === ACTIVE_SCREEN_SHIPPING) {
      this.props.dispatch(UserActions.getAddresses())
    } else if (activeScreen === ACTIVE_SCREEN_LANGUAGE) {
      this.getLanguage();
    }
  }

  static getDerivedStateFromProps(props, state) {
    const {countries: origCountries} = props;
    let countries = null;
    if (origCountries) {
      countries = {};
      for (const country of origCountries) {
        countries[country.country_id] = country.name;
      }
    }
    
    return {
      // isLoading: props.languageLoading,
      countries: countries,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate() {
    
  }

  componentWillUnmount() {
  }

  getLanguage = async () => {
    let language = await AsyncStorage.getItem(COOKIE_LANGUAGE);
    console.log(language)
    language = language && language === COOKIE_LANGUAGE_CHINESE? CODE_CHINESE: CODE_ENGLISH;
    this.setState({
      language: language,
    });
  }

  setLanguage = async (language) => {
    const {activeScreen} = this.state;
    const {languageLoading} = this.props;
    await AsyncStorage.setItem(COOKIE_LANGUAGE, `language=${language}`);
    this.props.dispatch(UserActions.setLanguage(language))
    try {
      await setLanguage(language)
    } catch(err) {

    }
    
    this.props.dispatch(ProductActions.getCategoryList())
    Strings.setLanguage(language);
    this.setState({
      language: language,
    })
  }

  changeActiveScreen(screen) {
   this.setState({
     activeScreen: screen,
   })
  }

  getSettingsList = () => {
    const settingsList = [
      {
        name: 'Change Language',
        nextScreen: ACTIVE_SCREEN_LANGUAGE,
        subList: {
          list: [
            {
              name: Strings.ENG_US,
            },
            {
              name: Strings.CHINESE_SIMPLIFIED,
            }
          ]
        }
      },
      {
        name: 'Change Password',
        nextScreen: ACTIVE_SCREEN_CHANGE_PASSWORD,
        subList:{},
      },
      {
        name: 'Shipping Details',
        nextScreen: ACTIVE_SCREEN_SHIPPING,
        subList: {
          name: 'Add Shipping',
          nextScreen: ACTIVE_SCREEN_SHIPPING_ADD,
        }
      },
      {
        name: 'Log out',
        action: this.handleLogout,
        hideArrow: true,
      },
    ];

    return settingsList;
  }

  handleOnBackPress = () => {
    this.props.navigation.goBack();
  }

  handleOnAddAddressPress = () => {
    this.props.navigation.dispatch(navigateToSettings({
      activeScreen: ACTIVE_SCREEN_SHIPPING_ADD,
      activeList: null,
    }))
  }

  handleOnAddShipingPressed = () => {
    const {addressFormValues} = this.state;

  }

  handleLogout = () => {
    this.props.dispatch(LoginActions.signOut());
    this.props.navigation.navigate(MAIN_TAB_HOME);
  }

  renderLeftAction = () => {
    return (
      <TouchableOpacity onPress={this.handleOnBackPress}>
        <EvilIcons name='chevron-left' color='white' size={50}/>
      </TouchableOpacity>
    )
  }

  renderRightAction = () => {
    return (
      <TouchableOpacity onPress={this.handleOnAddAddressPress}>
        <Text style={styles.addText}>{Strings.ADD}</Text>
      </TouchableOpacity>
    )
  }

  renderNavBar = (right = null) => {
    return (
      <NavigationBar
        title={Strings.SETTINGS}
        leftAction={this.renderLeftAction()}
        rightAction={right}
      >
      </NavigationBar>
    )
  }

  renderFlatlistItem = ({item}) => {
    const {name, nextScreen, subList, action, hideArrow} = item;
    const onPress = () => {
      if (nextScreen) {
        this.props.navigation.dispatch(navigateToSettings({
          activeScreen: nextScreen,
          activeList: subList.list,
        }))
      } else {
        action();
      }
    }
    let arrow = null;
    if (!hideArrow) {
      arrow = (
        <EvilIcons
          style={styles.rightIcon}
          name='chevron-right' color={Theme.colors.darkGray} size={30}/>
      )
    }
    return(
      <TouchableOpacity style={styles.listItem} onPress={onPress}>
        <View style={styles.listItemWrapper}>
          <Text style={styles.settingText}>{name}</Text>
          {arrow}
        </View>
      </TouchableOpacity>
    )
  }

  renderLanguageSelectionItem = (languages) => {
    let english = languages[0];
    let chinese = languages[1];
    return (
      <View style={{flex: 1}}>
        <View style={styles.listItemWrapper}>
          <Text style={styles.settingText}>{Strings.ENG_US}</Text>
          <CheckBox
            containerStyle={styles.checkBox}
            checked={this.state.language === CODE_ENGLISH}
            checkedColor={Theme.colors.smallText}
            onPress={()=> {
              this.setLanguage(CODE_ENGLISH)
            }}
          />
        </View>
        <View style={styles.listItemWrapper}>
          <Text style={styles.settingText}>{Strings.CHINESE_SIMPLIFIED}</Text>
          <CheckBox
            containerStyle={styles.checkBox}
            checked={this.state.language === CODE_CHINESE}
            checkedColor={Theme.colors.smallText}
            onPress={()=> {
              this.setLanguage(CODE_CHINESE);
            }}
          />
        </View>
      </View>
    );
  }

  renderSettingsPage = () => {
    let {activeList} = this.state;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <FlatList
          data={activeList}
          keyExtractor={(item) => item.name}
          renderItem={this.renderFlatlistItem}
        />
      </View>
    )
  }

  renderChangeLanguagePage = () => {
    let {activeList} = this.state;
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderLanguageSelectionItem(activeList)}
      </View>
    )
  }

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
    const {addresses} = this.props;
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

  onChange = async (value) => {
    let zones = this.state.countryZones;
    if (value.country_id != this.state.addressFormValues.country_id) {
      let response = await fetch(`${BASE_URL}/address/getZones`, {
        method: 'POST',
        headers: {
          ...defaultRequestHeaders,
        },
        body: getForm({country_id: value.country_id})
      });

      const {zones: oriZones} = await response.json();
  
      if (oriZones) {
        zones = {};
        for (const zone of oriZones) {
          zones[zone.zone_id] = zone.name;
        }
      }
    }
    
    this.setState({
      addressFormValues: value,
      countryZones: zones,
    })
  }

  onAddressFormSubmit = async () => {
    let cookies = await getCookie()
    let user = await getUser();
    let data =  {...this.state.addressFormValues};
    data.firstname = user.firstname;
    data.lastname = user.lastname;
    let response = await fetch(`${BASE_URL}/address/save`, {
      method: 'POST',
      headers: {
        ...defaultRequestHeaders,
        // cookie: cookies,
      },
      body: getForm(data)
    });
    if (response.status === 406) {
      this.props.dispatch(LoginActions.signOut());
    } else {
      const parsedJson = await response.json();
      if('error' in parsedJson) {
      } else {
        this.props.dispatch(UserActions.getAddresses())
        this.props.navigation.goBack();
      }
    }
  }

  renderShippingAddContent = () => {
    let content = null;
    let {countries} = this.state;
    var Form = t.form.Form;

    if (countries) {
      const stateZones = this.state.countryZones;
      let Zones = t.enums(stateZones? stateZones: {});
      let Countries = t.enums(countries);
      // here we are: define your domain model
      let Address = t.struct({
        address_1: t.String, 
        address_2: t.String,
        city: t.String,
        postcode: t.maybe(t.String),
        country_id: Countries,
        zone_id: Zones,
      });

      let options = {
        fields: {
          address_1: {
            label: 'Address line 1'
          },
          address_2: {
            label: 'Address line 2'
          },
          country_id: {
            label: 'Country'
          },
          zone_id: {
            label: 'Zone'
          },
        }
      };

      content = (
        <View style={styles.container}>
          {this.renderNavBar()}
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss} 
            accessible={false}
            style={styles.container}>
            <ScrollView style={styles.formStyle}>
              <Form
                ref="form"
                type={Address}
                value={this.state.addressFormValues}
                onChange={this.onChange}
                options={options}
              />
              <ArcmallButton 
                title={'Save'}
                onPress={this.onAddressFormSubmit}
              />
            </ScrollView>
          </TouchableWithoutFeedback>
        </View>
      )
    }

    return content;
  }

  renderChangePasswordContent = () => {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ChangePasswordScreen />
      </View>
    )
  }

  render() {
    let content = null;
    const {activeScreen, isLoading} = this.state;
    if (isLoading) {
      content = (
        <LoadingIndicator />
      )
    } else {
      switch (activeScreen) {
        case ACTIVE_SCREEN_SETTINGS: {
          content = this.renderSettingsPage();
          break;
        }
        case ACTIVE_SCREEN_LANGUAGE: {
          content = this.renderChangeLanguagePage();
          break;
        }
        case ACTIVE_SCREEN_SHIPPING: {
          content = this.renderShippingContent();
          break;
        }
        case ACTIVE_SCREEN_SHIPPING_ADD: {
          content = this.renderShippingAddContent();
          break;
        }
        case ACTIVE_SCREEN_CHANGE_PASSWORD: {
          content = this.renderChangePasswordContent()
        }
      }
    }

  
    return (
      <View style={styles.container}>
        {content}
      </View>
    );
  }
}

SettingsScreen.propTypes = {
  activeScreen: PropTypes.string,
};

SettingsScreen.defaultProps = {
  activeScreen: ACTIVE_SCREEN_SETTINGS,
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    languageLoading: state.user.languageLoading,
    addresses: state.user.addressesData,
    countries: state.user.countries,
  }
};

export default connect(mapStateToProps)(SettingsScreen);
