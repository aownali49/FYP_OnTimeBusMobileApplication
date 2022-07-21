import { StyleSheet, Text, View, Button, Animated, Image, TouchableOpacity, TextInput, FlatList, Modal, Pressable } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import SlidingUpPanel from 'rn-sliding-up-panel';
import { LineDivider, Thumb, StopCard, NearbyStopsComponent } from '../components';
import SearchResultCard from '../components/SearchResultCard';
import GOOGLE_MAPS_API from './GoogleMapsAPI';
import MapViewDirections from 'react-native-maps-directions';
const Home = () => {

    let _panel = useRef(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isResultVisible, setResultVisible] = useState(false);
    const [dragging, setDragging] = useState(true);
    const _draggedValue = useRef(new Animated.Value(0)).current;
    const [selectedId, setSelectedId] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => { }, [selectedId])
    const _mapRef = useRef(null);

    const [routeStops, setRouteStops] = useState([
        {
            stopId: "1",
            stopName: "IIUI Iqra College",
            stopAddress: "H-10, Islamabad, ICT, Pakistan",
            distance: "",
            tta: "2 mins",
            stopCoordinates: {
                latitude: 33.659757,
                longitude: 73.038013,
            }
        },
        {
            stopId: "2",
            stopName: "Girls Hostel E,F,G Block",
            stopAddress: "H-10, Islamabad, ICT, Pakistan",
            distance: "",
            tta: "10 mins",
            stopCoordinates: {
                latitude: 33.659123,
                longitude: 73.034217,
            }
        },
        {
            stopId: "3",
            stopName: "Girl's Hostel Stop",
            stopAddress: "Imam Abu Hanifa Rd, H-10, Islamabad, ICT, Pakistan",
            distance: "",
            tta: "15 mins",
            stopCoordinates: {
                latitude: 33.657259,
                longitude: 73.031897,
            }
        },
        {
            stopId: "4",
            stopName: "Water Tank Stop",
            stopAddress: "Imam Abu Hanifa Rd, H-10, Islamabad, ICT, Pakistan",
            distance: "",
            tta: "25 mins",
            stopCoordinates: {
                latitude: 33.655689,
                longitude: 73.023094,
            }

        },
        {
            stopId: "5",
            stopName: "Boy's Hostel Stop",
            stopAddress: "H-10, Islamabad, Islamabad Capital Territory, Pakistan",
            distance: "",
            tta: "25 mins",
            stopCoordinates: {
                latitude: 33.658073,
                longitude: 73.022236,
            }
        }

    ]);
    const [stopsInfo, setStopInfo] = useState([
        {
            stopId: "1",
            stopName: "IIUI Iqra College",
            stopAddress: "H-10, Islamabad, ICT, Pakistan",
            distance: "",
            tta: "2 mins",
            stopCoordinates: {
                latitude: 33.659757,
                longitude: 73.038013,
            }
        },
        {
            stopId: "2",
            stopName: "Girls Hostel E,F,G Block",
            stopAddress: "H-10, Islamabad, ICT, Pakistan",
            distance: "",
            tta: "10 mins",
            stopCoordinates: {
                latitude: 33.659123,
                longitude: 73.034217,
            }
        },
        {
            stopId: "3",
            stopName: "Girl's Hostel Stop",
            stopAddress: "Imam-Hanifa Rd, H-10, ICT, Pakistan",
            distance: "",
            tta: "15 mins",
            stopCoordinates: {
                latitude: 33.657259,
                longitude: 73.031897,
            }
        },
        {
            stopId: "4",
            stopName: "Water Tank Stop",
            stopAddress: "Imam-Hanifa Rd, H-10, ICT, Pakistan",
            distance: "",
            tta: "25 mins",
            stopCoordinates: {
                latitude: 33.655689,
                longitude: 73.023094,
            }

        },
        {
            stopId: "5",
            stopName: "Boy's Hostel Stop",
            stopAddress: "H-10, ICT, Pakistan",
            distance: "",
            tta: "25 mins",
            stopCoordinates: {
                latitude: 33.658073,
                longitude: 73.022236,
            }
        }

    ])
    const [searchResult, setSearchResult] = useState([
        {
            stopId: 1,
            stopName: "Block A",
            address: "losar Sharfoo"
        },
        {
            stopId: 2,
            stopName: "Block A",
            address: "losar Sharfoo"
        },
    ])

    //Re-Renders when Modal Changes
    useEffect(() => {
        _draggedValue.addListener((valueObject) => {
            if (valueObject.value > SIZES.height) { setDragging(false); }
        })

        return () => {
            _draggedValue.removeAllListeners();
        }
    }, []);

    function renderSearchResultModal() {
        // const [coordinates] = useState([
        //     { latitude: 33.504013, longitude: 73.102201 },
        //     { latitude: 33.503686, longitude: 73.100291 }
        // ]);

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
        const { pickupCoords, dropoffCoords } = coordinates;

        const mapRef = useRef();
        return (
            <Modal
                transparent
                visible={isResultVisible}
                animationType='fade'
                onRequestClose={() => { setResultVisible(!isResultVisible) }}
                style={{
                    backgroundColor: COLORS.black
                }}
            >
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        height: "100%",
                        width: "100%",
                    }}

                >
                    <View
                        style={{
                            // flex: ,
                            height: SIZES.height / 3
                        }}

                    >
                        <MapView
                            ref={mapRef}
                            style={{ flex: 1 }}
                            scrollEnabled={false}
                            zoomEnabled={false}
                            rotateEnabled={false}
                            initialRegion={pickupCoords}

                        >
                            {
                                routeStops.map(stop => {
                                    return (
                                        <Marker
                                            coordinate={stop.stopCoordinates}
                                        />
                                    )
                                })
                            }
                            {
                                routeStops.map(stop => {
                                    return (
                                        <MapViewDirections
                                            origin={stop.stopCoordinates}
                                            destination={routeStops[routeStops.length - 1].stopCoordinates}
                                            apikey={GOOGLE_MAPS_API}
                                            strokeWidth={3}
                                            strokeColor={COLORS.black}
                                            optimizeWaypoints={true}
                                            onReady={result => {
                                                mapRef.current.fitToCoordinates(result.coordinates,
                                                    {
                                                        edgePadding: {
                                                            right: 100,
                                                            bottom: 20,
                                                            left: 100,
                                                            top: 20
                                                        }
                                                    })
                                            }}
                                        />
                                    )
                                })
                            }
                            {/* <MapViewDirections
                                origin={pickupCoords}
                                destination={dropoffCoords}
                                apikey={GOOGLE_MAPS_API}
                                strokeWidth={3}
                                strokeColor={COLORS.black}
                                optimizeWaypoints={true}
                                onReady={result => {
                                    mapRef.current.fitToCoordinates(result.coordinates,
                                        {
                                            edgePadding: {
                                                right: 50,
                                                bottom: 20,
                                                left: 50,
                                                top: 20
                                            }
                                        })
                                }}
                            /> */}

                            {/* <Polyline
                                coordinates={[{ latitude: 33.504013, longitude: 73.102201 }, { latitude: 33.503686, longitude: 73.100291 }]}
                                strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                                strokeColors={['#7F0000']}
                                strokeWidth={6}
                            /> */}
                        </MapView>
                    </View>
                    <View
                        style={{
                            flex: 2,
                            top: -15,
                            marginBottom: -15
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                // width:SIZES.width-SIZES.padding,
                                // height:SIZES.height,
                                backgroundColor: COLORS.mailaWhite,
                                borderTopStartRadius: 22,
                                borderTopEndRadius: 22,
                                // borderColor: COLORS.black,
                                // borderWidth: 1,
                            }}
                        >
                            <View
                                style={{
                                    position: "absolute",
                                    width: SIZES.width - SIZES.padding,
                                    // height: 10,
                                    alignSelf: 'center',
                                    marginTop: 20,
                                    // borderColor: COLORS.black,
                                    // borderWidth: 1,
                                }}
                            >
                                <Image
                                    source={icons.bus3}
                                    resizeMode="cover"
                                    style={{
                                        width: 40,
                                        height: 40
                                    }}
                                />
                                <Text
                                    style={{
                                        position: 'absolute',
                                        top: 40,
                                        fontSize: 25,
                                        color: COLORS.black,
                                        fontFamily: "Ubuntu-Regular"
                                    }}
                                >
                                    {routeStops[routeStops.length - 1].stopName}
                                </Text>
                                <Text
                                    style={{
                                        position: 'absolute',
                                        top: 70,
                                        left: 2,
                                        fontSize: 14,
                                        color: '#9B9999',
                                        fontFamily: "Ubuntu-Regular"
                                    }}
                                >
                                    From <Text style={{ color: '#535353', fontFamily: "Ubuntu-Regular" }}>current location</Text>
                                </Text>
                                <View>
                                    <Image
                                        source={icons.online}
                                        resizeMode="cover"
                                        style={{
                                            width: 40,
                                            height: 40,
                                            position: 'absolute',
                                            right: 70,
                                            top: -20,

                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            position: 'absolute',
                                            right: 14,
                                            top: -10,
                                            color: '#4FCF88',
                                            fontFamily: "Ubuntu-Regular"
                                        }}
                                    >
                                        On-time
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            position: 'absolute',
                                            right: 4,
                                            top: 20,
                                            color: COLORS.black,
                                            fontFamily: "Ubuntu-Regular"
                                        }}
                                    >
                                        3 stops • <Text style={{ color: '#4FCF88', fontFamily: "Ubuntu-Regular" }} >25 mins</Text>
                                    </Text>
                                </View>
                            </View>
                            <View style={
                                {
                                    position: 'absolute',
                                    top: 120,
                                    width: SIZES.width - SIZES.padding,
                                    height: 2,
                                    alignSelf: 'center',
                                    backgroundColor: '#B6B6B6',
                                    borderRadius: 2,
                                }
                            } />
                            <FlatList
                                style={{
                                    top: 125,
                                    marginBottom: 150
                                    // bottom:
                                }}
                                data={routeStops}
                                keyExtractor={item => item.id}
                                showsVerticalScrollIndicator={false}
                                ItemSeparatorComponent={() => {
                                    return (
                                        <LineDivider />
                                    )
                                }}
                                renderItem={({ item, index }) => {
                                    return (
                                        <StopCard data={item} destination={index == routeStops.length - 1} />
                                    )
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal >
        )
    }

    function renderMap() {
        return (

            <View style={styles.MAP}>
                <RenderCenterLocation />
                <MapView
                    ref={_mapRef}
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 33.504013,
                        longitude: 73.102201,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >

                    {
                        stopsInfo.map(item => {
                            return (
                                <Marker
                                    coordinate={item.stopCoordinates}
                                />
                            )
                        })
                    }
                    {/* <Marker
                        coordinate={{ latitude: 33.504013, longitude: 73.102201 }}

                    />
                    <Marker
                        coordinate={{ latitude: 33.503686, longitude: 73.100291 }}

                    />
                    <Marker
                        coordinate={{ latitude: 33.505569, longitude: 73.092765 }}

                    /> */}

                </MapView>
            </View>
        )
    }

    function renderSwipeUpModal() {

        return (
            <View style={styles.MODAL}>
                <SlidingUpPanel
                    ref={c => { _panel = c; }}
                    allowDragging={dragging}
                    draggableRange={{
                        top: SIZES.height / 2,
                        bottom: SIZES.height / 3,
                    }}
                    animatedValue={_draggedValue}
                    snappingPoints={[SIZES.height / 2]}
                    showBackdrop={false}
                    height={SIZES.height / 2 }
                    friction={0.7}
                    onBottomReached={() => { setDragging(true) }}
                >
                    <View style={{
                        height: '100%', backgroundColor: COLORS.stopModalGray, borderTopLeftRadius: SIZES.radius * 2,
                        borderTopRightRadius: SIZES.radius * 2, paddingBottom: 20
                    }}>
                        {/* List Header: Current Address */}
                        <View style={{
                            // borderColor:COLORS.black,
                            // borderWidth:1,
                            // // top:15,
                            height: 60,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Image
                                source={icons.pinpoint}
                                style={{
                                    position: 'absolute',
                                    left: 10,
                                    width: 25,
                                    height: 25,
                                    // borderColor:COLORS.black,
                                    // borderWidth: 1,
                                }}
                            />
                            <Text style={{
                                fontSize: 20,
                                color: COLORS.black,
                                marginLeft: 10,
                                fontFamily: "Ubuntu-Regular"
                                // borderColor:COLORS.black,
                                // borderWidth: 1,
                            }}
                            >
                                657, Rafi Block, Bahria Phase VIII
                            </Text>
                        </View>
                        {/* List of Nearyby Stops */}
                        <FlatList
                            style={{ flex: 1 }}
                            contentContainerStyle={{ marginBottom: 10 }}
                            data={stopsInfo}
                            keyExtractor={item => item.id}
                            extraData={selectedId}
                            refreshing={refreshing}
                            onRefresh={() => {
                                setRefreshing(true);
                                setTimeout(() => {
                                    setRefreshing(false);
                                }, 2000)
                            }}
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={() => {
                                return (
                                    <View>
                                        <Text
                                            style={{
                                                // borderColor:COLORS.black,
                                                // borderWidth:1,
                                                color: COLORS.black,
                                                paddingLeft: 15,
                                                fontSize: 17,
                                                fontWeight: '600'
                                            }}
                                        >
                                            Near by Stops:
                                        </Text>
                                    </View>

                                )
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <Pressable
                                        // animationType={null}
                                        onPress={() => {
                                            selectedId === item.stopId ? setSelectedId(null) : setSelectedId(item.stopId)
                                            _mapRef.current.animateToRegion({
                                                ...item.stopCoordinates,
                                                latitudeDelta: 0.004864195844303443,
                                                longitudeDelta: 0.0040142817690068,
                                            }, 350)
                                        }
                                        }

                                    >
                                        <NearbyStopsComponent data={{ item, index }} highlighted={selectedId} />
                                    </Pressable>
                                )
                            }}
                        />

                    </View>


                </SlidingUpPanel>
            </View>
        )
    }
    function renderSearchBar() {
        return (
            <View style={styles.SEARCHBAR}>
                <TouchableOpacity style={styles.SEARCHBARIN}
                    onPress={() => {
                        setModalVisible(!isModalVisible);
                        console.warn("search pressed")
                    }}
                >

                    <View style={{
                        width: 40,
                        height: 40,
                        backgroundColor: COLORS.black,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image

                            source={icons.search}
                            resizeMode="cover"
                            style={{ width: 25, height: 25, tintColor: COLORS.white }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            height: "100%",
                        }}
                    >
                        <TextInput
                            placeholder='Search'
                            placeholderTextColor={COLORS.gray}
                            style={{
                                color: COLORS.black
                            }}
                        />
                    </View>

                </TouchableOpacity>
            </View>
        )
    }
    function RenderCenterLocation() {

        return (
            <TouchableOpacity
                onPress={() => {
                    console.warn("Center Location")
                }}
                style={{
                    position: "absolute",
                    right: 25,
                    bottom: 50,
                    zIndex: 1
                }}
            >
                <Image
                    style={{
                        height: 35,
                        width: 35,
                    }}
                    source={icons.locationcenter}
                ></Image>
            </TouchableOpacity>
        )
    }
    function renderSearchModal() {
        return (
            <Modal
                transparent
                visible={isModalVisible}
                animationType='slide'
                onRequestClose={() => { setModalVisible(!isModalVisible) }}
            >
                <View style={{
                    flex: 0.3,
                    backgroundColor: "rgba(0,0,0,0.8)"
                }}>
                    <View
                        style={{
                            width: "100%",
                            height: 30,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => { setModalVisible(!isModalVisible) }}
                        >
                            <Image
                                style={{
                                    position: 'absolute',
                                    height: 25,
                                    width: 25,
                                    left: 15,
                                    top: 10,
                                    tintColor: COLORS.white,
                                }}
                                source={icons.back}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            paddingTop: 50,
                            alignItems: 'center',
                            // borderColor: COLORS.black,
                            // borderWidth: 1
                        }}
                    >
                        <View
                            style={
                                {
                                    width: '95%',
                                    height: 50,
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.white,
                                    marginBottom: 5,
                                    borderRadius: SIZES.radius
                                }

                            }
                        >
                            <View
                                style={{
                                    flex: 2,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <View
                                    style={{
                                        padding: SIZES.base,
                                        backgroundColor: COLORS.lightGray,
                                        borderRadius: 25
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: 20,
                                            backgroundColor: COLORS.blue
                                        }}
                                    />
                                </View>

                            </View>

                            <TextInput
                                placeholder='From'
                                placeholderTextColor={COLORS.gray}
                                style={
                                    {
                                        flex: 10,
                                        paddingHorizontal: SIZES.base,
                                    }

                                }
                            />

                        </View>
                        <View
                            style={
                                {
                                    width: "95%",
                                    height: 50,
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.white,
                                    borderRadius: SIZES.radius
                                }

                            }
                        >
                            <View
                                style={{
                                    flex: 2,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <View
                                    style={{
                                        padding: 5,
                                        borderRadius: SIZES.radius,
                                        backgroundColor: COLORS.blue
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: COLORS.white
                                        }}
                                    />
                                </View>

                            </View>
                            <TextInput
                                placeholder='To'

                                placeholderTextColor={COLORS.gray}
                                style={
                                    {
                                        flex: 10,
                                        paddingHorizontal: SIZES.base,
                                    }
                                }
                            />
                        </View>
                        <View
                            style={{
                                width: 4,
                                height: 45,
                                backgroundColor: COLORS.blue,
                                position: 'absolute',
                                top: 80,
                                left: 39.5,
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            height: 30,
                            marginTop: SIZES.radius,
                            alignItems: 'flex-end',

                        }}
                    >
                        <Image
                            style={{
                                height: 25,
                                width: 25,
                                tintColor: COLORS.white,
                                marginRight: SIZES.padding
                            }}
                            source={icons.go}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 0.7,
                    backgroundColor: COLORS.gray
                }}>
                    <FlatList
                        data={searchResult}
                        renderItem={({ item, index }) => {
                            return (
                                <SearchResultCard handlePress={() => { setResultVisible(!isResultVisible) }} />
                            )
                        }}
                    >
                    </FlatList>

                </View>
            </Modal>
        )
    }

    return (
        <View style={styles.HOME}>
            {renderSearchResultModal()}
            {renderMap()}
            {renderSwipeUpModal()}
            {renderSearchBar()}
            {renderSearchModal()}
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    SEARCHBAR:
    {
        height: 50,
        position: 'absolute',
        top: SIZES.padding * 2,
        left: SIZES.padding,
        right: SIZES.padding,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        paddingHorizontal: SIZES.padding * .25,

    },

    SEARCHBARIN: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    HOME: {
        flex: 1,
        backgroundColor: COLORS.gray
    },

    MAP: {
        flex: 0.7,
    },
    MODAL: {
        flex: 0.3,
    },
})