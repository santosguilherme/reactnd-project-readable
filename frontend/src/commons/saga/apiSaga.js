import {call, put} from 'redux-saga/effects';



const defaultSettings = {
  hideGlobalMessage: false,
  multiple: false,
  persist: false
};

export default function* apiSaga(fn, parameter, success, failure, settings = defaultSettings) {
  const config = {...defaultSettings, ...settings};
  const {scope, persist, multiple, hideGlobalMessage} = config;

  try {
    //yield put(remoteDataActions.start(scope));

    const response = yield call(fn, parameter);
    const data = response ? response.data : {};

    //yield put(remoteDataActions.complete(scope, data));

    if (success) {
      yield (multiple ? call(success, data) : put(success(data)));
    }

    if (persist) {
      localStorage.set(scope, data);
    }
  } catch (error) {
    //yield put(remoteDataActions.failure(scope, error));

    if (!hideGlobalMessage) {
      //yield put(notificationActions.showNotificationMessage(error));
    }

    if (failure) {
      yield (multiple ? call(failure, error) : put(failure(error)));
    }
  }
}