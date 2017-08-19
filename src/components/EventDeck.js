import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  LayoutAnimation,
  PanResponder,
  Platform,
  UIManager,
  View
} from 'react-native';

import PropTypes from 'prop-types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH / 4;

export default class EventDeck extends Component {
  static propTypes = {
    data: PropTypes.array,
    onSwipeLeft: PropTypes.func,
    onSwipeRight: PropTypes.func,
    renderCard: PropTypes.func,
    : PropTypes.func
  }

  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    renderCard: () => {},
    : () => {}
  }

  constructor(props) {
    super(props);

    this._position = new Animated.ValueXY();

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        this._position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this._finishSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this._finishSwipe('left');
        } else {
          this._resetPosition();
        }
      }
    });

    this.state = { index: 0 };
  }

  _finishSwipe(direction) {
    Animated.timing(this._position, {
      toValue: {
        x: direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH,
        y: 0
      },
      duration: 300
    }).start(() => {
      this._onSwipeFinished(direction);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  _onSwipeFinished(direction) {
    const { data, onSwipeLeft, onSwipeRight } = this.props;
    const item = data[this.state.index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    this._position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  }

  _resetPosition() {
    Animated.spring(this._position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  render() {
    return (
      <View style={styles.cardsContainer}>
        {this._renderCards()}
      </View>
    );
  }

  _getAnimatedStyle() {
    const rotate = this._position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ['-130deg', '0deg', '130deg']
    });

    return {
      ...this._position.getLayout(),
      transform: [{ rotate }]
    };
  }

  _renderCards() {
    if (this.state.index >= this.props.data.length) {
      return this.props.();
    }

    return this.props.data.map((item, index) => {
      if (index < this.state.index) return null;
      if (index === this.state.index) {
        return (
          <Animated.View
            key={item.$.id}
            style={[this._getAnimatedStyle(), styles.cardStyle]}
            {...this._panResponder.panHandlers}>
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }
      return (
        <Animated.View
          key={item.$.id}
          style={[
            styles.cardStyle,
            {
              right: 2 * (index - this.state.index),
              top: 10 * (index - this.state.index),
              zIndex: -index
            }
          ]}>
          {this.props.renderCard(item)}
        </Animated.View>
      );
    });
  }
}

const styles = {
  cardsContainer: {
    width: '100%'
  },
  cardStyle: {
    position: 'absolute',
    width: '100%'
  }
};
