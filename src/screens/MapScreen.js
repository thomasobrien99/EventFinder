import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import PropTypes from 'prop-types';

import * as actions from '../actions';

class MapScreen extends Component {
  static propTypes = {
    getEvents: PropTypes.func
  }

  static defaultProps = {
    getEvents: () => {}
  }


  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => {
      return <Icon color={tintColor} name="my-location" size={24} />;
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
      return (
        <View style={styles.screenContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.screenContainer}>
        <MapView style={styles.mapView} initialRegion={this.state.region} onRegionChangeComplete={this._handleRegionChangeComplete} />
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Get Events!"
            backgroundColor="lightseagreen"
            icon={{ name: 'search' }}
            onPress={this._handlePressButton} />
        </View>
      </View>
    );
  }

  _handlePressButton = () => {
    this.props.getEvents(this.state.region, () => {
      this.props.navigation.navigate('events');
    });
  }

  _handleRegionChangeComplete = region => {
    this.setState({ region });
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  mapView: {
    flex: 1
  }
};

export default connect(null, actions)(MapScreen);
