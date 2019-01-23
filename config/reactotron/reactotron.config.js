// @flow
import Reactotron, {trackGlobalErrors, asyncStorage} from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

Reactotron
  .configure({}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(trackGlobalErrors()) // Track all global errors
  .use(reactotronRedux()) // Redux
  .use(asyncStorage()) //Async Storage
  .connect(); // let's connect!

/**
 * Export the reactotron createstore function
 */
export default Reactotron.createStore;
