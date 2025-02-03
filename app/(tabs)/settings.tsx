import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}

const Page = (props: Props) => {
  return (
    <>
      <Stack.Screen options={{
        headerShown: true,

      }} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.itembtn}>
          <Text style={styles.itembtntxt}>About</Text>
          <MaterialIcons name='arrow-forward' size={16} color={Colors.lightGrey} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itembtn}>
          <Text style={styles.itembtntxt}>Send Feedback</Text>
          <MaterialIcons name='arrow-forward' size={16} color={Colors.lightGrey} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itembtn}>
          <Text style={styles.itembtntxt}>About</Text>
          <MaterialIcons name='arrow-forward' size={16} color={Colors.lightGrey} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itembtn}>
          <Text style={styles.itembtntxt}>Privacy Policy</Text>
          <MaterialIcons name='arrow-forward' size={16} color={Colors.lightGrey} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itembtn}>
          <Text style={styles.itembtntxt}>Dark Mode</Text>
          <MaterialIcons name='arrow-forward' size={16} color={Colors.lightGrey} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itembtn}>
          <Text style={[styles.itembtntxt , {color:'red'}]}>Logout</Text>
          <MaterialIcons name="logout" size={16} color={'red'} />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

  },
  itembtntxt: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,

  },
  itembtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomColor: Colors.background,
    borderBottomWidth: 1,
  },
})