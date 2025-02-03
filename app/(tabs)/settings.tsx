import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'


type Props = {}

const Page = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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

        <TouchableOpacity style={styles.itembtn} onPress={toggleSwitch}>
          <Text style={styles.itembtntxt}>Dark Mode</Text>
          <Switch 
           trackColor={{ false: '#767577', true:'#3e3e3e' }}
           thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
           ios_backgroundColor='#3e3e3e' //ios only
            
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{transform: [{ scale: 1}], marginBottom: -15, marginRight: -8}}
          />
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
    borderBottomColor: Colors.tint,
    borderBottomWidth: 0.8,
  },
  
})