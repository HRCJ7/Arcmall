// @flow
import Reactotron, {trackGlobalErrors} from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

Reactotron
  .configure({}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(trackGlobalErrors()) // Track all global errors
  .use(reactotronRedux()) // Redux
  .connect(); // let's connect!

/**
 * Export the reactotron createstore function
 */
export default Reactotron.createStore;
