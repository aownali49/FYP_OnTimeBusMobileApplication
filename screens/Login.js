import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { dummy, COLORS, SIZES, FONTS, icons, images } from "../constants";
import { Card } from 'react-native-shadow-cards';
import * as Animatable from 'react-native-animatable'

import { auth } from '../firebase';

const Login = ({ navigation }) => {

  const [userCredentials, setUserCredentials] = useState("");
  const [initializing, setInitializing] = useState(true);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);

  const [errorMessage, setErrorMessage] = useState({ title: "", message: "", icon: icons.exclamation });
  const [passwordValidator, setPasswordValidator] = useState(false);
  const [emailValidator, setEmailValidator] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [data, setData] = useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const [resetEmail, setResetEmail] = useState("");

  function onAuthStateChanged(user) {
    setUserCredentials(user);
    if (initializing) setInitializing(false);
    if (user != null)
      navigation.replace('HomeStack');
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])

  const handleSignIn = () => {
    auth()
      .signInWithEmailAndPassword(data.username, data.password)
      .then(userCredentials => {
        setData({
          username: '',
          password: '',
          check_textInputChange: false,
          secureTextEntry: true,
          isValidUser: true,
          isValidPassword: true,
        });
        navigation.replace('HomeStack')
      })
      .catch(error => {
        console.log(error)
        if (error.message.includes("[auth/user-not-found]")) {
          setErrorMessage({ title: "Login Error", message: "Please enter a valid account, no user was found against your credentials.", icon: icons.exclamation });
        }
        else if (error.message.includes("[auth/wrong-password]")) {
          setErrorMessage({ title: "Login Error", message: "Incorrect email/password combination.", icon: icons.exclamation })
        }
        else {
          setErrorMessage({ title: "Login Error", message: error.message, icon: icons.exclamation })
        }
        setErrorModal(true)

      })
  }
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
            value={data.username}
            onChangeText={(text) => {
              if (data.username.length < 3) {
                setEmailValidator(true);
              } else {
                setEmailValidator(false);
              }
              setData({
                ...data,
                username: text
              })
            }}
            placeholder='Email'
            placeholderTextColor={'#B5B5B5'}
            style={styles.EmailInputStyle}
          ></TextInput>
          {
            // false && 
            // <Text
            //     style={{
            //       // borderWidth:1,
            //       top:75,
            //       fontFamily: "Ubuntu-Regular",
            //       fontSize: 12,
            //       color: '#DCDCDC',
            //       textAlign: 'center',
            //       paddingHorizontal: 10,
            //       marginTop: 20,
            //       color:'#FF0000'
            //     }}
            //   >
            //     Please enter a valid email address.
            //   </Text>
          }
          <TextInput
            secureTextEntry={true}
            value={data.password}
            onChangeText={(text) => {
              if (data.password.length < 6) {
                setPasswordValidator(true);
              } else {
                setPasswordValidator(false);
              }
              setData({
                ...data,
                password: text
              })
            }}
            placeholder='Password'
            placeholderTextColor={'#B5B5B5'}
            style={styles.PasswordInputStyle}
          ></TextInput>
          {
            // false && 
            // <Text
            //     style={{
            //       // borderWidth:1,
            //       top:110,
            //       fontFamily: "Ubuntu-Regular",
            //       fontSize: 12,
            //       color: '#DCDCDC',
            //       textAlign: 'center',
            //       paddingHorizontal: 10,
            //       marginTop: 20,
            //       color:'#FF0000'
            //     }}
            //   >
            //     Password should be atleast 6 characters long.
            //   </Text>
          }


          <TouchableOpacity
            disabled={passwordValidator || emailValidator || data.password.length === 0 || data.username.length === 0}
            onPress={handleSignIn}
            style={{
              position: 'absolute',
              top: 210,
              height: 39,
              width: 136,
              borderRadius: 10,
              backgroundColor: (passwordValidator || emailValidator || data.password.length === 0 || data.username.length === 0) ? COLORS.LoginButtonDisabled : COLORS.LoginGreen,
              alignSelf: 'center',
              textAlign: 'center',
              // opacity:0.1
            }}
          >
            <Text
              style={styles.ButtonTextStyle}
            >Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.replace('Signup')}
            style={styles.RegisterButton}
          >
            <Text
              style={styles.ButtonTextStyle}
            >Register</Text>
          </TouchableOpacity>
          <Pressable
            onPress={() => {
              setForgotPasswordModal(true)
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.AlmostWhite : COLORS.stopModalGray,
                top: 280,
                borderRadius: 8,
                padding: 6
              }
            ]}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontFamily: "Ubuntu-Regular",
                color: COLORS.black
              }}
            > Forgot password? </Text>
          </Pressable>

        </Card>
        {
          errorModal &&
          <Animatable.View
            animation='fadeInUpBig'
          // animation='slideInDown'
          >
            <Card
              animationType='fade'
              style={{
                height: 300, width: 300,
                backgroundColor: COLORS.white,
                borderRadius: 20,
                alignSelf: 'center',
                top: 200,
                elevation: 50,
                flexDirection: 'column'
              }}>
              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: 25,
                  color: COLORS.gray,
                  textAlign: 'center',
                  marginTop: 20
                }}
              >
                {errorMessage.title}
              </Text>
              <Image
                style={{
                  alignSelf: 'center',
                  marginTop: 30,
                  height: 100,
                  width: 100,
                  tintColor: COLORS.RupeesPink
                }}
                source={errorMessage.icon}
              />
              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: 15,
                  color: '#DCDCDC',
                  textAlign: 'center',
                  paddingHorizontal: 10,
                  marginTop: 20
                }}
              >
                {errorMessage.message}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setErrorModal(false);
                  setErrorMessage({ title: "", message: "", icon: "" });
                  setEmailValidator(true);
                  setPasswordValidator(true);
                  setData({
                    username: "",
                    password: ""
                  })
                }}
                style={{
                  height: 39,
                  width: 110,
                  borderRadius: 20,
                  top: 10,
                  backgroundColor: COLORS.LoginGreen,
                  alignSelf: 'center',
                  textAlign: 'center',
                }}
              >
                <Text
                  style={styles.ButtonTextStyle}
                >Continue</Text>
              </TouchableOpacity>
            </Card>
          </Animatable.View>
        }
        {
          forgotPasswordModal &&
          <Animatable.View
            animation='fadeInUpBig'
          // animation='slideInDown'
          >
            <Card
              animationType='fade'
              style={{
                height: 300, width: 300,
                backgroundColor: COLORS.lightGray,
                borderRadius: 20,
                alignSelf: 'center',
                top: 200,
                elevation: 50,
                flexDirection: 'column'
              }}>
              <Text
                style={{
                  fontFamily: "Ubuntu-Regular",
                  fontSize: 25,
                  color: COLORS.gray,
                  textAlign: 'center',
                  marginTop: 20
                }}
              >
                Forgot Password
              </Text>

              <TextInput
                onChangeText={(text) => {
                  setResetEmail(text)
                }}
                placeholder='Email'
                placeholderTextColor={'#B5B5B5'}
                style={{
                  marginTop: 50,
                  paddingHorizontal: 25,
                  backgroundColor: COLORS.gray,
                  color: COLORS.black,
                  width: '85%',
                  alignSelf: 'center',
                  borderRadius: 20,
                  backgroundColor: COLORS.AlmostWhite,
                  fontFamily: "Ubuntu-Regular"
                }}
              />
              <TouchableOpacity
                disabled={resetEmail.length === 0}
                onPress={() => {
                  if (resetEmail.length !== 0) {
                    auth().sendPasswordResetEmail(resetEmail)
                      .then(() => {
                        console.log("Success mail sent");
                        setForgotPasswordModal(false);
                        setErrorModal(true)
                        setErrorMessage({
                          title: "Email sent",
                          message: "Email is sent to your account, please check your email.",
                          icon: icons.checkMark
                        })
                      })
                      .catch((error) => {
                        console.log("Email send failure", error);
                      })
                  }
                }}
                style={{
                  height: 39,
                  width: 110,
                  borderRadius: 20,
                  marginTop: 10,
                  backgroundColor: (resetEmail.length === 0) ? COLORS.LoginButtonDisabled : COLORS.LoginGreen,
                  alignSelf: 'center',
                  textAlign: 'center',
                }}
              >
                <Text
                  style={styles.ButtonTextStyle}
                >Continue</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setForgotPasswordModal(false)
                }}
                style={{
                  height: 39,
                  width: 110,
                  borderRadius: 20,
                  marginTop: 5,
                  backgroundColor: COLORS.RegisterGray,
                  alignSelf: 'center',
                  textAlign: 'center',
                }}
              >
                <Text
                  style={styles.ButtonTextStyle}
                >Cancel</Text>
              </TouchableOpacity>
            </Card>
          </Animatable.View>
        }

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
  // LoginButtonStyle:
  // {
  //   position: 'absolute',
  //   top: 210,
  //   height: 39,
  //   width: 136,
  //   borderRadius: 10,
  //   backgroundColor:( passwordValidator || emailValidator || data.password.length===0 || data.username.length===0 )?COLORS.gray:COLORS.LoginGreen,
  //   alignSelf: 'center',
  //   textAlign: 'center',
  // },
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