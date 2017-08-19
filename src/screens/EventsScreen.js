import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import PropTypes from 'prop-types';

import { DEFAULT_LATITUDE_DELTA, DEFAULT_LONGITUDE_DELTA } from '../constants';
import * as actions from '../actions';
import EventDeck from '../components/EventDeck';

class EventsScreen extends Component {
  static propTypes = {
    events: PropTypes.array
  }

  static navigationOptions = {
    title: 'Events',
    tabBarIcon: ({ tintColor }) => {
      return <Icon color={tintColor} name="description" size={24} />;
    }
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <EventDeck
          data={this.props.events}
          onSwipeRight={event => this.props.saveEvent(event)}
          renderCard={this._renderCard}
          ={this._} />
      </View>
    );
  }

  _renderCard(event) {
    const eventTitle = event.title[0].length < 30 ? event.title[0] : event.title[0].slice(0, 29) + '...';

    return (
      <Card containerStyle={styles.card} title={eventTitle}>
        <View style={styles.mapContainer}>
          <MapView
            scrollEnabled={false}
            style={styles.map}
            cacheEnabled
            initialRegion={{
              latitude: Number(event.latitude[0]),
              longitude: Number(event.longitude[0]),
              latitudeDelta: DEFAULT_LATITUDE_DELTA,
              longitudeDelta: DEFAULT_LONGITUDE_DELTA
            }} />
        </View>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>{event.venue_name[0]}</Text>
          <Text style={styles.cardHeaderText}>{event.start_time[0]}</Text>
        </View>
        <View style={styles.cardBody}>
          <Text numberOfLines={3}>{event.description[0].replace(/<[a-z]+>|<\/[a-z]+>/g, '')}</Text>
        </View>
      </Card>
    );
  }

  _ = () => {
    return (
      <Card title="Search again to see more events!">
        <Button
          title="Back To Map"
          large
          icon={{ name: 'my-location' }}
          backgroundColor="green"
          onPress={() => this.props.navigation.navigate('map')} />
      </Card>
    );
  }
}

const styles = {
  card: {
    height: 500
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    overflow: 'hidden',
    width: '100%'
  },
  cardHeaderText: {
    flex: 1
  },
  cardBody: {
    overflow: 'hidden',
    width: '100%'
  },
  mapContainer: {
    height: 300
  },
  map: {
    flex: 1
  },
  screenContainer: {
    marginTop: 15
  }
};

function mapStateToProps({ events }) {
  return {
    events
  };
}

export default connect(mapStateToProps, actions)(EventsScreen);
