// @flow
import {
  ROOT_NAV_MAIN_TAB,
  ROOT_NAV_ITEM_LIST,
  ROOT_NAV_ITEM_DETAILS,
  ROOT_NAV_SELECT_ROLE,
  ROOT_NAV_SIGN_UP_AS_A_BUYER,
  ROOT_NAV_SIGN_UP_AS_A_SELLER,
  ROOT_NAV_LOGIN,
  ROOT_NAV_ALL_CATEGORIES,
  ROOT_NAV_YOUR_CART,
  ROOT_NAV_REVIEWS,
  ROOT_NAV_SETTINGS,
  ROOT_NAV_CHANGE_PASSWORD,
  ROOT_NAV_ACCOUNT_SETTINGS,
  ROOT_NAV_OPTIONS,
  ROOT_NAV_ADD_ITEM,
  ROOT_NAV_PRODUCT_LIST
} from './RootRoutes';
import {AppContainer} from './RootNavigation';

export const navigateToMainTabScreen = (navParams: any) => {
  return AppContainer
  .router
  .getActionForPathAndParams(`/${ROOT_NAV_MAIN_TAB}`, navParams);
};

export const navigateToItemListScreen = (navParams: any) => {
  return AppContainer
  .router
  .getActionForPathAndParams(`/${ROOT_NAV_ITEM_LIST}`, navParams);
};

export const navigateToChangePasswordtScreen = (navParams: any) => {
  return AppContainer
  .router
  .getActionForPathAndParams(`/${ROOT_NAV_CHANGE_PASSWORD}`, navParams);
};
export const navigateToAccountSettingScreen = (navParams: any) => {
  return AppContainer
  .router
  .getActionForPathAndParams(`/${ROOT_NAV_ACCOUNT_SETTINGS}`, navParams);
};

export const navigateToItemDetails = (navParams: any) => {
  return AppContainer
  .router
  .getActionForPathAndParams(`/${ROOT_NAV_ITEM_DETAILS}`, navParams);
};

export const navigateToLoginScreen = (navParams: any) => {
  return AppContainer
  .router
  .getActionForPathAndParams(`/${ROOT_NAV_LOGIN}`, navParams);
};

export const navigateToSelectRoleScreen = (navParams: any) => {
  return AppContainer
  .router
  .getActionForPathAndParams(`/${ROOT_NAV_SELECT_ROLE}`, navParams);
};

export const navigateToSignInBuyerScreen = (navParams: any) => {
  return AppContainer
  .router
  .getActionForPathAndParams(`/${ROOT_NAV_SIGN_UP_AS_A_BUYER}`, navParams);
};

export const navigateToSignInSellerScreen = (navParams: any) => {
  return AppContainer
  .router
  .getActionForPathAndParams(`/${ROOT_NAV_SIGN_UP_AS_A_SELLER}`, navParams);
};

export const navigateToAllCategories = (navParams: any) => {
  return AppContainer
  .router
  .getActionForPathAndParams(`/${ROOT_NAV_ALL_CATEGORIES}`, navParams);
};


export const navigateToYourCart = (navParams: any) => {
  return AppContainer
  .router
  .getActionForPathAndParams(`/${ROOT_NAV_YOUR_CART}`, navParams);
};

export const navigateToReviews = (navParams: any) => {
  return AppContainer
  .router
  .getActionForPathAndParams(`/${ROOT_NAV_REVIEWS}`, navParams);
};

export const navigateToSettings = (navParams: any) => {
  let route = `/${ROOT_NAV_SETTINGS}`;
  if (navParams && navParams.activeScreen) {
    route = `/${ROOT_NAV_SETTINGS}${navParams.activeScreen}`;
  }
  return AppContainer
  .router
  .getActionForPathAndParams(route, navParams);
};

export const navigateToOptions = (navParams: any) => {
  let route = null;
  if (navParams && navParams.level) {
    route = `/${ROOT_NAV_OPTIONS}${navParams.level}`;
  }

  return AppContainer
  .router
  .getActionForPathAndParams(route, navParams);
};

export const navigateToAddItem = (navParams: any) => {
  return AppContainer
  .router
  .getActionForPathAndParams(`/${ROOT_NAV_ADD_ITEM}`, navParams);
};

export const navigateToProductList = (navParams: any) => {
  return AppContainer
  .router
  .getActionForPathAndParams(`/${ROOT_NAV_PRODUCT_LIST}`, navParams);
};


