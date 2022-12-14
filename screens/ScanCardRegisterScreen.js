
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import React, { useState } from 'react'
import { dummy, COLORS, SIZES, FONTS, icons, images } from "../constants";
import { Card } from 'react-native-shadow-cards';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import { auth, db } from '../firebase'
NfcManager.start();
const ScanCardRegisterScreen = ({ navigation }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [cardNumber, setCardNumber] = useState(null);
    const [errorModal, setErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function readNdef() {
        try {
            // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
            // the resolved tag object will contain `ndefMessage` property
            const tag = await NfcManager.getTag();
            let payload = tag.ndefMessage[0]?.payload;
            let numArray = "";
            for (let index = 0; index < payload.length; index++) {
                numArray = numArray.concat(String.fromCharCode(payload[index]));
            }
            console.log("Tag ID:", numArray);
            setCardNumber(numArray);
        } catch (ex) {
            setCardNumber(null);
            setModalOpen(false);
            setErrorMessage("Invalid card scanned, please present a valid QuickBus card!")
            setErrorModal(true);
            console.warn('Oops!', ex);
        } finally {
            // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();
        }
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.slateGray,
            }}
        >
            <View
                style={{
                    height: '50%',
                    backgroundColor: COLORS.white

                }}
            >
                <Image
                    source={images.logoBackground}
                    resizeMode='cover'
                    style={{
                        position: 'absolute',
                        height: 166,
                        top: 30,
                        width: '100%',
                        // borderColor:COLORS.black,
                        // borderWidth:1,
                    }}
                />
                <Card
                    style={{
                        elevation: 10,
                        width: '80%',
                        height: '100%',
                        position: 'absolute',
                        top: 200,
                        alignSelf: 'center',
                        backgroundColor: COLORS.stopModalGray,
                        borderRadius: 20,
                        display: 'flex'
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.black,
                            textAlign: 'center',
                            top: 20,
                            fontSize: 20,
                            fontFamily: "Ubuntu-Regular"
                        }}
                    >
                        Scan your QuickBus Card:
                    </Text>
                    <Card
                        style={{
                            height: 150,
                            width: 240,
                            alignSelf: 'center',
                            top: 40,
                            borderRadius: 15,
                            elevation: 10,
                        }}

                    >
                        {/* /BackgroundImage */}
                        <Image
                            style={{
                                height: 150,
                                width: 240,
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
                                alignSelf: 'center',
                                top: 10,
                                borderRadius: 15,
                                position: 'absolute',

                            }}
                            source={images.logobg}
                            resizeMode={'cover'}
                        />
                        <TextInput
                            placeholder='Scan Card Number'
                            placeholderTextColor={'#B5B5B5'}
                            style={styles.CardNumberInputStyle}
                            value={cardNumber}
                            onChangeText={(text) => {
                                setCardNumber(text)
                            }}
                        />
                    </Card>
                    <TouchableOpacity
                        onPress={() => {
                            try {
                                if (cardNumber !== null) {
                                    db()
                                        .collection('card')
                                        .doc(cardNumber)
                                        .get()
                                        .then((doc) => {
                                            if (doc.exists) {
                                                let cardUser = doc.data();
                                                console.log("Card Data", cardUser.userId);
                                                if (cardUser.userId == "") 
                                                {
                                                    db()
                                                        .collection('users')
                                                        .doc(auth().currentUser.uid)
                                                        .update({
                                                            'cardNumber': cardNumber
                                                        })
                                                    db()
                                                        .collection('card')
                                                        .doc(cardNumber)
                                                        .update({
                                                            'userId': auth().currentUser.uid
                                                        })
                                                    navigation.replace('HomeStack')
                                                }
                                                else {
                                                    setErrorMessage("This card is in use, please enter a unique card number.")
                                                    setErrorModal(true);
                                                }
                                            }
                                            else {
                                                setErrorMessage("Card Number is invalid, please enter an approved QuickBus number.")
                                                setErrorModal(true);
                                            }
                                        })
                                        .catch((error) => {
                                            console.log("Error", error);
                                        })
                                    // db()
                                    //     .collection('users')
                                    //     .doc(auth().currentUser.uid)
                                    //     .update({
                                    //         'cardNumber': cardNumber
                                    //     })
                                    // navigation.replace('HomeStack')
                                }
                                else {
                                    setErrorMessage("Please enter a QuickBus card to continue")
                                    setErrorModal(true);
                                }
                            } catch (error) {

                            }
                        }}
                        style={styles.LoginButtonStyle}
                    >
                        <Text
                            style={styles.ButtonTextStyle}
                        >Next</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setModalOpen(true);
                            readNdef();
                        }}
                        style={{
                            position: 'absolute',
                            top: 250,
                            height: 39,
                            paddingHorizontal: 10,
                            borderRadius: 20,
                            backgroundColor: COLORS.lightGray,
                            alignSelf: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Text
                            style={styles.ButtonTextStyle}
                        >Scan Card with NFC</Text>
                    </TouchableOpacity>
                </Card>

                {
                    modalOpen &&
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
                                top: 200,
                                elevation: 50,
                                flexDirection: 'column'
                            }}>
                            {
                                cardNumber === null &&
                                <Text
                                    style={{
                                        fontFamily: "Ubuntu-Regular",
                                        fontSize: 25,
                                        color: COLORS.gray,
                                        textAlign: 'center',
                                        marginTop: 20
                                    }}
                                >
                                    Ready to Scan
                                </Text>
                            }
                            {
                                cardNumber &&
                                <Text
                                    style={{
                                        fontFamily: "Ubuntu-Regular",
                                        fontSize: 25,
                                        color: COLORS.gray,
                                        textAlign: 'center',
                                        marginTop: 20
                                    }}
                                >
                                    Scan Complete
                                </Text>
                            }
                            <Image
                                style={{
                                    alignSelf: 'center',
                                    marginTop: 30,
                                    height: 100,
                                    width: 100,
                                    tintColor: cardNumber ? COLORS.LoginGreen : COLORS.gray
                                }}
                                source={icons.nfcIcon}
                            />
                            {
                                cardNumber &&
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
                                    Scan completed, continue to save card details.
                                </Text>
                            }
                            {
                                !cardNumber &&
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
                                    Hold your phone near the QuickBus Card to Scan.
                                </Text>
                            }

                            {
                                cardNumber &&
                                <TouchableOpacity
                                    onPress={() => { setModalOpen(false) }}
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
                                    >Continue</Text>
                                </TouchableOpacity>
                            }

                            {
                                !cardNumber &&
                                <TouchableOpacity
                                    onPress={() => { setModalOpen(false) }}
                                    style={{
                                        height: 39,
                                        width: 110,
                                        borderRadius: 20,
                                        top: 10,
                                        backgroundColor: COLORS.lightGray,
                                        alignSelf: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Text
                                        style={styles.ButtonTextStyle}
                                    >Cancel</Text>
                                </TouchableOpacity>
                            }
                        </Card>
                    </Animatable.View>
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
                                top: 200,
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
                                Card Error
                            </Text>
                            <Image
                                style={{
                                    alignSelf: 'center',
                                    marginTop: 30,
                                    height: 100,
                                    width: 100,
                                    tintColor: COLORS.RupeesPink
                                }}
                                source={icons.exclamation}
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
                                >Continue</Text>
                            </TouchableOpacity>
                        </Card>
                    </Animatable.View>
                }

            </View>
        </View >


    )
}

export default ScanCardRegisterScreen

const styles = StyleSheet.create({
    ButtonTextStyle: {
        fontFamily: "Ubuntu-Regular",
        textAlign: 'center',
        paddingVertical: 10
    },

    CardNumberInputStyle: {
        paddingHorizontal: 25,
        color: COLORS.black,
        width: '85%',
        fontSize: 10,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: COLORS.AlmostWhite,
        position: 'absolute',
        height: 30,
        marginTop: 85,
        fontFamily: "Ubuntu-Regular",
    },
    LoginButtonStyle:
    {
        position: 'absolute',
        top: 195,
        height: 39,
        width: 110,
        borderRadius: 20,
        backgroundColor: COLORS.LoginGreen,
        alignSelf: 'center',
        textAlign: 'center',
    },
})