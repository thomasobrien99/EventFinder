import {
  GET_EVENTS,
} from '../actions/types';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_EVENTS:
      return action.payload;
    default:
      return state;
  };
}
