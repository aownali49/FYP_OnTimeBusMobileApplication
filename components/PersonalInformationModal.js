import { Modal, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, DatePickerIOSBase, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import { COLORS, SIZES, icons, FONTS } from '../constants'
import { AreaCodesModal } from '../components'
import DatePicker from 'react-native-date-picker'
import Moment from 'moment';
import { db, auth} from '../firebase'
// import MapView from 'react-native-maps'

const PersonalInformationModal = ({
    modalVisible, setModalVisible,
    option,navigation
}) => {
    Moment.locale('en');
    const [myDate, setDate] = useState(new Date());
    const [personalDetail, setPersonalDetail] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dob: new Date(),
        address1:"",
        address2:""
    });

    const [areaCodesModal, setAreaCodesModal] = useState(false)
    const [selectedArea, setSelectedArea] = useState('PK')
    const [areas, setAreas] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then(response => response.json())
            .then(data => {
                let areaData = data.map((item) => {
                    return {
                        code: item.cca2,
                        name: item.name.common,
                        callingCode: (item.idd?.root),
                        flag: item.flags.png
                    }
                });
                setAreas(areaData);

                if (areaData.length > 0) {
                    let defaultData = areaData.filter(a => a.code == "PK")
                    if (defaultData.length > 0) {
                        setSelectedArea(defaultData[0])
                    }
                };
            });
    }, []);
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    {option === '1' &&
                        <Text style={styles.text_header}>Update Name</Text>
                    }
                    {option === '2' &&
                        <Text style={styles.text_header}>Update Email</Text>
                    }
                    {option === '3' &&
                        <Text style={styles.text_header}>Update Phone Number</Text>
                    }
                    {option === '4' &&
                        <Text style={styles.text_header}>Update Date of birth</Text>
                    }
                    {option === '5' &&
                        <Text style={styles.text_header}>Update Address</Text>
                    }
                </View>

                {/* Footer */}
                <Animatable.View
                    style={styles.footer}
                    animation='fadeInUpBig'
                >
                    {
                        option === '1' &&
                        <View>
                            <View>
                                <Text
                                    style={{
                                        // flex:1,
                                        fontFamily: 'Ubuntu-Regular',
                                        fontSize: 20,
                                        color: COLORS.black
                                    }}
                                >
                                    Please enter the name you'd like to use with your account:
                                </Text>
                            </View>
                            <View
                                style={{
                                    marginTop: 10
                                }}
                            >
                                <TextInput
                                    placeholder='First Name'
                                    placeholderTextColor={'#B5B5B5'}
                                    onChangeText = {(text) => {
                                        setPersonalDetail({
                                            ...personalDetail,
                                            firstName: text
                                        })
                                    }}
                                    value = {personalDetail.firstName}
                                    style={styles.EmailInputStyle}
                                />
                                <TextInput
                                    placeholder='Last Name'
                                    placeholderTextColor={'#B5B5B5'}
                                    onChangeText = {(text) => {
                                        setPersonalDetail({
                                            ...personalDetail,
                                            lastName: text
                                        })
                                    }}
                                    value = {personalDetail.lastName}
                                    style={styles.EmailInputStyle}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        try {
                                            db()
                                            .collection('users')
                                            .doc(auth().currentUser.uid)
                                            .update({
                                                fullName: (personalDetail.firstName +" "+ personalDetail.lastName)
                                            })
                                            
                                        } catch (error) {
                                            console.log("Name Saving Error",error);
                                        }

                                        
                                    }}
                                    style={styles.LoginButtonStyle}
                                >
                                    <Text
                                        style={styles.ButtonTextStyle}
                                    >Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    style={styles.RegisterButton}
                                >
                                    <Text
                                        style={styles.ButtonTextStyle}
                                    >Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    {
                        option === '2' &&
                        <View>
                            <View>
                                <Text
                                    style={{
                                        // flex:1,
                                        fontFamily: 'Ubuntu-Regular',
                                        fontSize: 20,
                                        color: COLORS.black
                                    }}
                                >
                                    Please enter the Email you'd like to use with your account:
                                </Text>
                            </View>
                            <View
                                style={{
                                    marginTop: 10,
                                    // borderWidth:1,
                                }}
                            >
                                <TextInput
                                    placeholder='Email'
                                    placeholderTextColor={'#B5B5B5'}
                                    onChange = {(text) => {
                                        setPersonalDetail({
                                            ...personalDetail,
                                            email: text
                                        })
                                        
                                    }}
                                    value = {personalDetail.email}
                                    style={styles.EmailInputStyle}
                                />
                                <TouchableOpacity
                                    onPress={() => { 
                                        db()
                                        .collection('users')
                                        .doc(auth().currentUser.uid)
                                        .update({
                                            email: (personalDetail.email)
                                        })
                                    }}
                                    style={styles.LoginButtonStyle}
                                >
                                    <Text
                                        style={styles.ButtonTextStyle}
                                    >Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    style={styles.RegisterButton}
                                >
                                    <Text
                                        style={styles.ButtonTextStyle}
                                    >Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    {
                        option === '3' &&
                        <View>
                            <View>
                                <Text
                                    style={{
                                        // flex:1,
                                        fontFamily: 'Ubuntu-Regular',
                                        fontSize: 20,
                                        color: COLORS.black
                                    }}
                                >
                                    Please enter the Phone number you'd like to use with your account:
                                </Text>
                            </View>
                            <View
                                style={{
                                    marginTop: 30,
                                }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    padding: 10,

                                }}>
                                    <TouchableOpacity
                                        style={{
                                            width: 100,
                                            height: 50,
                                            marginTop: 10,
                                            flexDirection: "row",
                                            marginHorizontal: 5,
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#f2f2f2',
                                            ...FONTS.body2
                                        }}
                                        onPress={() => setAreaCodesModal(!areaCodesModal)}
                                    >
                                        <View style={{ justifyContent: "center" }}>
                                            <Image
                                                source={icons.downArrow}
                                                resizeMode='contain'
                                                style={{
                                                    width: 10,
                                                    height: 10,
                                                    tintColor: COLORS.gray
                                                }}
                                            />
                                        </View>
                                        <View style={{ justifyContent: "center", marginLeft: 5, }}>
                                            <Image
                                                source={{ uri: selectedArea?.flag }}
                                                resizeMode='contain'
                                                style={{
                                                    width: 30,
                                                    height: 30,
                                                }}
                                            />
                                        </View>
                                        <View style={{ justifyContent: "center", marginLeft: 5 }}>
                                            <Text style={{ color: '#05375a', ...FONTS.body3 }}>{selectedArea?.callingCode}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TextInput
                                        placeholder='Phone Number'
                                        placeholderTextColor={'#B5B5B5'}
                                        onChangeText = {(text) => {
                                            setPersonalDetail({
                                                ...personalDetail,
                                                phoneNumber: text
                                            })
                                            
                                        }}
                                        style={styles.PhoneNumberInput}
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={() => { 
                                        db()
                                        .collection('users')
                                        .doc(auth().currentUser.uid)
                                        .update({
                                            phoneNumber: (selectedArea?.callingCode + " " + personalDetail.phoneNumber)
                                        })
                                    }}
                                    style={styles.LoginButtonStyle}
                                >
                                    <Text
                                        style={styles.ButtonTextStyle}
                                    >Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    style={styles.RegisterButton}
                                >
                                    <Text
                                        style={styles.ButtonTextStyle}
                                    >Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    {
                        option === '4' &&
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "column"
                            }}
                        >
                            <View
                                style={{
                                    flex: 0.10,
                                    marginTop: 15
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.gray,
                                        fontFamily: 'Ubuntu-Regular',
                                        fontSize: 20
                                    }}
                                >
                                    Please enter your date of birth:
                                </Text>
                            </View>
                            <View
                                style={{
                                    flex: 0.85,
                                }}
                            >
                                <View
                                    style={{
                                        flex: 0.15,
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                        // alignItems:'center'
                                    }}
                                >
                                    <Pressable
                                        onPress={() => {
                                            setOpen(true)
                                        }}
                                        style={{
                                            paddingHorizontal: 25,
                                            borderRadius: 20,
                                            backgroundColor: COLORS.lightGray,
                                            justifyContent: 'center',
                                            width: 300
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: COLORS.black,
                                                fontSize: 20,
                                                fontFamily: "Ubuntu-Regular",
                                                textAlign: 'center'
                                            }}
                                        >{personalDetail.dob+""}</Text>
                                    </Pressable>

                                </View>
                                <View
                                    style={{
                                        flex: 0.15,
                                        marginTop: 20,
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => { 
                                            db()
                                        .collection('users')
                                        .doc(auth().currentUser.uid)
                                        .update({
                                            dob: (personalDetail.dob)
                                        })
                                        console.log("Gone");
                                        }}
                                        style={styles.LoginButtonStyle}
                                    >
                                        <Text
                                            style={styles.ButtonTextStyle}
                                        >Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { }}
                                        style={styles.RegisterButton}
                                    >
                                        <Text
                                            style={styles.ButtonTextStyle}
                                        >Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                                <DatePicker
                                    modal
                                    mode={'date'}
                                    maximumDate={new Date()}
                                    minimumDate={new Date('1900-01-01')}
                                    open={open}
                                    date={myDate}
                                    onConfirm={(date) => {
                                        setOpen(false)
                                        setDate(date)
                                        setPersonalDetail({
                                            ...personalDetail,
                                            dob: Moment(date).format('DD MMMM YYYY')
                                        })
                                    }}
                                    onCancel={() => {
                                        setOpen(false)
                                    }}
                                />
                            </View>

                        </View>
                    }
                    {
                        option === '5' &&
                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            <View
                                style={{
                                    flex: 0.10,
                                    marginTop: 15
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.gray,
                                        fontFamily: 'Ubuntu-Regular',
                                        fontSize: 20
                                    }}
                                >
                                    Please enter your current address:
                                </Text>
                            </View>
                            <View
                                style={{
                                    flex: 0.80,
                                }}
                            >
                                <View>
                                    <TextInput
                                        placeholder='Address line 1'
                                        onChangeText = {(text) => {
                                            setPersonalDetail({
                                                ...personalDetail,
                                                address1: text
                                            })
                                            
                                        }}
                                        placeholderTextColor={'#B5B5B5'}
                                        style={styles.EmailInputStyle}
                                    />
                                    <TextInput
                                        placeholder='Address line 2'
                                        placeholderTextColor={'#B5B5B5'}
                                        onChangeText = {(text) => {
                                            setPersonalDetail({
                                                ...personalDetail,
                                                address2: text
                                            })
                                            
                                        }}
                                        style={styles.EmailInputStyle}
                                    />
                                    <TouchableOpacity
                                        onPress={() => { 
                                            db()
                                            .collection('users')
                                            .doc(auth().currentUser.uid)
                                            .update({
                                                address1: (personalDetail.address1),
                                                address2: (personalDetail.address2)
                                            })
                                        }}
                                        style={styles.LoginButtonStyle}
                                    >
                                        <Text
                                            style={styles.ButtonTextStyle}
                                        >Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { }}
                                        style={styles.RegisterButton}
                                    >
                                        <Text
                                            style={styles.ButtonTextStyle}
                                        >Cancel</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>
                    }

                </Animatable.View >
            </View>
            <AreaCodesModal
                modalVisible={areaCodesModal}
                setModalVisible={setAreaCodesModal}
                setSelectedArea={setSelectedArea}
                areas={areas}
            />
        </Modal>
    )
}

