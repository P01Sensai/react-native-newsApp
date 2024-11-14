 import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, StatusBar } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInDown } from "react-native-reanimated";
import { FadeInRight } from "react-native-reanimated";

const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle ="light-content" />
      <ImageBackground
        source={require('@/assets/images/getting-started.jpg')}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.wrapper}>
          <Animated.Text style={styles.title} entering={FadeInRight.delay(300).duration(500)}>
            Stay Updated! </Animated.Text>
          <Animated.Text style={styles.description} entering={FadeInRight.delay(500).duration(500)}>
            Get breraking news, latest news and more directly to your feed.
          </Animated.Text>
          <Animated.View entering={FadeInDown.delay(1200).duration(500)}>
            <TouchableOpacity style={styles.btn} onPress={() => router.replace("/(tabs)")}>
              {/* // why we used replace instead of push cause we wont need welcome page again */}
              <Text style={styles.btntext}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>

        </View>
      </ImageBackground>

    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  wrapper: {

    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 50,
    paddingHorizontal: 30,
    gap: 10,
    backgroundColor: 'rgba(0,0,0,0.5)', //with 50% opacity in background

  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1.5,
    lineHeight: 36,
    textAlign: 'center',
  },
  description: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1.2,
    lineHeight: 22,
    textAlign: 'center',

  },
  btn: {
    backgroundColor: Colors.tint, //tint is a color from constants/Colors.ts
    paddingVertical: 15,
    marginVertical: 20, // why padding and margin both => padding is inside the box and margin is outside the box
    alignItems: 'center',
    borderRadius: 10,

  },
  btntext: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',

  },
});
