import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, LinearTransition, useAnimatedStyle, withTiming } from 'react-native-reanimated';

type Props = {
    label: string;
    checked: boolean;
    onPress: () => void;
}

const CheckBox = ({ label, checked, onPress }: Props) => {
    const rnAnimatedContainerStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: withTiming(checked ? "rgba(240, 142, 82, 0.1)" : "transparent", { duration: 150 }), //in milisecond
            borderColor: withTiming(checked ? Colors.tint : Colors.black, { duration: 150, }),
            paddingLeft: 16,
            paddingRight: checked ? 10 : 16,
        };
    }, [checked]);

    const rnTextStyle = useAnimatedStyle(() => {
        return {
            color: withTiming(checked ? Colors.tint : Colors.black, { duration: 150 }),
        }
    }, [checked]);

    return (

        <Animated.View style={[styles.Container, rnAnimatedContainerStyle]}
        onTouchEnd={onPress}
        layout={LinearTransition.springify().mass(0.8)}
        >
            <Animated.Text style={[styles.label, rnTextStyle]}>{label}</Animated.Text>

            {checked && (
                <Animated.View style={styles.IconWrapper}
                    entering={FadeIn.duration(350)}
                    exiting={FadeOut}
                >
                    <AntDesign name='checkcircle' size={14} color={Colors.tint} />
                </Animated.View>
            )}



        </Animated.View>
    );
};

export default CheckBox

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderColor: Colors.black,
        borderRadius: 32,
        // paddingHorizontal: 16,
        borderWidth: 1,
    },
    label: {
        fontSize: 12,
        color: Colors.black
    },
    IconWrapper: {
        marginLeft: 8,
        height: 14,
        width: 14,

    },
})