import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import { AppLoading } from 'expo';
import { isNull } from 'lodash';
import PropTypes from 'prop-types';

import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Find events near you!', color: 'aliceblue' },
  { text: 'Set a location, and then swipe right to like!', color: 'dodgerblue' }
];

export default class WelcomeScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  state = {
    token: null
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
