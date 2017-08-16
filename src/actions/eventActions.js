import axios from 'axios';
import { parseString } from 'react-native-xml2js'

import {
  GET_EVENTS,
  SAVE_EVENT,
  CLEAR_EVENTS
} from './types';

export const getEvents = ({latitude, longitude}, callback) => async dispatch => {
  let { data } = await axios.get(`http://api.eventful.com/rest/events/search?app_key=mXqWpmWFXXTJ28rz&where=${latitude},${longitude}&within=25`);
  parseString(data, (error, result) => {
    dispatch({ type: GET_EVENTS, payload: result.search.events[0].event });
    callback();
  });
}

export const saveEvent = event => {
  return {
    payload: event,
    type: SAVE_EVENT
  }
};

export const clearEvents = () => {
  return { type: CLEAR_EVENTS };
};
