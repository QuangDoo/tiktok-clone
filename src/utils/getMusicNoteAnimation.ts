import {Animated} from 'react-native';

export const getMusicNoteAnimation = (
  animatedValue: Animated.Value,
  isRotatedLeft: boolean,
) => {
  return {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -16],
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -32],
        }),
      },
      {
        rotate: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', isRotatedLeft ? '-45deg' : '45deg'],
        }),
      },
    ],

    opacity: animatedValue.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, 1, 0],
    }),
  };
};
