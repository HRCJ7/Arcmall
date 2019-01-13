// @flow
import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';
import type {
  Saga,
} from 'redux-saga';

// import LoginService from '@spotme-external-services/LoginService';
// import SettingsService from '@spotme-external-services/SettingsService';
// import {
//   sessionActions,
// } from '../../../storage/realm';
// import SharedActions from '@spotme-shared/actions/SharedActions';
// import Actions from '../actions/LoginActions';
import {
  GET_LOGIN_VERIFICATION,
  PLAYER_REGISTRATION,
} from '../actions/Types';

export default () => {
  function* getLoginVerification(action) {
    try {
    //   const response = yield call(LoginService.getLoginVerification, action.payload.email, action.payload.password);
    //   const session = yield call(sessionActions.setSession, response);
    //   const {userId} = session;

    //   try {
    //     const response = yield call(SettingsService.getSettingsByUserId, userId);
    //     yield put(Actions.getLoginVerificationSuccess(session));
    //     yield put(SharedActions.getSettingsByUserIdSuccess(response));
    //   } catch (err) {
    //     yield put(SharedActions.getSettingsByUserIdFailure(err));
    //   }
    } catch (error) {
      // yield put(Actions.getLoginVerificationFailure(error.response));
    }
  }

  function* watchGetLoginVerification(): Saga<void> {
    yield takeLatest(GET_LOGIN_VERIFICATION, getLoginVerification);
  }

  return {
    watchGetLoginVerification,
  };
};
