import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

import * as actions from '../actions';

class SettingsScreen extends Component {
  render() {
    return (
      <View>
        <Button
          backgroundColor={this.props.savedEvents.length ? "red" : "gray"}
          title="Clear Saved Events"
          large
          onPress={this.props.clearEvents}
          icon={{ name: 'delete-forever' }}/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    savedEvents: state.savedEvents
  }
}

export default connect(mapStateToProps, actions)(SettingsScreen)
