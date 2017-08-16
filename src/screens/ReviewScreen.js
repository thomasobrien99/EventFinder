import React, { Component } from 'react';
import {
  Linking,
  Platform,
  ScrollView,
  Text,
  View
} from 'react-native';

import { connect } from 'react-redux';
import { Button, Card, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import PropTypes from 'prop-types';

class ReviewScreen extends Component {
  static propTypes = {
    savedEvents: PropTypes.array
  }

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Saved Events',
      tabBarIcon: ({ tintColor }) => {
        return <Icon color={tintColor} name="favorite" size={24} />;
      },
      headerRight: (
        <Button
          title="Settings"
          backgroundColor="rgba(0, 0, 0, 0)"
          color="rgba(0, 122, 255, 1)"
          onPress={() => navigate('settings')} />
      ),
      style: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      }
    };
  }

  _renderSavedEvents() {
    if (!this.props.savedEvents.length) {
      return (
        <Card title="No Saved Events!">
          <Button
            title="Back To Map"
            large
            icon={{ name: 'my-location' }}
            backgroundColor="green"
            onPress={() => this.props.navigation.navigate('map')} />
        </Card>
      );
    }

    return this.props.savedEvents.map(event => {
      const initialRegion = {
        longitude: Number(event.longitude[0]),
        latitude: Number(event.latitude[0]),
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };

      const eventTitle = event.title[0].length < 30 ? event.title[0] : event.title[0].slice(0, 29) + '...';

      return (
        <Card title={eventTitle} key={event.$.id}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              cacheEnabled
              scrollEnabled={false}
              initialRegion={initialRegion}
            />
            <View style={styles.cardHeader}>
              <Text numberOfLines={1} style={styles.italics}>{event.venue_name[0]}</Text>
              <Text numberOfLines={1} style={styles.italics}>{event.start_time[0]}</Text>
            </View>
            <Button
              title="See Details!"
              backgroundColor="dodgerblue"
              onPress={() => Linking.openURL(event.url[0])}
            />
          </View>
        </Card>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        {this._renderSavedEvents()}
      </ScrollView>
    );
  }
}

const styles = {
  card: {
    height: 200
  },
  cardHeader: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  italics: {
    fontStyle: 'italic'
  }
};

function mapStateToProps(state) {
  return { savedEvents: state.savedEvents };
}

export default connect(mapStateToProps)(ReviewScreen);
