import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, Stack } from 'expo-router';
import Loading from '@/components/Loading';
import { Newsitem } from '@/components/NewsList';
import { useIsFocused } from '@react-navigation/native';

type Props = {}

const Page = (props: Props) => {
  const [bookmarkNews, setBookmarkNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused(); // what is this? => This is a hook that returns true if the screen is focused, false otherwise.

  useEffect(() => {
    fetchBookmark();
  }, [isFocused])

  const fetchBookmark = async () => {
    await AsyncStorage.getItem("bookmark").then(async (token) => {
      const res = JSON.parse(token);
      setIsLoading(true); // this is to show the loading spinner to update the data
      if (res) {
        console.log('Bookmark res: ', res);
        let query_string = res.join(',');
        console.log('Query String: ', query_string);

        const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${query_string}`);

        const news = response.data.results;
        setBookmarkNews(news);
        setIsLoading(false);
      } else {
        setBookmarkNews([]);
        setIsLoading(false);
      }
    });
  }

  return (
    <>
      <Stack.Screen options={{
        headerShown: true,

      }}
      />

      <View style={styles.container}>
        {isLoading ? (
          <Loading size={"large"} />
           ) :(
            < FlatList data={bookmarkNews} keyExtractor={(_, index) => `list_items_${index}`} showsVerticalScrollIndicator={false} renderItem={({ index, item }) => {
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
    margin: 10,
  },
})