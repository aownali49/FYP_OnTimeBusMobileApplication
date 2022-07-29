import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { COLORS, icons, SIZES } from '../constants'
import { Card } from 'react-native-shadow-cards';

const TransactionCard = ({ data }) => {
    console.log("TransactionDetails",data);
    return (

        <Card

            style={{
                borderRadius: 10,
                marginTop: 5,
                marginBottom: 5,
                elevation: 10,
                height: 180,
                alignSelf: 'center',
                backgroundColor: COLORS.TransactionCardBeige,
            }}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row'
                }}
            >
                <View
                    style={{
                        flex: 0.2,

                    }}
                >
                    <Image
                        source={icons.bus3}
                        style={{
                            height: 40,
                            width: 40,
                            top: 10,
                            left: 10,
                        }}
                    />
                    <Image
                        source={icons.balance}
                        style={{
                            left: 10,
                            height: 40,
                            width: 40,
                            bottom: -90
                        }}
                    />
                </View>
                <View
                    style={{
                        // borderColor: COLORS.black,
                        // borderWidth: 1,
                        flex: 0.8,
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            // borderColor: COLORS.black,
                            // borderWidth: 1,
                            flex: 0.5,
                            height: '100%',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            padding: 20
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',

                            }}
                        >
                            <Text
                                style={{
                                    // borderColor: COLORS.black,
                                    // borderWidth: 1,
                                    marginRight: 10,
                                    fontSize: 15,
                                    color: COLORS.black,
                                    fontFamily: "Ubuntu-Medium",

                                }}
                            >{data.origStopName}</Text>
                            <Text
                                style={{
                                    // borderColor: COLORS.black,
                                    // borderWidth: 1,
                                    fontSize: 10,
                                    color: COLORS.black,
                                    fontFamily: "Ubuntu-Regular",
                                    textAlignVertical: 'center'
                                }}
                            >10:00 10 July 2022</Text>
                        </View>

                        <Image
                            source={icons.journey}
                            style={{
                                left: 10,
                                height: 30,
                                width: 30,
                                // tintColor: COLORS.black,
                            }}
                        />
                        <View
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <Text
                                style={{
                                    // borderColor: COLORS.black,
                                    // borderWidth: 1,
                                    marginRight: 10,
                                    fontSize: 15,
                                    color: COLORS.black,
                                    fontFamily: "Ubuntu-Medium",
                                }}
                            >{data.destStopName}</Text>
                            <Text
                                style={{
                                    // borderColor: COLORS.black,
                                    // borderWidth: 1,
                                    fontSize: 10,
                                    color: COLORS.black,
                                    fontFamily: "Ubuntu-Regular",
                                    textAlignVertical: 'center'
                                }}
                            >11:00 10 July 2022</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 0.5,
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#FF8B8B',
                                borderRadius: 20,
                                width: 80,
                                height: 80,
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: COLORS.white,
                                    fontFamily: "Ubuntu-Bold"
                                }}
                            >{data.amount}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Card>

    )
}

export default TransactionCard

const styles = StyleSheet.create({})