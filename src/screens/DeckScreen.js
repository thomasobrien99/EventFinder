import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import PropTypes from 'prop-types';

import * as actions from '../actions';
import EventDeck from '../components/EventDeck';

class DeckScreen extends Component {
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
          renderNoMoreCards={this._renderNoMoreCards} />
      </View>
    );
  }

  _renderCard(event) {
    const eventTitle = event.title[0].length < 30 ? event.title[0] : event.title[0].slice(0, 29) + '...';

    return (
      <Card containerStyle={styles.card} title={eventTitle}>
        <View style={{ height: 300 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            cacheEnabled
            initialRegion={{
              latitude: Number(event.latitude[0]),
              longitude: Number(event.longitude[0]),
              latitudeDelta: 0.045,
              longitudeDelta: 0.02
            }} />
        </View>
        <View style={styles.cardHeader}>
          <Text style={{flex: 1}}>{event.venue_name[0]}</Text>
          <Text style={{flex: 1}}>{event.start_time[0]}</Text>
        </View>
        <View style={styles.cardBody}>
          <Text numberOfLines={3}>{event.description[0].replace(/<[a-z]+>|<\/[a-z]+>/g, '')}</Text>
        </View>
      </Card>
    );
  }

  _renderNoMoreCards = () => {
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

  _handleSwipeRight = () => {

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
  cardBody: {
    overflow: 'hidden',
    width: '100%'
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

export default connect(mapStateToProps, actions)(DeckScreen);
