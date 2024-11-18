import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'

type Props = {
    slideItem: NewsDataType,
    index: number
}

const {} = Dimensions.get('screen');

const SliderItem = ({slideItem, index}: Props) => {
  return (
    <View style={styles.itemWrapper}>
      <Image 
      source={{uri: slideItem.image_url}}
       style={styles.image}
      
      />
    </View>
  )
}

export default SliderItem

const styles = StyleSheet.create({
    itemWrapper:{
        position: 'relative',
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        width: width,
        height: 180,
        borderRadius: 20,
    }

})