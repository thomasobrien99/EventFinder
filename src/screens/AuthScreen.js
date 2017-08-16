import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../actions';

class AuthScreen extends Component {
  static propTypes = {
    fbLogin: PropTypes.func,
    navigation: PropTypes.func
  }

  componentDidMount() {
    this.props.fbLogin();
    this._onAuthComplete(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._onAuthComplete(nextProps);
  }

  _onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('map');
    }
  }

  render() {
    return (
      <View />
    );
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
