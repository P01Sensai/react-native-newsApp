import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}

const Searchbar = (props : Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <Ionicons name='search-outline' size={20} color={Colors.lightGrey} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.lightGrey}
          style={styles.searchText} 
          autoCapitalize='none'
          />
      </View>
    </View>
  );
}

export default Searchbar

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 20,
    },
    searchbar:{
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        

    },
    searchText:{
        flex: 1,
        color: Colors.darkGrey,
        fontSize: 14,
        //justifyContent: 'center',

        
    },


})