import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { dummy, COLORS, SIZES, FONTS, icons, images } from "../constants";
import { Card } from 'react-native-shadow-cards';
import { auth, db } from '../firebase';
import * as Animatable from 'react-native-animatable'


const Signup = ({ navigation }) => {
    const [data, setData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        check_textInputChange: true,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    });

    const [userCredentials, setUserCredentials] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordValidator, setPasswordValidator] = useState(false);
    const [emailValidator, setEmailValidator] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

    const handleSignUp = () => {
        auth()
            .createUserWithEmailAndPassword(data.email.toLowerCase(), data.password)
            .then(userCredentials => {
                const user = userCredentials.user
                // user.sendEmailVerification()
                addUser(user)
                setData({
                    email: '',
                    password: '',
                    confirm_password: '',
                    check_textInputChange: false,
                    secureTextEntry: true,
                    confirm_secureTextEntry: true
                })
                // navigation.replace('tabs')
                navigation.replace('ScanCard');
            })
            .catch(error => {
                console.log(error)
                if (error.message.includes("[auth/email-already-in-use]")) {
                    setErrorMessage("This email already belongs to a registered account.");
                }
                else if (error.message.includes("[auth/wrong-password]")) {
                    setErrorMessage("Incorrect email/password combination.")
                }
                else {
                    setErrorMessage(error.message)
                }
                setErrorModal(true)
            });
    };

    const addUser = (user) => {
        console.log("New user being created",user);
        const userData = {
            'email': user.email,
            'amount':0,
            'transactionInfo':[]
        }
        const userID = user.uid
        db().collection('users').doc(userID).set(userData)
    }

    const textChangeHandler = (value) => {
        if (value.length >= 11) {
            setData({
                ...data,
                email: value,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: value,
                check_textInputChange: false
            });
        }
    };

    const passwordChangeHandler = (val) => {
        if (val.trim().length >= 6) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }
    const confirmPasswordChangeHandler = (value) => {
        if (value == data.password) {
            setData({
                ...data,
                confirm_password: value,
                isValidConfirmPassword: true
            });
        } else {
            setData({
                ...data,
                confirm_password: value,
                isValidConfirmPassword: false
            });
        }
    };
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
                        height: 400,
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
                        onChangeText={(value) => textChangeHandler(value)}
                        value={data.email}
                        style={styles.EmailInputStyle}
                    ></TextInput>
                    {
                        !data.check_textInputChange &&
                        <Text
                            style={{
                                position: 'absolute',
                                top: 100,
                                alignSelf: 'center',
                                fontFamily: "Ubuntu-Regular",
                                fontSize: 12,
                                color: '#DCDCDC',
                                textAlign: 'center',
                                paddingHorizontal: 10,
                                marginTop: 20,
                                color: '#FF0000'
                            }}
                        >
                            Please enter a valid username.
                        </Text>
                    }
                    <TextInput
                        placeholder='Password'
                        placeholderTextColor={'#B5B5B5'}
                        secureTextEntry={data.secureTextEntry}
                        onChangeText={(value) => passwordChangeHandler(value)}
                        value={data.password}
                        style={styles.PasswordInputStyle}
                    ></TextInput>
                    {
                        !data.isValidPassword &&
                        <Text
                            style={{
                                position: 'absolute',
                                top: 170,
                                alignSelf: 'center',
                                fontFamily: "Ubuntu-Regular",
                                fontSize: 12,
                                color: '#DCDCDC',
                                textAlign: 'center',
                                paddingHorizontal: 10,
                                marginTop: 20,
                                color: '#FF0000'
                            }}
                        >
                            Password should be atleast 6 characters long.
                        </Text>
                    }
                    <TextInput
                        placeholder='Re-Enter Password'
                        placeholderTextColor={'#B5B5B5'}
                        secureTextEntry={data.secureTextEntry}
                        onChangeText={(value) => {
                            confirmPasswordChangeHandler(value)
                        }}
                        value={data.confirm_password}
                        style={styles.PasswordReEnterInputStyle}
                    />
                    {
                        !data.isValidConfirmPassword &&
                        <Text
                            style={{
                                position: 'absolute',
                                top: 240,
                                fontFamily: "Ubuntu-Regular",
                                alignSelf: 'center',
                                fontSize: 12,
                                color: '#DCDCDC',
                                textAlign: 'center',
                                paddingHorizontal: 10,
                                marginTop: 20,
                                color: '#FF0000'
                            }}
                        >
                            Password and confirm password do not match.
                        </Text>
                    }
                    <TouchableOpacity
                        disabled={!data.check_textInputChange || !data.isValidPassword || !data.isValidConfirmPassword || data.password.length === 0 || data.email.length === 0}
                        onPress={() => handleSignUp()}
                        style={{
                            position: 'absolute',
                            top: 290,
                            height: 39,
                            width: 136,
                            borderRadius: 10,
                            backgroundColor: (!data.check_textInputChange || !data.isValidPassword || !data.isValidConfirmPassword || data.password.length === 0 || data.email.length === 0) ? COLORS.LoginButtonDisabled : COLORS.LoginGreen,
                            alignSelf: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Text
                            style={styles.ButtonTextStyle}
                        >Register</Text>
                    </TouchableOpacity>
                    <Pressable
                        onPress={() => { navigation.navigate('Login') }}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed ? COLORS.AlmostWhite : COLORS.stopModalGray,
                                top: 310,
                                borderRadius: 8,
                                padding: 6
                            }
                        ]}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 12,
                                // position:'relative',
                                // top:20,
                                fontFamily: "Ubuntu-Regular",
                                color: COLORS.black
                            }}
                        > Already have an account? Press here to login. </Text>
                    </Pressable>
                </Card>

                {
                    errorModal &&
                    <Animatable.View
                        animation='fadeInUpBig'
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
                                Login Error
                            </Text>
                            <Image
                                style={{
                                    alignSelf: 'center',
                                    marginTop: 30,
                                    height: 100,
                                    width: 100,
                                    tintColor: COLORS.RupeesPink
                                }}
                                source={icons.exclamation}
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
                                {errorMessage}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setErrorModal(false);
                                    setErrorMessage("");
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

            </View>

        </View >
    )
}

export default Signup

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
    PasswordReEnterInputStyle: {
        paddingHorizontal: 25,
        color: COLORS.black,
        width: '85%',
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: COLORS.AlmostWhite,
        position: 'absolute',
        top: 210,
        fontFamily: "Ubuntu-Regular"
    },
    // LoginButtonStyle:
    // {
    //     position: 'absolute',
    //     top: 290,
    //     height: 39,
    //     width: 136,
    //     borderRadius: 10,
    //     backgroundColor: (passwordValidator || emailValidator || data.password.length === 0 || data.username.length === 0) ? COLORS.LoginButtonDisabled : COLORS.LoginGreen,
    //     alignSelf: 'center',
    //     textAlign: 'center',
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