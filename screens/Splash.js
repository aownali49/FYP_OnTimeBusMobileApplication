// import { StyleSheet, Text, View } from 'react-native'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { dummy, COLORS, SIZES, FONTS, icons, images } from "../constants";
import React, { useState, useEffect } from 'react'

const Splash = ({ navigation }) => {

  
  useEffect(() => {
    setTimeout(()=>{
      navigation.navigate('Login')
    },3000)
    
  });


  return (
    <View
      style={{
        height: '100%',
        backgroundColor: COLORS.white

      }}
    >
      <Image
        source={images.logoBackground}
        resizeMode='cover'
        style={styles.logoStyle}
      />
      <View
        style={styles.ActivityIndicatorStyle}>
        <ActivityIndicator size='large' />

      </View>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    top: 300,
    height: 100,
    width: 100,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  logoStyle: {
    position: 'absolute',
    height: 166,
    top: 100,
    width: '100%',
    // borderColor:COLORS.black,
    // borderWidth:1,
  }


})