import React, { Component } from 'react';
import { AsyncStorage, Text, View } from 'react-native';

import { AppLoading } from 'expo';
import { isNull } from 'lodash';

import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Find events near you!', color: '#03A9F4'},
  { text: 'Set a location, and then swipe right to like!', color: '#009688'}
];

export default class WelcomeScreen extends Component {
  constructor(props) {
    super (props);

    this.state = {
      token: null
    };
  }

  async componentWillMount() {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }

  _handleCompleteSlides = () => {
      this.props.navigation.navigate('auth');
  }

  render() {
    if (isNull(this.state.token)) return <AppLoading />;
    return (
      <Slides data={SLIDE_DATA} onComplete={this._handleCompleteSlides} />
    );
  }
}
