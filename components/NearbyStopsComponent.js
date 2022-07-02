import { StyleSheet, Text, View, Image } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import React, { useState } from 'react'
import { Card } from 'react-native-shadow-cards';

const NearbyStopsComponent = (props) => {
    const [stopsInfo, setStopInfo] = useState(props.data.item)
    // console.log("These are the props in my state",stopsInfo);

    return (
        // <View
        //     style={{

        //         // borderColor:COLORS.black,
        //         // borderWidth:1,
        //         position:'relative',
        //         flexDirection: 'row',
        //         alignItems: 'center',
        //         paddingTop: SIZES.padding,
        //         paddingLeft: SIZES.padding * 0.3,
        //     }}
        // >
        //     <View
        //         style={{
        //             width: 35,
        //             height: 35
        //         }}
        //     >
        //         <Image
        //             source={icons.bus}
        //             resizeMode="cover"
        //             style={{
        //                 width: 25,
        //                 height: 25
        //             }}
        //         />
        //     </View>
        //     <View
        //         style={{
        //             flex: 1
        //         }}
        //     >
        //         <Text
        //             style={{
        //                 color: COLORS.black,
        //                 ...FONTS.body3
        //             }}
        //         >{stopsInfo.name}</Text>
        //         <Text
        //             style={{
        //                 color: COLORS.black,
        //                 ...FONTS.body4
        //             }}
        //         >{stopsInfo.address}</Text>
        //     </View>
        // </View>
        <Card
            style={{
                marginTop: 5,
                marginBottom: 5,
                elevation: 10,
                width: '95%',
                height: 80,
                alignSelf: 'center'
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'

                }}>
                <Image
                    source={icons.busStop}
                    style={{
                        position: 'absolute',
                        left: 10,
                        height: 40,
                        width: 40,
                        // borderColor: COLORS.black,
                        // borderWidth: 1,
                    }}
                />


                <Text
                    style={{
                        // textAlign:'center',
                        // marginLeft: 10,
                        // borderColor: COLORS.black,
                        // borderWidth: 1,
                        position: 'absolute',
                        color: COLORS.black,
                        left: 50,
                        top: 10,
                        fontSize: 15,
                        fontWeight: '700'
                    }}
                > {stopsInfo.name} </Text>
                <Text
                    style={{
                        // borderColor: COLORS.black,
                        // borderWidth: 1,
                        position: 'absolute',
                        color: COLORS.black,
                        left: 55,
                        top: 35,
                        fontSize: 15,
                    }}
                >
                    {stopsInfo.address}
                </Text>
                <Text
                    style={{
                        // borderColor: COLORS.black,
                        // borderWidth: 1,
                        position: 'absolute',
                        right: 10,
                        top: 10,
                        fontSize: 12,
                        color: COLORS.black,
                    }}
                >
                    {stopsInfo.distance}
                </Text>
            </View>
        </Card>
    )
}

export default NearbyStopsComponent

const styles = StyleSheet.create({})