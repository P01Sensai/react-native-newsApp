import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Topheader from '@/components/Topheader'
import Searchbar from '@/components/Searchbar'
import axios from 'axios'
import { NewsDataType } from '@/types'
import BreakingNews from '@/components/BreakingNews'
import { isLoading } from 'expo-font'
import Categories from '@/components/Categories'
import NewsList from '@/components/NewsList'
import Loading from '@/components/Loading'



type Props = {}

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getBreakingNews();
    getNews();
  }, [])

  const getBreakingNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=5`
      const response = await axios.get(URL)
      // checking the response
      //console.log('Response', response)

      if (response && response.data) {
        setBreakingNews(response.data.results);
      }
    } catch (error: any) {
      console.log('Error Message', error.message)
    }finally {
      setIsLoading(false)
    }
  };

  const getNews = async (category: string = '') => {
    try {
      let categoryString = '';
      if (category.length !== 0) {
        categoryString = `&category=${category}`
      }
        
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10${categoryString}`
      const response = await axios.get(URL)
      // checking the response
      //console.log('Response', response)

      if (response && response.data) {
        setNews(response.data.results);
      }
    } catch (error: any) {
      console.log('Error Message', error.message)
    }finally {
      setIsLoading(false)
    }
  };

  const onCatChanged =(category: string) => {
    console.log('Category', category);
    setNews([]);
    getNews(category);
  }


  return (
    <ScrollView style={[styles.container, { paddingTop: safeTop }]}>
      <Topheader />
      <Searchbar />
      { isLoading ? (
        <Loading size={'large'}/>
        // <ActivityIndicator size={'large'}/>
      ) : (
        <BreakingNews newsList={breakingNews} />
      )}

      <Categories onCatChanged={onCatChanged}/>
      <NewsList newslist={news}/>  






      {/* // here we are checking the breaking news data is coming or not */}
      {/* {breakingNews.map((item, index) => (
        <Text>
          {item.title}
        </Text>
      ))} */}
    </ScrollView>
  );
};

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
})