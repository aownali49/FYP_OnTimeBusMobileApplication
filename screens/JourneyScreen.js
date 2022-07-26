import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, FlatList, Modal, Pressable, ActivityIndicator } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import { LineDivider, StopCard } from '../components';
import GOOGLE_MAPS_API from './GoogleMapsAPI';
import { Card } from 'react-native-shadow-cards'
import { Colors } from 'react-native/Libraries/NewAppScreen'
var axios = require('axios');




const JourneyScreen = () => {
    const [coordinates, setCoordinates] = useState({
        pickupCoords: {
            latitude: 33.504013,
            longitude: 73.102201,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        },
        dropoffCoords: {
            latitude: 33.503686,
            longitude: 73.100291,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
    });
    const mapRef = useRef();
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.BluishBalance,
            }}
        >

            <View
                style={{
                    flex: 0.35
                }}
            >
                <MapView
                    ref={mapRef}
                    style={{ flex: 1 }}
                    // scrollEnabled={false}
                    // zoomEnabled={false}
                    // rotateEnabled={false}
                    initialRegion={coordinates.pickupCoords}
                >
                </MapView>
            </View>
            <Animatable.View
                animation='fadeInUpBig'
                style={{
                    flex: 0.65,
                    // backgroundColor: COLORS.lightGray,
                    backgroundColor: '#EAF6F6',
                    top: -20,
                    marginBottom: -15,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }}
            >
                <View
                    style={{
                        marginTop: 20,
                        // borderWidth:1,
                        // borderColor:COLORS.black
                    }}
                >
                    <Text
                        style={{
                            fontFamily: 'Ubuntu-Regular',
                            fontSize: 25,
                            marginLeft: 15,
                            color: COLORS.gray,
                        }}
                    >
                        Journey In-progress:
                    </Text>

                </View>
                <Card
                    style={{
                        marginTop: 25,
                        height: 300,
                        width: SIZES.width - 35,
                        alignSelf: 'center',
                        borderRadius: 15,
                        elevation: 10
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
                                flex: 0.3,
                                // 
                                alignItems: 'center',
                                justifyContent: 'space-between'
                                // padding:15
                            }}
                        >
                            <Card
                                style={{
                                    height: 50, width: 50,
                                    borderRadius: 40,
                                    marginTop: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: COLORS.BluishBalance
                                }}
                            >

                                <Image
                                    source={icons.bus}
                                    style={{
                                        tintColor: COLORS.transparentBlack1,
                                        height: 25,
                                        width: 25
                                    }}
                                />
                            </Card>
                            <Card
                                style={{
                                    height: 140, width: 5,
                                    borderRadius: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: COLORS.transparentBlack1
                                }}
                            >

                            </Card>
                            <Card
                                style={{
                                    height: 50, width: 50,
                                    borderRadius: 40,
                                    marginBottom: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: COLORS.BluishBalance
                                }}
                            >

                                <Image
                                    source={icons.locationcenter}
                                    style={{
                                        tintColor: COLORS.transparentBlack1,
                                        height: 25,
                                        width: 25
                                    }}
                                />
                            </Card>
                        </View>
                        <View
                            style={{
                                flex: 0.7,
                                // borderWidth: 1,
                                // borderColor: COLORS.black,
                                justifyContent: 'space-between'
                                // height:'100%'
                            }}
                        >
                            <Card
                                style={{
                                    height: 50,
                                    width: "85%",
                                    marginTop: 15,
                                    marginLeft: 15,
                                    borderRadius: 40,
                                    backgroundColor: COLORS.BluishBalance,
                                    justifyContent: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'Ubuntu-Regular',
                                        fontSize: 15,
                                        marginLeft: 15,
                                        color: COLORS.gray,
                                        textAlign: 'center'
                                    }}
                                >
                                    Stop 1
                                </Text>
                            </Card>
                            <Card
                                style={{
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.BluishBalance,
                                    borderRadius: 10,
                                    width: '85%',
                                    height: 130,
                                    alignItems: 'center',
                                    marginLeft: 15
                                }}
                            >
                                <View
                                    style={{
                                        flex: 0.3,
                                    }}
                                >
                                    <Image
                                        style={{
                                            height: 25,
                                            width: 25,
                                            alignSelf: 'center',
                                            tintColor: COLORS.transparentBlack1

                                        }}
                                        source={icons.balance}
                                    />
                                </View>
                                <View
                                    style={{
                                        flex: 0.7,
                                        height:"100%",
                                        justifyContent:'center',
                                        alignItems:'center'
                                    }}
                                >
                                    <Text
                                        style={{
                                            flex: 0.3,
                                            fontFamily: 'Ubuntu-Bold',
                                            fontSize: 11,
                                            // marginLeft: 15,
                                            color: COLORS.gray,
                                            textAlign: 'center'
                                        }}
                                    >Total Amount: Rs. 100</Text>
                                    <Text
                                        style={{
                                            fontFamily: 'Ubuntu-Bold',
                                            fontSize: 11,
                                            // marginLeft: 15,
                                            color: COLORS.gray,
                                            textAlign: 'center'
                                        }}
                                    >Boarding Time: 25 min</Text>

                                </View>
                            </Card>
                            <Card
                                style={{
                                    height: 50,
                                    width: "85%",
                                    marginBottom: 15,
                                    marginLeft: 15,
                                    borderRadius: 40,
                                    backgroundColor: COLORS.BluishBalance,
                                    justifyContent: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'Ubuntu-Regular',
                                        fontSize: 15,
                                        marginLeft: 15,
                                        color: COLORS.gray,
                                        textAlign: 'center'
                                    }}
                                >
                                    Journey in progress
                                </Text>
                            </Card>
                        </View>

                    </View>
                </Card>

            </Animatable.View>
        </View>
    )
}

export default JourneyScreen

const styles = StyleSheet.create({})