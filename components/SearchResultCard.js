import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, Modal } from 'react-native'
import React from 'react'

import { COLORS, FONTS, icons, SIZES } from '../constants'



const SearchResultCard = ({handlePress}) => {
    return (
        <TouchableOpacity

            onPress={handlePress}
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
                style={{
                    flex:0.3
                }}
            >
                <Text
                    style={{ color: COLORS.black }}
                >Route information:</Text>
            </View>
            <View
                style={{
                    flex: 0.7,
                    paddingHorizontal: SIZES.radius,
                    borderColor: COLORS.black,
                    // borderWidth: 1
                }}
            >
                <View
                    style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                    }}
                >
                    <Text style={{ left:50,color: COLORS.black }}>Click to view route</Text>
                    {/* <Text style={{ color: COLORS.black }}></Text> */}
                </View>
                <View
                    style={{
                        flex: 1,
                        borderColor: COLORS.black,
                        // borderWidth: 1,
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