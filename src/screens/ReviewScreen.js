import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';

import { Button } from 'react-native-elements';

export default class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'Review Events',
      headerRight: (
        <Button
          title="Settings"
          backgroundColor="rgba(0, 0, 0, 0)"
          color="rgba(0, 122, 255, 1)"
          onPress={() => navigate('settings')}/>
      ),
      style: {
        marginTop: Platform.OS === 'android' ? 24 : 0
      }
    }
  }

  render() {
    return (
      <View>
        <Text>I am the ReviewScreen</Text>
      </View>
    );
  }
}
