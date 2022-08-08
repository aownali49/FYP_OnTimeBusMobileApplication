import { StyleSheet, Text, View, Button, Image, TouchableOpacity, TextInput, FlatList, Modal, Pressable, ActivityIndicator } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { COLORS, FONTS, icons, SIZES, images } from '../constants'
import { LineDivider, StopCard } from '../components';
import GOOGLE_MAPS_API from './GoogleMapsAPI';
import { Card } from 'react-native-shadow-cards'
var axios = require('axios');
import { auth, db, realdb, firebase } from '../firebase'

const JourneyScreen = ({ route, navigation }) => {
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
    const [cardNumber, setCardNumber] = useState(-1);
    const [journeyInfo, setJourneyInfo] = useState({
        amount: "Rs.100",
        destStopId: 2,
        destStopName: "Girl's Hostel Stop",
        origStopId: 1,
        origStopName: "Hostel E,F,G",
        transactionId: "1"
    });
    const [action, setAction] = useState('child_added');

    useEffect(() => {
        var docRef = db().collection("users").doc(auth().currentUser.uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("User Information", doc.data());
                setUserData(doc.data());
                setCardNumber(doc.data().cardNumber);
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, [])

    // useEffect(() => {
    //     console.log("Incoming params", route.params ?? "Not Incoming")
    //     const { flag } = route.params ?? false;
    //     setJourneyInProgress(flag ? true : false)

    // }, [route?.params?.flag])

    useEffect(() => {
        console.log("Running live fetch (Home)");
        const onValueChange = realdb()
            .ref('/Journey/' + cardNumber)
            .on(action, snapshot => {
                console.log('User data from home screen: ', snapshot.val());
                setJourney((p) => { return [...p, snapshot.val()] });
            });
        // Stop listening for updates when no longer required
        return () => realdb().ref(`/Journey/` + cardNumber).off(action, onValueChange);
    }, [navigation]);

    useEffect(() => {
        console.log("Set journey invoked (Journey Screen): ", journey)
        if (journey.length <= 1) {
            setJourneyInProgress(false);
        }
        else if (journey.length === 3) {
            setJourneyInProgress(true);
            setJourneyInfo({
                ...journeyInfo,
                origStopName: journey[1]
            })
        }
        else if (journey.length > 3) {
            setJourneyInProgress(true);
            setJourneyCompleted(true);
            setJourneyInfo({
                ...journeyInfo,
                destStopName: journey[3]
            })
        }
    }, [journey])

    function handleSaveJourney() {
        console.log("Inside Save journey", journeyInfo);
        var docRef = db().collection("users").doc(auth().currentUser.uid);
        docRef.update({
            transactionInfo: db.FieldValue.arrayUnion(journeyInfo)
        })
            .then(() => {
                setJourneyInfo({
                    amount: "",
                    destStopId: -1,
                    destStopName: "",
                    origStopId: -1,
                    origStopName: "",
                    transactionId: ""
                });
                setJourney([]);
                setJourneyCompleted(false);
                setJourneyInProgress(false);
                realdb()
                    .ref('/Journey/' + cardNumber).remove(()=>{
                        console.log("Live Journey Instace Removed");
                    }).catch(error=>{console.log("Error Removing live journey instance",error);})
                    
                console.log("Journey added successfully");
            })
            .catch((error) => {
                console.log("Journey added failed", error);
            })
        console.log("Journey Details", journeyInfo);
    }

    const mapRef = useRef();

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