import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { NewsDataType } from '@/types'
import Loading from '@/components/Loading'
import { Colors } from '@/constants/Colors'
import Moment from 'moment'

type Props = {}



const NewsDetails = (props: Props) => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getNews();
    }, []);
    
    const getNews = async () => {
        try {
          const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`
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

    return (
        <>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name='arrow-back' size={22} />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity>
                        <Ionicons name = 'heart-outline' size ={22}/>
                    </TouchableOpacity>
                ),
                title: ''

            }} />

            {isLoading ?(
                <Loading size={'large'}/>
            ): (

                <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
                    
                    <Text style={styles.title}>{news[0].title}</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.newsInfo}>{Moment(news[0].pubDate).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                        <Text style={styles.newsInfo}>{news[0].source_name}</Text>

                    </View>
                    <Image source={{uri: news[0].image_url}}  style={styles.newsImage}/>

                    {news[0].content ? (
                        <Text style={styles.newsContent}>{news[0].content}</Text>
                    ) : (
                        <Text style={styles.newsContent}>{news[0].description}</Text>
                    )}
                    
                
                </ScrollView>

            )}

            
        </>
    )
}

export default NewsDetails

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.white,
        
    },
    contentContainer:{
        marginHorizontal: 20,
        paddingBottom: 30,
    },
    newsImage:{
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginBottom: 20,
    },
    infoContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    newsInfo:{
        fontSize: 12,
        color: Colors.darkGrey,
    },
    title:{
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
        marginBottom:20,
        letterSpacing: 0.6,
    },
        newsContent:{
        fontSize: 14,
        color: '#555',
        letterSpacing: 0.8,
        lineHeight: 22,
        },
})