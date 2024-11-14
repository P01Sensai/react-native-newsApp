import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Topheader from '@/components/Topheader'
import Searchbar from '@/components/Searchbar'

type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets();
  return (
    <View style={[styles.container, {paddingTop:safeTop}]}>
      
      <Topheader />
      <Searchbar />
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
})