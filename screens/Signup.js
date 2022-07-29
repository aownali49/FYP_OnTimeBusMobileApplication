import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import React, {useState} from 'react'
import { dummy, COLORS, SIZES, FONTS, icons, images } from "../constants";
import { Card } from 'react-native-shadow-cards';
import {auth, db} from '../firebase'

const Signup = ({ navigation }) => {
    const [data, setData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    });

    const handleSignUp = () => {
        auth()
            .createUserWithEmailAndPassword(data.email, data.password)
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
                navigation.replace('ScanCard')
            })
            .catch(error => {
                // setModalVisible(!modalVisible)
                // setAlert({
                //     title: 'Error',
                //     message: error.message
                // });
            });
    };

    const addUser = (user) => {
        const userData = {
            'email': user.email
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
                    <TextInput
                        placeholder='Password'
                        placeholderTextColor={'#B5B5B5'}
                        onChangeText={(value) => passwordChangeHandler(value)}
                        value={data.password}
                        style={styles.PasswordInputStyle}
                    ></TextInput>

                    <TextInput
                        placeholder='Re-Enter Password'
                        placeholderTextColor={'#B5B5B5'}
                        onChangeText={(value) => confirmPasswordChangeHandler(value)}
                        value={data.confirm_password}
                        style={styles.PasswordReEnterInputStyle}
                    ></TextInput>

                    <TouchableOpacity
                        onPress={() => handleSignUp()}
                        style={styles.LoginButtonStyle}
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

                        > Already have an account? Press here to login. </Text>
                    </Pressable>





                </Card>


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
        top: 130,
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
        top: 190,
        fontFamily: "Ubuntu-Regular"
    },
    LoginButtonStyle:
    {
        position: 'absolute',
        top: 260,
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