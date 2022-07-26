import { StyleSheet, Text, View, Button, Animated, Image, TouchableOpacity, TextInput, FlatList, Modal, Pressable, ActivityIndicator } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import SlidingUpPanel from 'rn-sliding-up-panel';
import { LineDivider, Thumb, StopCard, NearbyStopsComponent } from '../components';
import SearchResultCard from '../components/SearchResultCard';
import GOOGLE_MAPS_API from './GoogleMapsAPI';
var axios = require('axios');


import MapViewDirections from 'react-native-maps-directions';
import { Card } from 'react-native-shadow-cards';
const Home = () => {

    let _panel = useRef(null);
    const [sourceInput, setSource] = useState("");
    const [destinationInput, setDestination] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [isResultVisible, setResultVisible] = useState(false);
    const [dragging, setDragging] = useState(true);
    const _draggedValue = useRef(new Animated.Value(0)).current;
    const [selectedId, setSelectedId] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [searching, setSearching] = useState(false);
    // const [sourceAddress, setSourceAddress] = useState("");
    useEffect(() => { }, [selectedId])
    const _mapRef = useRef(null);

    //Total Stops List
    const [stopsInfo, setStopInfo] = useState([
        {
            stopId: 1,
            stopName: "Hostel E,F,G",
            stopAddress: "H-10, Islamabad, ICT, Pakistan",
            distance: "",
            tta: "2 mins",
            stopCoordinates: {
                latitude: 33.659123,
                longitude: 73.034217,
            }
        },
        {
            stopId: 2,
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
            stopId: 3,
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
            stopId: 4,
            stopName: "Zero Point IIUI",
            stopAddress: "H-10, ICT, Pakistan",
            distance: "",
            tta: "25 mins",
            stopCoordinates: {
                latitude: 33.657067,
                longitude: 73.022226,
            }
        },
        {
            stopId: 5,
            stopName: "Hostel 5,6 Stop",
            stopAddress: "H-10, Islamabad, ICT, Pakistan",
            distance: "",
            tta: "10 mins",
            stopCoordinates: {
                latitude: 33.660778,
                longitude: 73.021422,
            }
        },
        {
            stopId: 6,
            stopName: "IIUI Security Camp",
            stopAddress: "H-10, Islamabad, ICT, Pakistan",
            distance: "",
            tta: "10 mins",
            stopCoordinates: {
                latitude: 33.659123,
                longitude: 73.034217,
            }
        },
        {
            stopId: 7,
            stopName: "FMS Stop",
            stopAddress: "H-10, Islamabad, ICT, Pakistan",
            distance: "",
            tta: "10 mins",
            stopCoordinates: {
                latitude: 33.659123,
                longitude: 73.034217,
            }
        },
        {
            stopId: 8,
            stopName: "Admin Stop",
            stopAddress: "H-10, Islamabad, ICT, Pakistan",
            distance: "",
            tta: "10 mins",
            stopCoordinates: {
                latitude: 33.662854,
                longitude: 73.031017,
            }
        }
    ])

    // Route/Journey
    const [searchResult, setSearchResult] = useState([]);

    //Stops in the Route
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
        }
    ]);

    //Re-Renders when Modal Changes
    useEffect(() => {
        _draggedValue.addListener((valueObject) => {
            if (valueObject.value > SIZES.height) { setDragging(false); }
        })
        return () => {
            _draggedValue.removeAllListeners();
        }
    }, []);

    function buildRoute(oSrc, oDest) {
        var routeList = [];
        if (oSrc && oDest) {
            let srcIndex = stopsInfo.findIndex((object) => {
                return object.stopId === oSrc.stopId;
            });
            let destIndex = stopsInfo.findIndex((object) => {
                return object.stopId === oDest.stopId;
            });
            console.log("Source Index is ", srcIndex);
            console.log("Destination Index is ", destIndex);
            setSearching(false);
            if (srcIndex < destIndex) {
                for (let index = 0; index <= destIndex; index++) {
                    routeList.push(stopsInfo[index]);
                    // console.warn(stopsInfo[index].stopName);
                }
                setRouteStops(routeList);
                setSearchResult([routeList]);
            }
            else if (srcIndex > destIndex) {
                for (let index = srcIndex; index < stopsInfo.length; index++) {
                    routeList.push(stopsInfo[index]);
                }
                for (let index = 0; index <= destIndex; index++) {
                    routeList.push(stopsInfo[index]);
                }
                console.log("Route List:", routeList);
                setRouteStops(routeList);
                setSearchResult([routeList]);
            }
        }
        else {
            setSearching(false);
            if (!oSrc) {
                setSearchResult({ error: 'Invalid source address, please enter a valid address.' });
                console.warn("No Source Address found");
            }
            else if (!oDest) {
                setSearchResult({ error: 'Invalid destination address, please enter a valid address.' });
                console.warn("No Destination Address found");

            }
            else {
                setSearchResult({ error: "Unknown Error" });
            }
        }
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
                        width: 30,
                        height: 30,
                        backgroundColor: COLORS.black,
                        borderRadius: 20,
                        marginLeft: 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image
                            source={icons.search}
                            resizeMode="cover"
                            style={{ width: 20, height: 20, tintColor: COLORS.white }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            height: "100%",
                            paddingLeft: 10,
                            justifyContent: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: '#808080',
                            }}
                        >Search</Text>
                    </View>

                </TouchableOpacity>
            </View>
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
                    height={SIZES.height / 2}
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
        const handleSearchRoute = async () => {
            // The data goes into request and searches all the stops and lists the stops along with their distance to the 
            // source address. It then takes that list and sorts it based on the lowest distance of the source. 
            // This function then takes the top of the array element as its source and the same goes for the the destination 
            // provided. It then searches up the database based on the hardcoded choices of each route from the database to 
            // every other route in the database.

            // 1. Constructing list:
            setSearching(true);
            let sourceList = [];
            let destinationList = [];
            let orig = {
                address: sourceInput.replace(/ /g, '%20'),
                coordinates: {
                    latitude: -1,
                    longitude: -1
                }
            };
            let destinaton = {
                address: destinationInput.replace(/ /g, '%20'),
                coordinates: {
                    latitude: -1,
                    longitude: -1
                }
            };
            var configOrig = {
                method: 'get',
                url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + orig.address + '&key=' + GOOGLE_MAPS_API,
                headers: {}
            };
            var configDest = {
                method: 'get',
                url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + destinaton.address + '&key=' + GOOGLE_MAPS_API,
                headers: {}
            };
            //Getting Coords from source Address
            axios(configOrig)
                .then(function (response) {
                    orig.coordinates.latitude = response.data.results[0].geometry.location.lat ?? null;
                    orig.coordinates.longitude = response.data.results[0].geometry.location.lng ?? null;
                    // console.log("Source Coordinates gotten:", orig.coordinates);
                    stopsInfo.forEach(stop => {
                        // console.log("Possible Source stop is:",stop.stopName);
                        let dest = stop.stopAddress.replace(/,/g, '');
                        dest = dest.replace(/ /g, '&');
                        console.log(dest);
                        var config = {
                            method: 'get',
                            url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + orig.coordinates.latitude + '%2C' + orig.coordinates.longitude + '&destinations=' + stop.stopCoordinates.latitude + '%2C' + stop.stopCoordinates.longitude + '&key=' + GOOGLE_MAPS_API,
                            headers: {}
                        };
                        console.log("URL=>", config.url);

                        axios(config)
                            .then(function (response) {
                                sourceList.push({
                                    ...stop,
                                    distance: JSON.stringify(response.data.rows[0].elements[0].distance.value)
                                })
                                // console.log(JSON.stringify(response.data.rows[0].elements[0].distance.value));
                                // console.log("The Updated stops Information is:", JSON.stringify(sourceList.sort(function (a, b) { return a.distance - b.distance })));
                                // setSearchResult(sourceList.sort(function (a, b) { return a.distance - b.distance }));
                                // console.log("Source List ==>",JSON.stringify(response.data.rows[0].elements[0].distance.value));
                                sourceList = sourceList.sort(function (a, b) { return a.distance - b.distance });
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    });
                })
                .catch(function (error) {
                    console.log(error);
                })
            //Getting Coords from Destination address
            axios(configDest)
                .then(function (response) {
                    destinaton.coordinates.latitude = response.data.results[0].geometry.location.lat;
                    destinaton.coordinates.longitude = response.data.results[0].geometry.location.lng;
                    // console.log("Destination Coordinates gotten:", destinaton.coordinates);
                    stopsInfo.forEach(stop => {
                        let dest = stop.stopAddress.replace(/,/g, '');
                        dest = dest.replace(/ /g, '&');
                        console.log(dest);
                        var config = {
                            method: 'get',
                            url: 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + destinaton.coordinates.latitude + '%2C' + destinaton.coordinates.longitude + '&destinations=' + stop.stopCoordinates.latitude + '%2C' + stop.stopCoordinates.longitude + '&key=' + GOOGLE_MAPS_API,
                            headers: {}
                        };
                        axios(config)
                            .then(function (response) {
                                destinationList.push({
                                    ...stop,
                                    distance: JSON.stringify(response.data.rows[0].elements[0].distance.value)
                                })
                                // console.log(JSON.stringify(response.data.rows[0].elements[0].distance.value));
                                // console.log("The Destination Information is:", JSON.stringify(destinationList.sort(function (a, b) { return a.distance - b.distance })));
                                // setSearchResult(destinationList.sort(function (a, b) { return a.distance - b.distance }));
                                // console.warn("Destination List==>", JSON.stringify(destinationList), '\n');
                                destinationList = destinationList.sort(function (a, b) { return a.distance - b.distance });
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    });
                })
                .catch(function (error) {
                    console.log(error);
                })
            setTimeout(() => {
                // console.log("Source list is", sourceList[0].stopName);
                // console.log("Destination list is", destinationList[0].stopName);
                buildRoute(sourceList[0], destinationList[0]);
            }, 4000)
        }
        return (
            <Modal
                transparent
                visible={isModalVisible}
                animationType='slide'
                onRequestClose={() => { setModalVisible(!isModalVisible) }}
            >
                <View style={{
                    // borderColor: COLORS.black,
                    // borderWidth: 1,
                    flex: 0.3,
                    backgroundColor: "rgba(0,0,0,0.8)"
                }}>
                    <View
                        style={{
                            height: 30,
                            marginLeft: 10,
                            marginTop: 10,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => { setModalVisible(!isModalVisible) }}
                        >
                            <Image
                                style={{
                                    height: 25,
                                    width: 25,
                                    tintColor: COLORS.white,
                                }}
                                source={icons.back}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            marginTop: 20,
                            padding: 5,
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
                                value={sourceInput}
                                onChangeText={(text) => {
                                    setSource(text)
                                    // console.log("The source is",source);
                                }}
                                placeholder='From'
                                placeholderTextColor={COLORS.gray}
                                style={
                                    {
                                        color: COLORS.gray,
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
                                value={destinationInput}
                                onChangeText={(text) => {
                                    setDestination(text);
                                    // console.log("The destination is",destination);
                                }}
                                placeholder='To'
                                placeholderTextColor={COLORS.gray}
                                style={
                                    {
                                        color: COLORS.gray,
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
                                top: 35,
                                left: 38.25,
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            handleSearchRoute()
                        }}
                        style={{
                            height: 30,
                            alignItems: 'flex-end',
                            marginTop: 3
                            // borderColor: COLORS.black,
                            // borderWidth: 1
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
                    backgroundColor: COLORS.gray,
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignContent: 'center'
                }}>
                    {
                        searching &&
                        <View>
                            <View
                                style={{
                                    // top: 0,
                                    height: 100,
                                    width: 100,
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                }}>
                                <ActivityIndicator size='large' />
                            </View>
                        </View>
                    }

                    {
                        !searching &&
                        <FlatList
                            data={searchResult}
                            keyExtractor={route => route}
                            renderItem={({ route, index }) => {
                                return (
                                    <SearchResultCard handlePress={() => { setResultVisible(!isResultVisible) }} />
                                )
                            }}
                        />
                    }
                    {
                        !searching && searchResult?.error &&
                        <Card
                            style={{
                                height: 100,
                                borderRadius: 20,
                                // justifyContent: 'center',
                                top: -300,
                                flexDirection: 'row',
                                alignSelf: 'center'
                            }}
                        >
                            <View
                                style={{
                                    flex: 0.3,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: COLORS.lightGray,
                                        borderRadius: 50,
                                        // margin:10,
                                        height:65,
                                        width: 65,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Image source={icons.notFound}
                                        style={{
                                            height: 30,
                                            width: 30,
                                            tintColor: COLORS.black,
                                            // fontWeight:'900'
                                        }}
                                    />
                                </View>

                            </View>
                            <Text
                                style={{
                                    flex: 0.7,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    color: COLORS.black,
                                    fontFamily: 'Ubuntu-Bold',
                                    fontSize: 15,
                                    // borderWidth: 1,
                                    // borderColor: COLORS.black,
                                }}
                            >{searchResult?.error}</Text>
                        </Card>
                    }
                </View>
            </Modal >
        )
    }
    function renderSearchResultModal() {
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
                                            destination={routeStops[routeStops?.length - 1].stopCoordinates}
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
                                backgroundColor: COLORS.mailaWhite,
                                borderTopStartRadius: 22,
                                borderTopEndRadius: 22,
                            }}
                        >
                            <View
                                style={{
                                    position: "absolute",
                                    width: SIZES.width - SIZES.padding,
                                    alignSelf: 'center',
                                    marginTop: 20,
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
                                    {routeStops[routeStops?.length - 1].stopName}
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
        borderRadius: 25,
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
        zIndex: 2
    },
})