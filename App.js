/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './app/store/ConfigureStore';
// import LoginScreen from './app/modules/login/screens/LoginScreen';
import RootNavigation from './app/navigation/RootNavigation';
import { COOKIE_LANGUAGE, COOKIE_LANGUAGE_CHINESE, CODE_ENGLISH, CODE_CHINESE } from './app/Constants';
import Strings from './app/modules/shared/localization/localization';

reactotronStoreAction = require('./config/reactotron/reactotron.config').default;
const store = configureStore(reactotronStoreAction);

type Props = {};

export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      language: null,
    }
    AsyncStorage.getItem(COOKIE_LANGUAGE).then((lang)=> {
      const language = lang === COOKIE_LANGUAGE_CHINESE? CODE_CHINESE: CODE_ENGLISH;
      Strings.setLanguage(language);
      this.setState({
        language: lang,
      })
    });
  }
  render() {
    let content = null;
    const {language} = this.state;

    if (language) {
      content = (
        <Provider store={store}>
          <RootNavigation />
        </Provider>
      );
    }

    return content;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
