import { StyleSheet, Text, View, Image, ImageBackground, FlatList, Pressable } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { COLORS, images, SIZES, icons } from '../constants'
import { Card } from 'react-native-shadow-cards';

const Balance = () => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.lightGray
            }}
        >
            {/* CardView */}
            <View
                style={{
                    flex: 0.4,
                    backgroundColor: COLORS.LoginGreen
                }}
            >
                <Text
                    style={{
                        // borderColor: COLORS.black,
                        // borderWidth: 1,
                        color: COLORS.black,
                        top: 30,
                        paddingLeft: 20,
                        fontSize: 25,
                        fontFamily: "Ubuntu-Regular"
                    }}
                >My Balance</Text>

                <Card
                    style={{
                        height: 171,
                        width: 295,
                        alignSelf: 'center',
                        top: 40,
                        borderRadius: 15,
                        elevation: 10,
                    }}

                >
                    {/* /BackgroundImage */}
                    <Image
                        style={{
                            height:171,
                            width:295,
                            // flex:1,
                            borderRadius:15
                        }}
                        source={images.creditCardBg}
                        resizeMode={'cover'}
                    />
                    <Image
                        style={{
                            height:59,
                            width:100,
                            left:20,
                            top:10,
                            borderRadius:15,
                            position:'absolute',

                        }}
                        source={images.logobg}
                        resizeMode={'cover'}
                    />
                    <Text
                        style={{
                            position:'absolute',
                            top:10,
                            left:175,
                            fontFamily:'SpaceGrotesk-Light',
                            fontSize:24,
                            color:COLORS.black
                        }}
                    >
                        Rs. 1500
                    </Text>
                    <Text
                        style={{
                            position:'absolute',
                            top:100,
                            fontFamily:'SpaceGrotesk-Regular',
                            fontSize:14,
                            left:25,
                            color:COLORS.black

                        }}
                    >
                        4018 **** **** 2266
                    </Text>
                    <Text
                        style={{
                            position:'absolute',
                            top:120,
                            left:20,
                            fontFamily:'SpaceGrotesk-Bold',
                            fontSize:16,
                            color:COLORS.black
                        }}
                    >
                        Muhammad Usman Karamat
                    </Text>


                   

                </Card>


            </View>
            <View
                style={{
                    flex: 0.6,
                    backgroundColor: COLORS.RegisterGray,
                    borderRadius: 20,
                    top: -15
                }}
            >

            </View>
        </View>
    )
}

export default Balance

const styles = StyleSheet.create({})