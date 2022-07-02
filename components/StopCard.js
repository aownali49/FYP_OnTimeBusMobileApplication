import { StyleSheet, Text, View, Image, } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { COLORS, FONTS, icons, SIZES } from '../constants'

const StopCard = ({ data }) => {

    const stopId = data.stopId;
    const stopName= data.stopName;
    const stopAddress= data.stopAddress;
    const tta=data.tta;
     
    // console.log(data.tta);
    
    return (
        
        <View style={{

            height: 100,
            width: '100%',
            alignSelf: 'center'
        }}>
            <View
                style={{
                    // borderColor: COLORS.black,
                    // borderWidth: 1,
                    height: 100,
                    width: '85%',
                    alignSelf: 'flex-end',
                    marginRight: 10,
                    flexDirection: 'row'
                }}
            >
                <View
                    style={{
                        flex: 0.75,
                        justifyContent: 'center',
                        // borderColor: COLORS.blue,
                        // borderWidth: 1,
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.black,
                            fontSize: 20,
                        }}
                    >
                        {stopName}
                    </Text>
                    <Text
                        style={{
                            color: '#9B9999',
                            fontSize: 14,
                        }}
                    >
                        {/* Stop Address goes here */}
                        {stopAddress}
                    </Text>
                </View>
                <View
                    style={{
                        flex: 0.25,
                        // borderColor: COLORS.blue,
                        // borderWidth: 1,
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        source={icons.online}
                        resizeMode="cover"
                        style={{
                            alignSelf: 'center',
                            height: 40,
                            width: 40,
                        }}
                    />
                    <Text
                        style={{
                            color:'#4FCF88',
                            fontSize: 14,
                            alignSelf: 'center',
                        }}
                    >
                        {tta}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default StopCard

const styles = StyleSheet.create({})