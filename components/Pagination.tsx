import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { SharedValue } from 'react-native-reanimated'
import { NewsDataType } from '@/types'
import { Colors } from '@/constants/Colors'

type Props = {
  items: NewsDataType[],
  paginationIndex: number
  scrollX: SharedValue<number>
}

const Pagination = ({items, paginationIndex, scrollX}: Props) => {
  return (
    <View style={styles.conatiner}>
      {items.map((_, index) => {
        return (
            <Animated.View style={[styles.dot, {backgroundColor: paginationIndex === index ? Colors.tint : Colors.darkGrey}]} key={index}/>
        )
      })}
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
    conatiner :{
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot:{
        backgroundColor: '#333',
        height: 8,
        width: 8,
        marginHorizontal: 2,
        borderRadius: 8,
    },

})