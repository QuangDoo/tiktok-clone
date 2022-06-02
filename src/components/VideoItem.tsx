import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import {useCallback} from 'react';
import {Easing} from 'react-native';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import {VideoModel} from '../assets/VideoData';
import {getMusicNoteAnimation} from '../utils/getMusicNoteAnimation';
import {windowHeight, windowWidth} from '../utils/getWidthHeight';

type Props = {
  video: VideoModel;
  isActive: boolean;
};

export default function VideoItem(props: Props) {
  const {channelName, uri, caption, musicName, likes, comments, avatarUri} =
    props.video;

  const discAnimatedValue = useRef(new Animated.Value(0)).current;
  const musicNoteAnimatedValue1 = useRef(new Animated.Value(0)).current;
  const musicNoteAnimatedValue2 = useRef(new Animated.Value(0)).current;

  const dicsAnimaLoopRef = useRef<any>();
  const musicNoteAnimaLoopRef = useRef<any>();

  const bottomTabsHeight = useBottomTabBarHeight();

  const triggerAnimation = useCallback(() => {
    dicsAnimaLoopRef.current = Animated.loop(
      // timing is
      Animated.timing(discAnimatedValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),

      //loop should has start
    );

    dicsAnimaLoopRef.current.start();

    musicNoteAnimaLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(musicNoteAnimatedValue1, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(musicNoteAnimatedValue2, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
    );
    musicNoteAnimaLoopRef.current.start();
  }, [discAnimatedValue, musicNoteAnimatedValue1, musicNoteAnimatedValue2]);

  // create animation prototype for dics
  const discAnimation = {
    transform: [
      {
        rotate: discAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  // create animation prototype for music note 1
  const musicNoteAnimation1 = getMusicNoteAnimation(
    musicNoteAnimatedValue1,
    false,
  );

  // create animation prototype for music note 2
  const musicNoteAnimation2 = getMusicNoteAnimation(
    musicNoteAnimatedValue2,
    true,
  );

  useEffect(() => {
    if (props.isActive) {
      triggerAnimation();
    } else {
      dicsAnimaLoopRef.current?.stop();
      musicNoteAnimaLoopRef.current?.stop();

      musicNoteAnimatedValue1.setValue(0);
      musicNoteAnimatedValue2.setValue(0);
    }
  }, [
    discAnimatedValue,
    musicNoteAnimatedValue1,
    musicNoteAnimatedValue2,
    props.isActive,
    triggerAnimation,
  ]);

  return (
    <View style={[styles.container, {height: windowHeight - bottomTabsHeight}]}>
      <Video
        source={{uri}}
        style={styles.video}
        resizeMode="cover"
        paused={!props.isActive}
        repeat
      />

      <View style={styles.bottomSection}>
        <View style={styles.bottomLeftSection}>
          <Text style={styles.channelName}>{channelName}</Text>

          <Text style={styles.caption}>{caption}</Text>

          <View style={styles.musicNameContainer}>
            <Image
              source={require('../assets/images/music-note.png')}
              style={styles.musicIcon}
            />

            <Text style={styles.musicName}>{musicName}</Text>
          </View>
        </View>
        <View style={styles.bottomRightSection}>
          <Animated.Image
            source={require('../assets/images/floating-music-note.png')}
            style={[styles.floatingMusicNote, musicNoteAnimation1]}
          />

          <Animated.Image
            source={require('../assets/images/floating-music-note.png')}
            style={[styles.floatingMusicNote, musicNoteAnimation2]}
          />

          <Animated.Image
            source={require('../assets/images/disc.png')}
            style={[styles.musicDisc, discAnimation]}
          />
        </View>
      </View>

      <View style={styles.verticalBar}>
        <View style={[styles.verticalItem, styles.avatarContainer]}>
          <Image source={{uri: avatarUri}} style={styles.avatar} />
          {/* always wrap absolute view surroung element */}
          <View style={styles.followButton}>
            <Image
              source={require('../assets/images/plus-button.png')}
              style={styles.followButtonIcon}
            />
          </View>
        </View>

        <View style={styles.verticalItem}>
          <Image
            source={require('../assets/images/heart.png')}
            style={styles.verticalItemIcon}
          />
          <Text style={styles.verticalBarText}>{likes}</Text>
        </View>

        <View style={styles.verticalItem}>
          <Image
            source={require('../assets/images/message-circle.png')}
            style={styles.verticalItemIcon}
          />
          <Text style={styles.verticalBarText}>{comments}</Text>
        </View>

        <View style={styles.verticalItem}>
          <Image
            source={require('../assets/images/reply.png')}
            style={styles.verticalItemIcon}
          />
          <Text style={styles.verticalBarText}>Share</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
  },
  video: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  bottomLeftSection: {
    flex: 4,
  },
  bottomRightSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  channelName: {
    color: 'white',
    fontWeight: 'bold',
  },
  caption: {
    color: 'white',
    marginVertical: 8,
  },
  musicNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
  musicName: {
    color: 'white',
  },
  musicDisc: {
    width: 40,
    height: 40,
  },
  verticalBar: {
    position: 'absolute',
    right: 8,
    bottom: 72,
  },
  verticalItem: {
    marginBottom: 24,
    alignItems: 'center',
  },
  verticalItemIcon: {
    width: 32,
    height: 32,
  },
  verticalBarText: {
    color: 'white',
    marginTop: 4,
  },
  avatarContainer: {
    marginBottom: 48,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  followButton: {
    position: 'absolute',
    bottom: -8,
  },
  followButtonIcon: {
    width: 21,
    height: 21,
  },
  floatingMusicNote: {
    position: 'absolute',
    right: 40,
    bottom: 16,
    width: 16,
    height: 16,
    tintColor: 'white',
  },
});
