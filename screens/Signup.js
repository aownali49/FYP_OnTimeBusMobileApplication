import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import React from 'react'
import { dummy, COLORS, SIZES, FONTS, icons, images } from "../constants";
import { Card } from 'react-native-shadow-cards';

const Signup = ({navigation}) => {
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

                        style={styles.EmailInputStyle}
                    ></TextInput>
                    <TextInput
                        placeholder='Password'
                        placeholderTextColor={'#B5B5B5'}
                        style={styles.PasswordInputStyle}
                    ></TextInput>

                    <TextInput
                        placeholder='Re-Enter Password'
                        placeholderTextColor={'#B5B5B5'}
                        style={styles.PasswordReEnterInputStyle}
                    ></TextInput>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('ScanCard')}
                        style={styles.LoginButtonStyle}
                    >
                        <Text
                            style={styles.ButtonTextStyle}
                        >Register</Text>
                    </TouchableOpacity>

                    <Pressable
                        onPress={() => {navigation.navigate('Login')}}
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
                                color:COLORS.black
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