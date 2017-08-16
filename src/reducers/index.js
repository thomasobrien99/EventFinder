import { combineReducers } from 'redux';

import auth from './authReducer';
import events from './eventsReducer';
import savedEvents from './savedEventsReducer';

export default combineReducers({
  auth,
  events,
  savedEvents
})
