import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
  FB_LOGIN_FAIL,
  FB_LOGIN_SUCCESS
} from './types';

// AsyncStorage.setItem('fbToken', token);
// AsyncStorage.getItem('fbToken');

export const fbLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb-token');
  if (token) {
    dispatch({ type: FB_LOGIN_SUCCESS, payload: token });
  } else {
    loginToFacebook(dispatch);
  }
}

const loginToFacebook = async dispatch => {
  let { token, type } = await Facebook.logInWithReadPermissionsAsync('110116256367017', {
    permissions: ['public_profile']
  });

  if (type === 'cancel') return dispatch({ type: FB_LOGIN_FAIL });

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FB_LOGIN_SUCCESS, payload: token })
}
