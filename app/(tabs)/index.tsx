import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Topheader from '@/components/Topheader'
import Searchbar from '@/components/Searchbar'
import axios from 'axios'
import { NewsDataType } from '@/types'
import BreakingNews from '@/components/breakingNews'


type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);

  useEffect(() => {
    getBreakingNews();
  }, [])

  const getBreakingNews = async() => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=in&language=en&image=1&removeduplicate=1&size=5`
      const response = await axios .get(URL)

      if(response && response.data){
        setBreakingNews(response.data.results);
      }
    } catch (error: any) {
      console.log('Error Message', error.message)
      }
  }
  return (
    <View style={[styles.container, {paddingTop:safeTop}]}>
      
      <Topheader />
      <Searchbar />
      <BreakingNews newsList={breakingNews}/>
      
      
      {/* // here we are checking the breaking news data is coming or not */}
      {/* {breakingNews.map((item, index) => (
        <Text>
          {item.title}
        </Text>
      ))} */}
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
})