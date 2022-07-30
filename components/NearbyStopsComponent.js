import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import React, { useState } from 'react'
import { Card } from 'react-native-shadow-cards';

const NearbyStopsComponent = (props) => {
    const [stopsInfo, setStopInfo] = useState(props.data.item)
    // console.log("This item is highlighted=>",props.highlighted);
    // let highlighted = false;
    // props.highlighted===stopsInfo.stopId? highlighted=true :highlighted = false;

    return (
        // <Card
        //     style={{
        //         marginTop: 5,
        //         marginBottom: 5,
        //         elevation: 10,
        //         maxWidth: props.highlighted===stopsInfo.stopId?SIZES.width-30: SIZES.width-50,
        //         height: props.highlighted===stopsInfo.stopId? 83 : 80,
        //         alignSelf: 'center',
        //         backgroundColor: props.highlighted===stopsInfo.stopId? COLORS.LoginGreen : COLORS.AlmostWhite
        //     }}
        // >
        //     <View
        //         style={{
        //             flex: 1,
        //             flexDirection: 'row',
        //             alignItems: 'center',
        //             justifyContent: 'center'

        //         }}>
        //         <Image
        //             source={icons.busStop}
        //             style={{
        //                 position: 'absolute',
        //                 left: 10,
        //                 height: 40,
        //                 width: 40,
        //                 // borderColor: COLORS.black,
        //                 // borderWidth: 1,
        //             }}
        //         />


        //         <Text
        //             style={{
        //                 // textAlign:'center',
        //                 // marginLeft: 10,
        //                 // borderColor: COLORS.black,
        //                 // borderWidth: 1,
        //                 position: 'absolute',
        //                 color: COLORS.black,
        //                 left: 50,
        //                 top: 10,
        //                 fontSize: 15,
        //                 fontWeight: '700'
        //             }}
        //         > {stopsInfo.stopName} </Text>
        //         <Text
        //             style={{
        //                 // borderColor: COLORS.black,
        //                 // borderWidth: 1,
        //                 position: 'absolute',
        //                 color: COLORS.black,
        //                 left: 55,
        //                 top: 35,
        //                 fontSize: 15,
        //                 maxWidth:SIZES.width-50
        //             }}
        //         >
        //             {stopsInfo.stopAddress}
        //         </Text>
        //         <Text
        //             style={{
        //                 // borderColor: COLORS.black,
        //                 // borderWidth: 1,
        //                 position: 'absolute',
        //                 right: 10,
        //                 top: 10,
        //                 fontSize: 12,
        //                 color: COLORS.black,
        //             }}
        //         >
        //             {stopsInfo.distance}
        //         </Text>
        //     </View>
        // </Card>
        // </TouchableOpacity>

        <Card
            style={{
                height:props.highlighted===stopsInfo.stopId? 105: 100,
                width: props.highlighted===stopsInfo.stopId? (SIZES.width / 3) - 7: (SIZES.width / 3) - 10,
                marginHorizontal: 5,
                flexDirection: 'column',
                backgroundColor: props.highlighted===stopsInfo.stopId? COLORS.LoginGreen : COLORS.AlmostWhite
            }}>
            <View
                style={{
                    flex:0.7,
                    alignItems:'center',
                    justifyContent:'center'
                }}
            >
                <Image
                    source={icons.busStop}
                    style={{
                        height:40,
                        width:40,
                    }}
                />
            </View>
            <View
                style={{
                    flex:0.3,
                }}
            >
                <Text
                    style={{
                        color: COLORS.black,
                        fontSize: 12,
                        fontFamily: props.highlighted===stopsInfo.stopId?"Ubuntu-Bold":"Ubuntu-Regular",
                        textAlign:'center'
                    }}
                >
                    {stopsInfo.stopName}
                </Text>
            </View>

        </Card>
    )
}

export default NearbyStopsComponent

const styles = StyleSheet.create({})