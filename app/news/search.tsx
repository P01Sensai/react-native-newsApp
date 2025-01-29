import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router, Stack, useLocalSearchParams } from 'expo-router'
import { NewsDataType } from '@/types'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'
import Loading from '@/components/Loading'
import { Newsitem } from '@/components/NewsList'

type Props = {}

const Page = (props: Props) => {
  const { query, category, country } = useLocalSearchParams<{
    query: string;
    category: string;
    country: string;
  }>();
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      let categoryString = '';
      let countryString = '';
      let queryString = '';
      if (category) {
        categoryString = `&category=${category}`
      }
      if (country) {
        countryString = `&country=${country}`
      }
      if (query) {
        queryString = `&q=${query}`
      }

      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10${categoryString}${countryString}${queryString}`
      const response = await axios.get(URL)
      // checking the response
      //console.log('Response', response)

      if (response && response.data) {
        setNews(response.data.results);
      }
    } catch (error: any) {
      console.log('Error Message', error.message)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <>
      <Stack.Screen options={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} />
          </TouchableOpacity>
        ),
        title: "Search News"
      }} />
      <View style={styles.container}>
        {/* <Text>Search Query:{query} </Text>
      <Text>Category:{category} </Text>
      <Text>Country:{country} </Text> */}

        {isLoading ? (
          <Loading size={"large"} />
        ) : (
          <FlatList data={news} keyExtractor={(_, index) => `list_items_${index}`} showsVerticalScrollIndicator={false} renderItem={({ index, item }) => {
            return (
              // <Text>{item.title}</Text>  testing the data
              // <Newsitem item={item}/>  checked dispalying the newslist
              <Link href={`/news/${item.article_id}`} asChild key={index}>
                <TouchableOpacity>
                  <Newsitem item={item} />
                </TouchableOpacity>
              </Link>
            );
          }} />
        )}
      </View>
    </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    paddingBottom: 20
  },
})