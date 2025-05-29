import { Dimensions, FlatList, StyleSheet, Text, useWindowDimensions, View, ViewToken } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '@/constants/Colors'
import Animated, { scrollTo, useAnimatedRef, useAnimatedScrollHandler, useDerivedValue, useSharedValue } from 'react-native-reanimated'
import { NewsDataType } from '@/types'

import SliderItem from "@/components/SliderItem";
import Pagination from "@/components/Pagination";



type Props = {
    newsList: Array<NewsDataType>
}
const { width } = Dimensions.get('screen')
const ITEM_WIDTH = width  // Adjust the width to make space for the previous and next slides
const ITEM_MARGIN = (width - ITEM_WIDTH) / 2


const BreakingNews = ({ newsList }: Props) => {
    // here we are using the useState to autoplay the slider
    const [isAutoPlay, setIsAutoPlay] = useState(true)
    const interval = useRef<NodeJS.Timeout>()
    const offset = useSharedValue(0)
    const { width } = useWindowDimensions()

    // here we are using the onViewableItemsChanged to get the index of the current slide
    const onViewableItemsChanged = ({
        viewableItems,
    }: {
        viewableItems: ViewToken[]; // here we are using the ViewToken to get the index of the current slide   
    }) => {
        if (
            viewableItems[0].index !== undefined &&
            viewableItems[0].index !== null
        ) {
            setPaginationIndex(viewableItems[0].index % newsList.length)
        }
    }

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    }

    const viewabilityConfigCallbackPairs = useRef([
        { viewabilityConfig, onViewableItemsChanged },
    ])

    

    const ref = useAnimatedRef<Animated.FlatList<any>>();
    const scrollX = useSharedValue(0)
    const [paginationIndex, setPaginationIndex] = useState(0)
    const [Data, setData] = useState(newsList)

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        },
        onMomentumEnd: (e) => {
            offset.value = e.contentOffset.x;
        }
    })
    // here we are using the useEffect to autoplay the slider
    useEffect(() => {
        if (isAutoPlay === true) {
            interval.current = setInterval(() => {
                offset.value = offset.value + width
            }, 5000)
        } else {
            clearInterval(interval.current)
        }
        return () => {
            clearInterval(interval.current)
        }
    }, [isAutoPlay, offset, width])

    // here we are using the useDerivedValue to scroll the flatlist
    useDerivedValue(() => {
        scrollTo(ref, offset.value, 0, true)
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Breaking News</Text>
            <View style={styles.slideWrapper}>
                {/* <Text>hey im i visible</Text> */}
                {/* <FlatList 
                data={newsList}
                keyExtractor={(_, index) => `list_items_${index}`}
                renderItem={({ item, index }) => (
                    <SliderItem slideItem={item} index={index} scrollX={scrollX} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                
                /> */}


                <Animated.FlatList
                    ref={ref}
                    data={Data}
                    keyExtractor={(_, index) => `list_items_${index}`}
                    renderItem={({ item, index }) => (
                        <SliderItem slideItem={item} index={index} scrollX={scrollX} />
                    )}
                    
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={onScrollHandler} scrollEventThrottle={16}
                    contentContainerStyle={styles.flatListContent}
                    onEndReachedThreshold={0.7}
                    onEndReached={() => setData([...Data, ...newsList])}
                    // onEndReached={() => {
                    //     const newData = [...data, ...newsList];
                    //     console.log('Updated Data:', newData);
                    //     setData(newData);
                    // }}

                     viewabilityConfigCallbackPairs={
                        viewabilityConfigCallbackPairs.current
                    }

                    onScrollBeginDrag={() => {
                        setIsAutoPlay(false);
                    }}
                    onScrollEndDrag={() => {
                        setIsAutoPlay(true);
                    }}

                    

                />


                {/* <Animated.FlatList

                    ref={ref}
                    data={data}
                    keyExtractor={(_, index) => `list_items_${index}`}
                    renderItem={({ item, index }) => (
                        <SliderItem slideItem={item} index={index} scrollX={scrollX} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={onScrollHandler} scrollEventThrottle={16}
                    contentContainerStyle={styles.flatListContent}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => setData([...data, ...newsList])} //setting loop

                    // viewabilityConfigCallbackPairs it will help to get the index of the current slide to show the pagination
                    //  viewabilityConfigCallbackPairs={
                    //     viewabilityConfigCallbackPairs.current
                    // }
                    // here if drag and drop the slider then the autoplay will be stopped
                    onScrollBeginDrag={() => {
                        setIsAutoPlay(false);
                    }}
                    // here if drag and drop the slider then the autoplay will be started
                    onScrollEndDrag={() => {
                        setIsAutoPlay(true);
                    }}



                /> */}


                <Pagination items={newsList} scrollX={scrollX} paginationIndex={paginationIndex} />


            </View>
        </View>
    )
}

export default BreakingNews

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,

    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20,
    },
    slideWrapper: {
        // width: '100%',
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingHorizontal: 20,
        // paddingVertical: 10,
    },
    flatListContent: {
        paddingHorizontal: ITEM_MARGIN,
    },



})