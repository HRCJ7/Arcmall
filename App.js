import LandingScreen from "./pages/LandingScreen";
import LoginScreen from "./pages/LoginScreen";
import { Provider } from "react-redux";
import store from "./redux/index";
import { Navigation } from "react-native-navigation";

Navigation.registerComponent(
  "arcmall.LoginScreen",
  () => LoginScreen,
  store,
  Provider
);
Navigation.registerComponent(
  "arcmall.LandingScreen",
  () => LandingScreen,
  store,
  Provider
);

Navigation.startSingleScreenApp({
  screen: {
    screen: "arcmall.LandingScreen",
    navigatorStyle: {
      navBarHidden: true
    }
  },
  overrideBackPress: true,
  appStyle: {
    keepStyleAcrossPush: false
  },
  portraitOnlyMode: true,
  passProps: { login: true }
});
