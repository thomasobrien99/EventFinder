import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './src/store';
import AuthScreen from './src/screens/AuthScreen';
import EventsScreen from './src/screens/EventsScreen';
import IntroScreen from './src/screens/IntroScreen';
import MapScreen from './src/screens/MapScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export default class App extends Component {
  render() {

    const ReviewScreenNavigator = StackNavigator({
      review: { screen: ReviewScreen },
      settings: { screen: SettingsScreen }
    });

    const MainNavigator = TabNavigator({
      map: { screen: MapScreen },
      events: { screen: EventsScreen },
      review: {
        screen: ReviewScreenNavigator
      }
    }, {
      tabBarOptions: {
        labelStyle: { fontSize: 12 }
      }
    });

    const RootNavigator = TabNavigator({
      intro: { screen: IntroScreen },
      auth: { screen: AuthScreen },
      main: { screen: MainNavigator }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });

    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
