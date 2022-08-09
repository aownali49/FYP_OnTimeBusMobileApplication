import { StyleSheet, Text, View, Image, ImageBackground, FlatList, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { COLORS, images, SIZES, icons } from '../constants'
import { Card } from 'react-native-shadow-cards';
import * as Animatable from 'react-native-animatable';
import { TransactionCard } from '../components';
import { auth, db } from '../firebase';

const Balance = ({ navigation }) => {
    // const [stopsInfo, setStopInfo] = useState([
    //     {
    //         stopId: 1,
    //         stopName: "Hostel E,F,G",
    //         stopAddress: "H-10, Islamabad, ICT, Pakistan",
    //         distance: "",
    //         tta: "2 mins",
    //         stopCoordinates: {
    //             latitude: 33.659123,
    //             longitude: 73.034217,
    //         }
    //     },
    //     {
    //         stopId: 2,
    //         stopName: "Girl's Hostel Stop",
    //         stopAddress: "Imam-Hanifa Rd, H-10, ICT, Pakistan",
    //         distance: "",
    //         tta: "15 mins",
    //         stopCoordinates: {
    //             latitude: 33.657259,
    //             longitude: 73.031897,
    //         }
    //     },
    //     {
    //         stopId: 3,
    //         stopName: "Water Tank Stop",
    //         stopAddress: "Imam-Hanifa Rd, H-10, ICT, Pakistan",
    //         distance: "",
    //         tta: "25 mins",
    //         stopCoordinates: {
    //             latitude: 33.655689,
    //             longitude: 73.023094,
    //         }

    //     },
    //     {
    //         stopId: 4,
    //         stopName: "Zero Point IIUI",
    //         stopAddress: "H-10, ICT, Pakistan",
    //         distance: "",
    //         tta: "25 mins",
    //         stopCoordinates: {
    //             latitude: 33.657067,
    //             longitude: 73.022226,
    //         }
    //     },
    //     {
    //         stopId: 5,
    //         stopName: "Hostel 5,6 Stop",
    //         stopAddress: "H-10, Islamabad, ICT, Pakistan",
    //         distance: "",
    //         tta: "10 mins",
    //         stopCoordinates: {
    //             latitude: 33.660778,
    //             longitude: 73.021422,
    //         }
    //     },
    //     {
    //         stopId: 6,
    //         stopName: "IIUI Security Camp",
    //         stopAddress: "H-10, Islamabad, ICT, Pakistan",
    //         distance: "",
    //         tta: "10 mins",
    //         stopCoordinates: {
    //             latitude: 33.662285,
    //             longitude: 73.019017,
    //         }
    //     },
    //     {
    //         stopId: 7,
    //         stopName: "FMS Stop",
    //         stopAddress: "H-10, Islamabad, ICT, Pakistan",
    //         distance: "",
    //         tta: "10 mins",
    //         stopCoordinates: {
    //             latitude: 33.663740,
    //             longitude: 73.024782,
    //         }
    //     },
    //     {
    //         stopId: 8,
    //         stopName: "Admin Stop",
    //         stopAddress: "H-10, Islamabad, ICT, Pakistan",
    //         distance: "",
    //         tta: "10 mins",
    //         stopCoordinates: {
    //             latitude: 33.662854,
    //             longitude: 73.031017,
    //         }
    //     }
    // ])
    const [transactionInfo, setTransactionInfo] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorModal, setErrorModal] = useState(false);
    const [refreshing,setRefreshing] = useState(false);
    const [userData,setUserData]= useState({});
    //get transaction history
    useEffect(() => {
        setDataLoading(true);
        var docRef = db().collection("users").doc(auth().currentUser.uid);
        docRef.get().then((doc) => {
            // doc.data().fullName
            setDataLoading(false);
            if (doc.exists) {
                console.log("Balance Screen", doc.data());
                setUserData(doc.data());
                if (doc.data().transactionInfo) {
                    setTransactionInfo(doc.data().transactionInfo)
                }
                else {
                    setErrorMessage("No Journey found, better get going now!")
                    setErrorModal(true);
                }
            } else {
                // console.log("No such document!");
            }
        }).catch((error) => {
            setDataLoading(false);
            console.log("Error getting document:", error);
        });
    }, [navigation,refreshing])

    //get user info

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#E4F9F5'
            }}
        >
            <View
                style={{
                    flex: 0.4,
                    backgroundColor: '#E4F9F5'

                }}
            >
                <Text
                    style={{
                        color: COLORS.gray,
                        top: 30,
                        paddingLeft: 20,
                        fontSize: 25,
                        fontFamily: "Ubuntu-Regular"
                    }}
                >My Balance</Text>

                <Card
                    style={{
                        height: 171,
                        width: 295,
                        alignSelf: 'center',
                        top: 40,
                        borderRadius: 15,
                        elevation: 10,
                    }}

                >
                    {/* /BackgroundImage */}
                    <Image
                        style={{
                            height: 171,
                            width: 295,
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
                            top: 10,
                            left: 175,
                            fontFamily: 'SpaceGrotesk-Light',
                            fontSize: 24,
                            color: COLORS.black
                        }}
                    >
                        Rs.{userData.amount}
                    </Text>
                    <Text
                        style={{
                            position: 'absolute',
                            top: 100,
                            fontFamily: 'SpaceGrotesk-Regular',
                            fontSize: 14,
                            left: 25,
                            color: COLORS.black

                        }}
                    >
                        {userData.cardNumber}
                    </Text>
                    <Text
                        style={{
                            position: 'absolute',
                            top: 120,
                            left: 20,
                            fontFamily: 'SpaceGrotesk-Bold',
                            fontSize: 16,
                            color: COLORS.black
                        }}
                    >
                        {userData.fullName}
                    </Text>
                </Card>
            </View>
            <Animatable.View
                style={{
                    flex: 0.6,
                    backgroundColor: COLORS.BluishBalance,
                    borderRadius: 20,
                    top: -15
                }}
                animation="fadeInUpBig"
            >
                <View
                    style={{
                        flex: 1,
                        top: 15,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 25,
                            color: COLORS.gray,
                            marginLeft: 10,
                            fontFamily: "Ubuntu-Regular"
                        }}
                    >Transaction History</Text>

                    {
                        !dataLoading &&
                        <View
                            style={{
                                flex: 1,
                            }}
                        >

                            <FlatList
                                style={{
                                    marginTop: 10,
                                    marginBottom: 60
                                }}
                                data={transactionInfo}
                                keyExtractor={item => item.id}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => {
                                    return (
                                        <Pressable
                                            onPress={() => {
                                                navigation.navigate('TicketScreen', { item })
                                            }}
                                        >
                                            <TransactionCard data={item} />
                                        </Pressable>
                                    )
                                }}
                            />
                        </View>
                    }
                    {
                        dataLoading &&
                        <View
                            style={{
                                height: 100,
                                width: 100,
                                alignContent: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center',
                            }}>
                            <ActivityIndicator size='large' />

                        </View>
                    }
                    {
                        errorModal &&
                        <Animatable.View
                            animation='fadeInUpBig'
                        >
                            <Card
                                animationType='fade'
                                style={{
                                    height: 300, width: 300,
                                    backgroundColor: COLORS.white,
                                    borderRadius: 20,
                                    alignSelf: 'center',
                                    top: -70,
                                    elevation: 50,
                                    flexDirection: 'column'
                                }}>
                                <Text
                                    style={{
                                        fontFamily: "Ubuntu-Regular",
                                        fontSize: 25,
                                        color: COLORS.gray,
                                        textAlign: 'center',
                                        marginTop: 20
                                    }}
                                >
                                    No Journey found
                                </Text>
                                <Image
                                    style={{
                                        alignSelf: 'center',
                                        marginTop: 30,
                                        height: 100,
                                        width: 100,
                                        // tintColor: COLORS.RupeesPink
                                    }}
                                    source={icons.busStick}
                                />
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
                                    {errorMessage}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        setErrorModal(false);
                                        setErrorMessage("");
                                        setRefreshing(!refreshing);
                                    }}
                                    style={{
                                        height: 39,
                                        width: 110,
                                        borderRadius: 20,
                                        top: 10,
                                        backgroundColor: COLORS.LoginGreen,
                                        alignSelf: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Text
                                        style={styles.ButtonTextStyle}
                                    >Refresh</Text>
                                </TouchableOpacity>
                            </Card>
                        </Animatable.View>
                    }
                </View>

            </Animatable.View>
        </View>
    )
}

export default Balance

const styles = StyleSheet.create({
    ButtonTextStyle: {
        fontFamily: "Ubuntu-Regular",
        textAlign: 'center',
        paddingVertical: 10
    },
})