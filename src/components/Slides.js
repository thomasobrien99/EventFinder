import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  View
} from 'react-native';

import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Slides extends Component {
  static propTypes = {
    data: PropTypes.array,
    onComplete: PropTypes.func
  }

  render() {
    return (
      <ScrollView pagingEnabled horizontal style={styles.slidesScrollView}>
        {this._renderSlides()}
      </ScrollView>
    );
  }

  _renderSlides() {
    return this.props.data.map((slideObject, index) => {
      return (
        <View key={slideObject.text} style={[styles.slide, { backgroundColor: slideObject.color }]}>
          <Text style={styles.slideText}>{slideObject.text}</Text>
          {index === this.props.data.length - 1 ? this._renderNextButton() : null}
        </View>
      );
    });
  }

  _renderNextButton() {
    return (
      <Button
        buttonStyle={styles.button}
        title="Onwards!"
        raised
        onPress={this.props.onComplete} />
    );
  }
}

const styles = {
  button: {
    backgroundColor: 'dodgerblue',
    marginTop: 15
  },
  slide: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: SCREEN_WIDTH
  },
  slideText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 30
  },
  slidesScrollView: {
    flex: 1
  }
};
