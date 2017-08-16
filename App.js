import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './src/store';
import AuthScreen from './src/screens/AuthScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import MapScreen from './src/screens/MapScreen';
import DeckScreen from './src/screens/DeckScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ReviewScreen from './src/screens/ReviewScreen';

export default class App extends Component {
  render() {

    const ReviewScreenNavigator = StackNavigator({
      review: { screen: ReviewScreen },
      settings: { screen: SettingsScreen }
    });

    const MainNavigator = TabNavigator({
      map: { screen: MapScreen },
      deck: { screen: DeckScreen },
      review: {
        screen: ReviewScreenNavigator
      }
    }, {
      tabBarOptions: {
        labelStyle: { fontSize: 12 }
      }
    });

    const RootNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
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
