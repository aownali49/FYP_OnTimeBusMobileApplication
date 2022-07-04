import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { dummy, COLORS, SIZES, FONTS, icons, images } from "../constants";
import { Card } from 'react-native-shadow-cards';


const Login = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.slateGray,
      }}
    >
      <View
        style={{
          height: '50%',
          backgroundColor: COLORS.white

        }}
      >
        <Image
          source={images.logoBackground}
          resizeMode='cover'
          style={{
            position: 'absolute',
            height: 166,
            top: 30,
            width: '100%',
            // borderColor:COLORS.black,
            // borderWidth:1,
          }}
        />
        <Card
          style={{
            elevation: 10,
            width: '80%',
            height: '100%',
            position: 'absolute',
            top: 200,
            alignSelf: 'center',
            backgroundColor: COLORS.stopModalGray,
            borderRadius: 20,
            display: 'flex'
          }}
        >
          <Text
            style={{
              color: COLORS.black,
              textAlign: 'center',
              top: 20,
              fontSize: 20,
              fontFamily: "Ubuntu-Regular"
            }}
          >
            Join the movement now!
          </Text>

          <TextInput
            placeholder='Email'
            placeholderTextColor={'#B5B5B5'}

            style={styles.EmailInputStyle}
          ></TextInput>
          <TextInput
            placeholder='Password'
            placeholderTextColor={'#B5B5B5'}
            style={styles.PasswordInputStyle}
          ></TextInput>
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeStack')}
            style={styles.LoginButtonStyle}
          >
            <Text
              style={styles.ButtonTextStyle}
            >Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={styles.RegisterButton}
          >
            <Text
              style={styles.ButtonTextStyle}
            >Register</Text>
          </TouchableOpacity>



        </Card>


      </View>

    </View >
  )
}

export default Login

const styles = StyleSheet.create({
  ButtonTextStyle: {
    fontFamily: "Ubuntu-Regular",
    textAlign: 'center',
    paddingVertical: 10
  },

  EmailInputStyle: {
    paddingHorizontal: 25,
    color: COLORS.black,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.AlmostWhite,
    position: 'absolute',
    top: 70,
    fontFamily: "Ubuntu-Regular"
  },
  PasswordInputStyle: {
    paddingHorizontal: 25,
    color: COLORS.black,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.AlmostWhite,
    position: 'absolute',
    top: 140,
    fontFamily: "Ubuntu-Regular"
  },
  LoginButtonStyle:
  {
    position: 'absolute',
    top: 210,
    height: 39,
    width: 136,
    borderRadius: 10,
    backgroundColor: COLORS.LoginGreen,
    alignSelf: 'center',
    textAlign: 'center',
  },
  RegisterButton:
  {
    position: 'absolute',
    top: 260,
    height: 39,
    width: 136,
    borderRadius: 10,
    backgroundColor: COLORS.RegisterGray,
    alignSelf: 'center',
    textAlign: 'center',
  }



})