export default PersonalInformationModal


const styles = StyleSheet.create({
    RegisterButton:
    {
        height: 39,
        width: '90%',
        borderRadius: 10,
        backgroundColor: COLORS.RegisterGray,
        alignSelf: 'center',
        textAlign: 'center',
        marginVertical: 5,
    },
    LoginButtonStyle:
    {
        height: 39,
        width: '90%',
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: COLORS.LoginGreen,
        alignSelf: 'center',
        textAlign: 'center',
    },
    ButtonTextStyle: {
        fontFamily: "Ubuntu-Regular",
        textAlign: 'center',
        paddingVertical: 10
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.BluishBalance
    },
    header: {
        flex: 0.3,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 0.7,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        // fontWeight: 'bold',
        fontSize: 30,
        fontFamily: 'Ubuntu-Bold'
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        height: '100%',
        marginLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    EmailInputStyle: {
        paddingHorizontal: 25,
        color: COLORS.black,
        width: '100%',
        borderRadius: 20,
        marginVertical: 10,
        backgroundColor: COLORS.lightGray,
        fontFamily: "Ubuntu-Regular"
    },
    PhoneNumberInput: {
        paddingHorizontal: 25,
        color: COLORS.black,
        width: '60%',
        borderRadius: 20,
        marginVertical: 10,
        backgroundColor: COLORS.lightGray,
        fontFamily: "Ubuntu-Regular"
    },
});