import {
  FB_LOGIN_FAIL,
  FB_LOGIN_SUCCESS
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FB_LOGIN_SUCCESS:
      return { token: action.payload };
    case FB_LOGIN_FAIL:
      return { token: null };
    default:
      return state;
  };
}
