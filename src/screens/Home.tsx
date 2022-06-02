import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {FlatList} from 'react-native';
// import VideoItem from './src/components/VideoItem';
import data from '../assets/VideoData';
import VideoItem from '../components/VideoItem';
import {windowHeight} from '../utils/getWidthHeight';

const HomeScreen = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);

  const bottomTabsHeight = useBottomTabBarHeight();

  return (
    <FlatList
      data={data}
      pagingEnabled
      renderItem={({item, index}) => (
        <VideoItem video={item} isActive={activeVideoIndex === index} />
      )}
      onScroll={e => {
        const index = Math.round(
          e.nativeEvent.contentOffset.y / (windowHeight - bottomTabsHeight),
        );

        setActiveVideoIndex(index);
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default HomeScreen;
