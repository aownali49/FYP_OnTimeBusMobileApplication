import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, FlatList, Modal, Pressable, ActivityIndicator } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, AnimatedRegion } from 'react-native-maps'

import { COLORS, FONTS, icons, SIZES, images } from '../constants'
import { LineDivider, StopCard } from '../components';
import GOOGLE_MAPS_API from './GoogleMapsAPI';
import { Card } from 'react-native-shadow-cards'
import { useIsFocused } from '@react-navigation/native'
import Moment from 'moment';
import { PermissionsAndroid } from 'react-native';
import Geolocation from "react-native-geolocation-service";
import { auth, db, realdb, firebase } from '../firebase';
import { Dimensions } from "react-native";

var axios = require('axios');

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const JourneyScreen = ({ route, navigation }) => {
    Moment.locale('en');
    const isFocused = useIsFocused();

    const [journey, setJourney] = useState([])
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
    const [journeyInProgress, setJourneyInProgress] = useState(false);
    const [journeyCompleted, setJourneyCompleted] = useState(false);
    const [userData, setUserData] = useState({});
    const [cardNumber, setCardNumber] = useState("-1");
    const [journeyInfo, setJourneyInfo] = useState({
        amount: -1,
        destStopId: -1,
        destStopName: "",
        origStopId: -1,
        origStopName: "",
        transactionId: -1,
        boardingTime: "",
        disembarkingTime: "",
    });
    // const [stopsInfo, setStopInfo] = useState([])
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
                latitude: 33.662285,
                longitude: 73.019017,
            }
        },
        {
            stopId: 7,
            stopName: "FMS Stop",
            stopAddress: "H-10, Islamabad, ICT, Pakistan",
            distance: "",
            tta: "10 mins",
            stopCoordinates: {
                latitude: 33.663740,
                longitude: 73.024782,
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

    function calculateFare(orig, dest) {
        let stopCount = 0;
        let amount = 0;
        console.log("Origin Stop ID", orig);
        console.log("Destination Stop Id", dest);
        if (dest > orig) {
            stopCount = dest - orig;
        }
        else if (dest < orig) {
            for (let index = orig - 1; index < stopsInfo.length; index++) {
                stopCount++;
            }
            for (let index = 0; index < dest - 1; index++) {
                stopCount++;
            }
        }
        else {
            stopCount = 0;
        }
        amount = stopCount * 30;
        return amount;
    }
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0,
        longitude: 0,
        coordinates: [],
    })
    async function requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Example App',
                    'message': 'Example App access to your location '
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location")
            } else {
                console.log("location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
    useEffect(() => {
        requestLocationPermission()
        Geolocation.getCurrentPosition(
            (position) => {
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
                console.log("Latest Location==>", currentLocation);
            },
            (error) => {
                console.warn(error.message.toString());
            },
            {
                showLocationDialog: true,
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 0
            }
        );
    }, [])

    useEffect(() => {
        var docRef = db().collection("users").doc(auth().currentUser.uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
                // console.log("User Information", doc.data());
                setUserData(doc.data());
                setCardNumber(doc.data().cardNumber + "" ?? "");
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, [isFocused])

    // Live Journey Updates Listener
    useEffect(() => {
        console.log("Running live fetch (Journey)");
        const onValueChange = realdb()
            .ref(cardNumber)
            .on('child_added', (snapshot) => {
                console.log(snapshot.key, ":", snapshot.val());
                setJourney((p) => { return { ...p, [snapshot.key]: snapshot.val() } })
            });
        // Stop listening for updates when no longer required
        return () => realdb().ref(cardNumber).off('child_added', onValueChange);
    }, [isFocused]);

    useEffect(() => {
        console.log("Journey is invoked", journey);
        if (journey["Source"]) {
            console.log("Journey exists");
            setJourneyInProgress(true);
            setJourneyInfo({
                ...journeyInfo,
                date: Moment(new Date()).format('DD MMM YY'),
                boardingTime: Moment(new Date()).format('hh:mm'),
                origStopId: journey["Source"],
                origStopName: stopsInfo[stopsInfo.findIndex((item) => { return item.stopId == journey["Source"] })].stopName
            })
        }
        if (journey["Destination"]) {
            console.log("Journey is completed");
            setJourneyCompleted(true);
            setJourneyInfo({
                ...journeyInfo,
                date: Moment(new Date()).format('DD MMM YY'),
                boardingTime: Moment(new Date()).format('hh:mm'),
                destStopId: journey["Destination"],
                destStopName: stopsInfo[stopsInfo.findIndex((item) => { return item.stopId == journey["Destination"] })].stopName,
                amount: calculateFare(journey["Source"], journey["Destination"])
            })
        }
    }, [journey])

    // useEffect(() => {
    // console.log("Running live fetch (Home)");
    // const onValueChange = realdb().ref('/Journey/' + cardNumber);
    // onValueChange.on('child_added', snapshot => {
    //     console.log('Journey Event: ', snapshot.val());
    //     setJourney((p) => { return [...p, snapshot.val()] });
    // });
    // Stop listening for updates when no longer required
    // return () => realdb().ref(`/Journey/` + cardNumber).off('child_added', onValueChange);
    // }, []);

    // useEffect(() => {
    //     turnOnLiveUpdates();
    // }, [isFocused])

    // function turnOnLiveUpdates() {
    //     console.log("Running live fetch (Journey)");
    //     const onValueChange = realdb()
    //         .ref('/Journey/' + cardNumber)
    //         .once('value')
    //         .then((snapshot) => {
    //             console.log('Live updates: ', snapshot.val());
    //             setJourney((p) => { return [...p, snapshot.val()] });
    //         });

    //     // Stop listening for updates when no longer required
    //     // return () => realdb().ref('/Journey/' + cardNumber).off('child_added', onValueChange);
    // }


    //If Value is to be changed using refresh approach
    // useEffect(() => {
    //     console.log("Starting");
    //     const onValueChange = realdb()
    //         .ref('1941094527')
    //         .once('value')
    //         .then((snapshot) => {
    //             console.log('Live updates: ', snapshot.val());
    //             // setJourney((p) => { return [...p, snapshot.val()] });
    //         });
    // }, [isFocused])



    //Journey State Updation onboard
    // useEffect(() => {
    //     console.log("Set journey invoked (Journey Screen): ", journey)
    //     if (journey.length <= 1) {
    //         setJourneyInProgress(false);
    //     }
    //     else if (journey.length === 3) {
    //         setJourneyInProgress(true);
    //         setJourneyInfo({
    //             ...journeyInfo,
    //             date: Moment(new Date()).format('DD MMM YY'),
    //             boardingTime: Moment(new Date()).format('hh:mm'),
    //             origStopId: journey[1],
    //             origStopName: stopsInfo[stopsInfo.findIndex((item) => { return item.stopId == journey[1] })].stopName
    //         })
    //     }
    //     else if (journey.length > 3) {
    //         setJourneyInProgress(true);
    //         setJourneyCompleted(true);
    //         // setJourneyInfo({
    //         //     ...journeyInfo,
    //         //     destStopId: journey[3],
    //         //     destStopName: stopsInfo[stopsInfo.findIndex((item) => { return item.stopId == journey[3] })].stopName,
    //         //     amount: calculateFare(journey[1],journey[3])
    //         // })
    //         setJourneyInfo({
    //             ...journeyInfo,
    //             destStopId: 3,
    //             disembarkingTime: Moment(new Date()).format('hh:mm'),
    //             destStopName: stopsInfo[3].stopName,
    //             amount: calculateFare(1, 3)
    //         })


    //         console.log("journey Information", journeyInfo);
    //         console.log(" Incoming journey Information", journey);
    //     }
    // }, [journey])

    //Save Journey InformationboardingTime

    function handleSaveJourney() {
        console.log("Inside Save journey", journeyInfo);
        var docRef = db().collection("users").doc(auth().currentUser.uid);
        docRef.update({
            transactionInfo: db.FieldValue.arrayUnion(journeyInfo),
            amount: (userData.amount - journeyInfo.amount)
        })
            .then(() => {
                setJourneyInfo({
                    amount: -1,
                    destStopId: -1,
                    destStopName: "",
                    origStopId: -1,
                    origStopName: "",
                    transactionId: "",
                    boardingTime: "",
                    disembarkingTime: ""
                });
                setJourney({});
                setJourneyCompleted(false);
                setJourneyInProgress(false);
                realdb()
                    .ref(cardNumber + '/Source').remove(() => {
                        console.log("Live Journey Instace Removed");
                    })
                    .catch(error => { console.log("Error Removing live Source instance", error); })

                realdb()
                    .ref(cardNumber + '/Destination').remove(() => {
                        console.log("Live Journey Instace Removed");
                    })
                    .catch(error => { console.log("Error Removing live Destination instance", error); })

                realdb()
                    .ref(cardNumber + '/Amount')
                    .set(userData.amount - journeyInfo.amount)
                    .catch(error => { console.log("Error updating live Amount instance", error); })

                db()
                    .collection('card')
                    .doc(cardNumber)
                    .update({
                        amount: (userData.amount - journeyInfo.amount)
                    })
            })
            .catch((error) => {
                console.log("Journey added failed", error);
            })
        console.log("Journey Details", journeyInfo);
    }

    const mapRef = useRef();
    const markerRef = useRef()
    const [state, setState] = useState({
        curLoc: {
            latitude: 30.7046,
            longitude: 77.1025,
        },
        destinationCords: {},
        isLoading: false,
        coordinate: new AnimatedRegion({
            latitude: 33.659123,
            longitude: 73.034217,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }),
        time: 0,
        distance: 0,
        heading: 0

    })

    const { curLoc, time, distance, destinationCords, isLoading, coordinate, heading } = state
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    if (journeyInProgress) {
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
                        <Marker.Animated
                            ref={markerRef}
                            coordinate={currentLocation}
                        >
                            <Image
                                source={icons.shuttle}
                                style={{
                                    width: 40,
                                    height: 40,
                                    transform: [{ rotate: `${heading}deg` }]
                                }}
                                resizeMode="contain"
                            />
                        </Marker.Animated>
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
                            marginTop: 10,
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
                            {journeyCompleted ? "Journey Completed" : " Journey In Progess"}
                        </Text>

                    </View>
                    <Card
                        style={{
                            marginTop: 10,
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
                                        {journeyInfo.origStopName}
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
                                            height: "100%",
                                            justifyContent: 'center',
                                            alignItems: 'center'
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
                                        >Total Amount: Rs. {journeyInfo.amount == -1 ? "Journey in progress" : journeyInfo.amount}</Text>
                                        <Text
                                            style={{
                                                fontFamily: 'Ubuntu-Bold',
                                                fontSize: 11,
                                                // marginLeft: 15,
                                                color: COLORS.gray,
                                                textAlign: 'center'
                                            }}
                                        >Boarding Time:{journeyInfo.boardingTime}</Text>

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
                                        {journeyCompleted ? journeyInfo.destStopName : "Journey In Progess"}
                                        {/* Journey in progress */}
                                    </Text>
                                </Card>
                            </View>

                        </View>
                    </Card>
                    {
                        journeyCompleted === true &&
                        <View>
                            <TouchableOpacity
                                onPress={() => handleSaveJourney()}
                                style={styles.LoginButtonStyle}
                            >
                                <Text
                                    style={styles.ButtonTextStyle}
                                >Save Journey</Text>
                            </TouchableOpacity>
                        </View>
                    }





                </Animatable.View>
            </View>
        )
    }
    else return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.BluishBalance
            }}

        >
            <Animatable.View
                animation='fadeInUpBig'
            >
                <Card
                    style={{
                        height: 400,
                        width: 300,
                        marginTop: 100,
                        borderRadius: 20,
                        alignSelf: 'center',
                        flexDirection: 'column',
                        elevation: 10,
                    }}
                >
                    <View
                        style={{
                            flex: 0.2,
                            justifyContent: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "Ubuntu-Bold",
                                fontSize: 25,
                                color: COLORS.gray,
                                textAlign: 'center'
                            }}
                        >No Journey in Progress</Text>
                    </View>
                    {/* <View
                            style={{
                                flex: 0.5,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            
    
    
                        </View> */}
                    <View
                        style={{
                            flex: 0.5,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Card
                            style={{
                                height: 131,
                                width: 255,
                                alignSelf: 'center',
                                borderRadius: 15,
                                elevation: 10,
                            }}

                        >
                            {/* /BackgroundImage */}
                            <Image
                                style={{
                                    height: 131,
                                    width: 255,
                                    // flex:1,
                                    borderRadius: 15
                                }}
                                source={images.creditCardBg}
                                resizeMode={'cover'}
                            />
                            <Image
                                style={{
                                    height: 59,
                                    width: 100,
                                    left: 20,
                                    top: 10,
                                    borderRadius: 15,
                                    position: 'absolute',

                                }}
                                source={images.logobg}
                                resizeMode={'cover'}
                            />

                            <Text
                                style={{
                                    position: 'absolute',
                                    top: 90,
                                    left: 20,
                                    fontFamily: 'SpaceGrotesk-Light',
                                    fontSize: 16,
                                    color: COLORS.black
                                }}
                            >
                                {userData.fullName}
                            </Text>
                        </Card>

                    </View>
                    <View
                        style={{
                            flex: 0.2,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "Ubuntu-Regular",
                                fontSize: 15,
                                color: '#DCDCDC',
                                textAlign: 'center',
                                paddingHorizontal: 10,
                                marginTop: 20
                            }}
                        >
                            No journey is currently underway, swipe your QuickBus card at any bus stop to begin journey.
                        </Text>

                    </View>

                </Card>

            </Animatable.View>
        </View>
    )
}

export default JourneyScreen

const styles = StyleSheet.create({
    LoginButtonStyle:
    {
        // position: 'absolute',
        // top: 210,
        marginTop: 10,
        height: 39,
        width: 136,
        borderRadius: 10,
        backgroundColor: COLORS.LoginGreen,
        alignSelf: 'center',
        textAlign: 'center',
    },
    ButtonTextStyle: {
        fontFamily: "Ubuntu-Regular",
        textAlign: 'center',
        paddingVertical: 10
    },

})