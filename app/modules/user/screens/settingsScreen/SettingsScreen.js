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
import CookieManager from 'react-native-cookies';
import UserActions from '../../actions/UserActions';
import { COOKIE_LANGUAGE, COOKIE_LANGUAGE_CHINESE } from '../../../../Constants';
import LoadingIndicator from '../../../shared/components/loadingIndicator/LoadingIndicator';

const ACTIVE_SCREEN_SETTINGS = 'Settings';
const ACTIVE_SCREEN_LANGUAGE = 'Language';
const ENGLISH = 'English';
const CHINESE = 'Chinese';
const ENGLISH_CODE = 'en';
const CHINESE_CODE = 'zh';


class SettingsScreen extends React.Component<any, any> {
  static defaultProps: any

  constructor(props) {
    super(props);
    const params = props.navigation.state.params;

    let activeScreen = ACTIVE_SCREEN_SETTINGS;
    let activeList = this.getSettingsList();
    if (Object.keys(params).length > 0) {
      activeScreen = params.activeScreen;
      activeList = params.activeList;
    }

    this.state = {
      isLoading: false,
      activeScreen: activeScreen,
      activeList: activeList,
      language: ENGLISH_CODE,
    };

    this.getLanguage();    
  }

  static getDerivedStateFromProps(props, state) {
    return {
      isLoading: props.languageLoading,
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
    language = language && language === COOKIE_LANGUAGE_CHINESE? CHINESE_CODE: ENGLISH_CODE;
    this.setState({
      language: language,
    });
  }

  setLanguage = async (language) => {
    const {activeScreen} = this.state;
    const {languageLoading} = this.props;
    if (activeScreen === ACTIVE_SCREEN_LANGUAGE) {
      AsyncStorage.setItem(COOKIE_LANGUAGE, `language=${language}`);
      this.props.dispatch(UserActions.setLanguage(language))
      Strings.setLanguage(language);
      this.setState({
        language: language,
        isLoading: languageLoading,
      })
    }
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
              name: ENGLISH,
              action: () => this.changeLanguage(ENGLISH_CODE)
            },
            {
              name: CHINESE,
              action: () => this.changeLanguage(CHINESE_CODE)
            }
          ]
        }
      },
      {
        name: 'Change Address',
        nextScreen: ACTIVE_SCREEN_LANGUAGE,
        subList: {
          list: [
            {
              name: 'English',
            },
            {
              name: 'Chinese',
            }
          ]
        }
      },
    ];

    return settingsList;
  }

  handleOnBackPress = () => {
    this.props.navigation.goBack();
  }

  renderLeftAction = () => {
    return (
      <TouchableOpacity onPress={this.handleOnBackPress}>
        <EvilIcons name='chevron-left' color='white' size={50}/>
      </TouchableOpacity>
    )
  }

  renderNavBar = () => {
    return (
      <NavigationBar
        title={Strings.REVIEWS}
        leftAction={this.renderLeftAction()}
      >
      </NavigationBar>
    )
  }

  renderFlatlistItem = ({item}) => {
    const {name, nextScreen, subList, action} = item;
    // console.log(item)
    const onPress = () => {
      // console.log(subList.list)
      if (nextScreen) {
        this.props.navigation.dispatch(navigateToSettings({
          activeScreen: nextScreen,
          activeList: subList.list,
        }))
      } else {
        action();
      }
    }
    return(
      <TouchableOpacity style={styles.listItem} onPress={onPress}>
        <View style={styles.listItemWrapper}>
          <Text style={styles.settingText}>{name}</Text>
          <EvilIcons
            style={styles.rightIcon}
            name='chevron-right' color={Theme.colors.darkGray} size={30}/>
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
          <Text style={styles.settingText}>{english.name}</Text>
          <CheckBox
            containerStyle={styles.checkBox}
            checked={this.state.language === ENGLISH_CODE}
            checkedColor={Theme.colors.smallText}
            onPress={()=> {
              // this.setState({language: ENGLISH_CODE})}
              this.setLanguage(ENGLISH_CODE)
            }}
          />
        </View>
        <View style={styles.listItemWrapper}>
          <Text style={styles.settingText}>{chinese.name}</Text>
          <CheckBox
            containerStyle={styles.checkBox}
            checked={this.state.language === CHINESE_CODE}
            checkedColor={Theme.colors.smallText}
            onPress={()=> {
              // this.setState({language: ENGLISH_CODE})}
              this.setLanguage(CHINESE_CODE);
            }}
          />
        </View>
      </View>
    );
  }

  renderSettingsPage = () => {
    let {activeList} = this.state;
    // console.log(activeList)
    return (
      <View style={styles.container}>
        <FlatList
          data={activeList}
          renderItem={this.renderFlatlistItem}
        />
      </View>
    )
  }

  renderChangeLanguagePage = () => {
    let {activeList} = this.state;
    return (
      <View style={styles.container}>
        {this.renderLanguageSelectionItem(activeList)}
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
      }
    }

    

    return (
      <View style={styles.container}>
        {this.renderNavBar()}
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
  }
};

export default connect(mapStateToProps)(SettingsScreen);
