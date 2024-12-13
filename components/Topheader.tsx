import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}

const header = (props:Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                < Image
                    source={{ uri: 'https://xsgames.co/randomusers/avatar.php?g=male' }}
                    style={styles.userImage}
                />
                <View style={{gap:3}}>
                    <Text style={styles.welcome}>Welcome</Text>
                    <Text style={styles.username}>Pramanshu!</Text>
                </View>

            </View>
            <TouchableOpacity onPress={() => {}}>
            <Ionicons name='notifications-outline' size={24} color={Colors.black} />
            </TouchableOpacity>
            
        </View>
    )
}

export default header

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    username:{
        fontSize: 14,
        color: Colors.black,
        fontWeight: '700',
    },
    welcome:{
        fontSize: 12,
        color: Colors.darkGrey,
    },
})