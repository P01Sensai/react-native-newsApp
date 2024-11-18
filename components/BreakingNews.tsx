import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { NewsDataType } from '@/types'

type Props = {
    newsList: Array<NewsDataType>
}

const BreakingNews = ({newsList}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breaking News</Text>
      <View style={styles.slideWrapper}>
        
        

      </View>
    </View>
  )
}

export default BreakingNews

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,

    },
    title :{
        fontSize: 18,
        fontWeight: "600",
        color: Colors.black,
        marginBottom: 10,
        marginLeft:20,
    },
    slideWrapper:{
        width: '100%',
        flex: 1,
        justifyContent: 'center'
    },

})