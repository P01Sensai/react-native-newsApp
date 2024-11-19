import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'

type Props = {
  slideItem: NewsDataType,
  index: number
  scrollX: SharedValue<number>
}

const { width } = Dimensions.get('screen');

const SliderItem = ({ slideItem, index, scrollX }: Props) => {
  
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [- width * 0.15, 0, width * 0.15],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],

    };
  });


  return (
    <Animated.View style={[styles.itemWrapper, rnStyle]} key={slideItem.article_id}>
      <Image source={{ uri: slideItem.image_url }} style={styles.image} />
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.background}>
        <View style={styles.srcInfo}>
          {slideItem.source_icon && (
            <Image source={{ uri: slideItem.source_icon }} style={styles.srcIcon} />
          )}
          <Text style={styles.srcName}>{slideItem.source_name}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>{slideItem.title}</Text>
      </LinearGradient>
    </Animated.View>
  )
}

export default SliderItem

const styles = StyleSheet.create({
  itemWrapper: {
    
    position: 'relative', // what it does that it will make the image and the background in the same position
    width: width  ,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width - 60,
    height: 180,
    borderRadius: 20,
  },
  background: {
    position: 'absolute',
    left: 30,
    right: 0,
    top: 0,
    width: width - 60,
    height: 180,
    borderRadius: 20,
    padding: 15,
  },
  srcIcon: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
  },
  srcName: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',


  },
  srcInfo: {
    flexDirection: 'row',
    position: 'absolute',
    top: 85,
    padding: 15,
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 14,
    color: Colors.white,
    position: 'absolute',
    top: 130,
    paddingHorizontal: 15,
  },

})