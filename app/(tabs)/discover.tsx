import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Searchbar from '@/components/Searchbar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import newsCategoryList from '@/constants/Categories'
import CheckBox from '@/components/CheckBox'
import { useNewsCategories } from '@/hooks/useNewsCategories'
import { useNewsCountry } from '@/hooks/useNewsCountryList'

type Props = {}

const Page = (props: Props) => {

  const { top: safeTop } = useSafeAreaInsets();
  const {newscategories, toggleNewsCategory} = useNewsCategories();
  const {newscountry, toggleNewsCountry} = useNewsCountry();
  const [searchQuery, setSearchQuery]= useState("");
  const [category, setCategory]= useState("");
  const [country, setCountry]= useState("");

  return (
    <View style={[styles.container, {paddingTop: safeTop + 20}]}>
      <Searchbar withHorizontalPadding={false} setSearchQuery={setSearchQuery}/>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.ListContainer}>
        {/* here newscategories will update current selection on category */}

         {newscategories.map((item) => (
          <CheckBox  key={item.id} 
          label={item.title} 
          checked={item.selected}  
          onPress={() => {
            toggleNewsCategory(item.id) ;
            setCategory(item.slug);
            // here id will provide the seletec category id and set it as a false or true to mark check
          }}/>
         ))}
      </View>

      <Text style={styles.title}>Country</Text>
      <View style={styles.ListContainer}>
        {/* here newscountry will update current selection on country */}

         {newscountry.map((item, index) => (
          <CheckBox  key={index} 
          label={item.name} 
          checked={item.selected}  
          onPress={() => {
            toggleNewsCountry(index);
            setCountry(item.code);  
            // here id will provide the selected country id and set it as a false or true to mark check
          }}/>
         ))}
      </View>

      <TouchableOpacity style={styles.searchBTN}>
        <Text style={styles.searchBTNText}>Search</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:20,
    // justifyContent: "center",
    // alignItems: "center",
  },
  title: {
          fontSize: 18,
          fontWeight: "600",
          color: Colors.black,
          marginBottom: 10,
          // marginLeft: 8,
      },
      ListContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        marginTop:12,
        marginBottom: 20,

      },
      searchBTN :{
        backgroundColor: Colors.tint,
        alignItems: 'center',
        padding: 14,
        borderRadius: 10,
        marginVertical: 10,
      },
      searchInput:{},
      searchBTNText:{
        color: Colors.white,
        fontWeight: '600',
        fontSize: 16,
      },

})