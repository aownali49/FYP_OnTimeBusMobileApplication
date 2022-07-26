
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { dummy, COLORS, SIZES, FONTS, icons, images } from "../constants";
import { Card } from 'react-native-shadow-cards';

const ScanCardRegisterScreen = ({ navigation }) => {
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
                        Create your account:
                    </Text>
                    <Card
                        style={{
                            height: 150,
                            width: 240,
                            alignSelf: 'center',
                            top: 40,
                            borderRadius: 15,
                            elevation: 10,
                        }}

                    >
                        {/* /BackgroundImage */}
                        <Image
                            style={{
                                height: 150,
                                width: 240,
                                // flex:1,
                                borderRadius: 15
                            }}
                            source={images.creditCardBg}
                            resizeMode={'cover'}
                        />
                        <Image
                            style={{
                                height: 59,
                                width: 100,
                                alignSelf: 'center',
                                top: 10,
                                borderRadius: 15,
                                position: 'absolute',

                            }}
                            source={images.logobg}
                            resizeMode={'cover'}
                        />
                        <TextInput
                            placeholder='Scan Card Number'
                            placeholderTextColor={'#B5B5B5'}
                            style={styles.CardNumberInputStyle}
                        ></TextInput>
                    </Card>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('HomeStack')}
                        style={styles.LoginButtonStyle}
                    >
                        <Text
                            style={styles.ButtonTextStyle}
                        >Next</Text>
                    </TouchableOpacity>
                </Card>
            </View>
        </View >
    )
}

export default ScanCardRegisterScreen

const styles = StyleSheet.create({
    ButtonTextStyle: {
        fontFamily: "Ubuntu-Regular",
        textAlign: 'center',
        paddingVertical: 10
    },

    CardNumberInputStyle: {
        paddingHorizontal: 25,
        color: COLORS.black,
        width: '85%',
        fontSize:8,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: COLORS.AlmostWhite,
        position: 'absolute',
        height:30,
        marginTop:85,
        fontFamily: "Ubuntu-Regular"
    },
    LoginButtonStyle:
    {
        position: 'absolute',
        top: 195,
        height: 39,
        width: 110,
        borderRadius: 20,
        backgroundColor: COLORS.LoginGreen,
        alignSelf: 'center',
        textAlign: 'center',
    },
})