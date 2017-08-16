import { uniqBy } from 'lodash'
import {
  SAVE_EVENT,
  CLEAR_EVENTS
} from '../actions/types';

export default function(state  = [], action) {
  switch (action.type) {
    case SAVE_EVENT:
      return uniqBy([action.payload, ...state], event => event.$.id);
    case CLEAR_EVENTS:
      return [];
    default:
      return state;
  }
}
