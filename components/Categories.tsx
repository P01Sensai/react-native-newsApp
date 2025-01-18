import { ScrollView, StyleSheet, Text, TouchableOpacity, View,  } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors } from '@/constants/Colors'
import newsCategoryList from '@/constants/Categories'

type Props = {
    onCatChanged: (category: string) => void;
};

const Categories = ({onCatChanged}: Props) => {

    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<(typeof TouchableOpacity)[] | null[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelectCategory= (index: number) =>{
        const selected = itemRef.current[index];
        setActiveIndex(index);

        selected?.measure((x: number) => {
            scrollRef.current?.scrollTo({x: x-20, y:0, animated: true})
        });

        onCatChanged(newsCategoryList[index].slug);
    }
  return (
    <View>
      <Text style={styles.title}>Trending right Now</Text>
      <ScrollView ref={scrollRef}
      horizontal showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.itemWrapper}>
        {newsCategoryList.map((item, index)=>(
            <TouchableOpacity 
            ref={(el) => itemRef.current[index] = el}
            key={index} 
            style={[ styles.item, activeIndex === index && styles.itemActive ]}
            
            onPress={() => handleSelectCategory(index)}
            >
               <Text style={[styles.itemtxt, activeIndex === index && styles.itemtextActive]}>
                {item.title}</Text> 
            </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.black,
        marginLeft: 20,
    },
    itemWrapper:{
        gap:20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    itemtxt:{
        fontSize: 14,
        //fontWeight: "500",
        color: Colors.darkGrey,
        letterSpacing: 0.5,
    },
    item:{
        borderWidth: 1,
        borderColor: Colors.darkGrey,
        paddingVertical:10,
        paddingHorizontal: 16,
        borderRadius: 10,

    },
    itemActive:{
        backgroundColor: Colors.tint,
        borderColor: Colors.tint,
    },
    itemtextActive:{
        color: Colors.white,
        fontWeight: '600',
    }
})