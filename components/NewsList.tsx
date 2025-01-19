import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'
import { Colors } from '@/constants/Colors'
import Loading from './Loading'
import { Link } from 'expo-router'

type Props = {
  newslist: Array<NewsDataType>
}

const NewsList = ({ newslist }: Props) => {
  return (
    <View style={styles.container}>
      {newslist.length == 0 ? (
        <Loading size={'large'} />
      ) : (
        newslist.map((item, index) => (

          <Link href={`/news/${item.article_id}`} asChild key={index}>
            <TouchableOpacity>
              <View 
                style={styles.itemContainer}
              >
                <Image source={{ uri: item.image_url }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <View style={styles.itemSourceInfo}>
                    <Image source={{ uri: item.source_icon }} style={styles.itemSourceimg} />
                    <Text style={styles.itemSourceName}>{item.source_name}</Text>
                  </View>
                </View>

              </View>
            </TouchableOpacity>
          </Link>
        )))}
    </View>
  )
}

export default NewsList

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 50,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
    gap: 10,
  },
  itemImage: {
    width: 90,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    gap: 10,
    justifyContent: 'space-between',

  },
  itemCategory: {
    fontSize: 12,
    color: Colors.darkGrey,
    textTransform: 'capitalize',

  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 600,
    color: Colors.black
  },
  itemSourceimg: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  itemSourceInfo: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  itemSourceName: {
    fontSize: 10,
    fontWeight: 400,
    color: Colors.darkGrey,
    // textTransform: 'capitalize',

  },

})