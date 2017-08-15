import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Find events near you!', color: '#03A9F4'},
  { text: 'Set a location, and then swipe right to like!', color: '#009688'}
];

export default class WelcomeScreen extends Component {
  _handleCompleteSlides = () => {
      this.props.navigation.navigate('auth')
  }

  render() {
    return (
      <Slides data={SLIDE_DATA} onComplete={this._handleCompleteSlides} />
    );
  }
}
