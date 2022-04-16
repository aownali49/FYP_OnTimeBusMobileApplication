import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, Modal } from 'react-native'
import React from 'react'

import { COLORS, FONTS, icons, SIZES } from '../constants'



const SearchResultCard = () => {
    return (
        <TouchableOpacity
            style={{
                height: 100,
                marginHorizontal: SIZES.radius,
                paddingHorizontal: SIZES.radius,
                paddingVertical: SIZES.base,
                marginTop: SIZES.radius,
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius,
                flexDirection: 'row',


            }}
        >
            <View

            >
                <Text
                    style={{ color: COLORS.black }}
                >Departure in:</Text>
                <Text style={{ color: COLORS.black }}>08 <Text>min</Text></Text>
            </View>
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: SIZES.radius,
                    borderColor: COLORS.black,
                    borderWidth: 1
                }}

            >
                <View
                    style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        borderColor: COLORS.black,
                        borderWidth: 1

                    }}
                >
                    <Text style={{ color: COLORS.black }}>Travel time: <Text>50 min</Text></Text>
                    <Text style={{ color: COLORS.black }}>18:45</Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: SIZES.radius,
                        flexDirection: "row",
                        justifyContent: 'center',
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',

                        }}
                    >
                        <Image
                            style={{
                                height: 25,
                                width: 25,
                                marginBottom: 5
                            }}
                            source={icons.man}
                        />

                        <Image
                            resizeMode='cover'
                            style={{
                                height: 15,
                                width: 15,
                                marginBottom: 5
                                
                            }}
                            source={icons.rightarrow}
                        />
                        <View
                            style={{


                                justifyContent: 'flex-end'

                            }}

                        >
                            <Text
                                style={{

                                    color: COLORS.black,

                                }}
                            >
                                18:00
                            </Text>
                            <View
                                style={{

                                    flexDirection: 'row',
                                    alignItems: 'center',


                                }}

                            >
                                <Image
                                    style={{
                                        height: 25,
                                        width: 25,
                                    }}
                                    source={icons.bus2}
                                />

                                <View
                                    style={{
                                        backgroundColor: COLORS.black,
                                        padding: 6,
                                        borderRadius: SIZES.radius,
                                        marginRight: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginHorizontal: 5
                                    }}
                                >
                                    <Text>
                                        808
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            marginLeft: SIZES.base,
                        }}
                    >
                        <Image
                            style={{
                                height: 25,
                                width: 25, 
                                marginBottom: 5
                            }}
                            source={icons.man}
                        />

                        <Image
                            resizeMode='cover'
                            style={{
                                height: 15,
                                width: 15, 
                                marginBottom: 5
                            }}
                            source={icons.rightarrow}
                        />
                        <View
                            style={{


                                justifyContent: 'flex-end'

                            }}

                        >
                            <Text
                                style={{

                                    color: COLORS.black,

                                }}
                            >
                                18:00
                            </Text>
                            <View
                                style={{

                                    flexDirection: 'row',
                                    alignItems: 'center',


                                }}

                            >
                                <Image
                                    style={{
                                        height: 25,
                                        width: 25,
                                    }}
                                    source={icons.bus2}
                                />

                                <View
                                    style={{
                                        backgroundColor: COLORS.black,
                                        padding: 6,
                                        borderRadius: SIZES.radius,
                                        marginRight: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginHorizontal: 5
                                    }}
                                >
                                    <Text>
                                        808
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </View>

        </TouchableOpacity>
    )
}

export default SearchResultCard

const styles = StyleSheet.create({})