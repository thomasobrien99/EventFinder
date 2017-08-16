import React, { Component } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

import * as actions from '../actions';

class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => {
      return <Icon color={tintColor} name="my-location" size={24} />
    }
  }

  state = {
    mapLoaded: false,
    region: {
      latitude: 37,
      latitudeDelta: 0.09,
      longitude: -122,
      longitudeDelta: 0.04
    }
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  render() {
    if (!this.state.mapLoaded) {
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    }
    return (
      <View style={styles.container}>
        <MapView style={styles.mapView} initialRegion={this.state.region} onRegionChangeComplete={this._handleRegionChangeComplete} />
        <View style={styles.buttonContainer}>
          <Button large title="Get Events!" backgroundColor="#009688" icon={{ name: 'search' }} onPress={this._handlePressButton}/>
        </View>
      </View>
    );
  }

  _handlePressButton = () => {
    this.props.getEvents(this.state.region, () => {
      this.props.navigation.navigate('deck');
    });
  }

  _handleRegionChangeComplete = region => {
    this.setState({ region })
  }
}

styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  mapView: {
    flex: 1
  }
};

export default connect(null, actions)(MapScreen)

//http://api.eventful.com/rest/events/search?...&where=32.746682,-117.162741&within=25
// mXqWpmWFXXTJ28rz
