import { StyleSheet, Text, View, FlatList, Animated, Modal, Pressable } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { COLORS, icons, SIZES } from '../constants'
import { ProfileCard, PersonalInformationModal } from '../components';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { auth, db } from '../firebase';
import { useIsFocused } from '@react-navigation/native'
// import PersonalInformationModal from '../components/PersonalInformationModal';



const ProfileSettingScreen = () => {
    let _panel = useRef(null);
    const isFocused = useIsFocused()
    const [isModalVisible, setModalVisible] = useState(false);
    const [isResultVisible, setResultVisible] = useState(false);
    const [dragging, setDragging] = useState(true);
    const _draggedValue = useRef(new Animated.Value(0)).current;
    const [personalDetails, setPersonalDetails] = useState([
        {
            id: '1',
            option: "Full name",
            value: 'Not Provided',
            icon: icons.accSettings
        },
        {
            id: '2',
            option: "Email",
            value: 'Not Provided',
            icon: icons.email
        },
        {
            id: '3',
            option: "Phone Number",
            value: 'Not Provided',
            icon: icons.phone
        },
        {
            id: '4',
            option: "Date of birth",
            value: 'Not Provided',
            icon: icons.calendar
        },
        {
            id: '5',
            option: "Home Address",
            value: 'Not Provided',
            icon: icons.home
        },

    ])
    const [sentOption, setSentOption] = useState(null);

    useEffect(() => {
        try {
            db()
                .collection("users")
                .doc(auth().currentUser.uid)
                .get().then((doc) => {
                    setPersonalDetails([
                        { ...personalDetails[0], value: ( doc.data().fullName==""||doc.data().fullName==undefined)?"Not Provided":doc.data().fullName },
                        { ...personalDetails[1], value:( doc.data().email==""||doc.data().email==undefined)?"Not Provided":doc.data().email},
                        { ...personalDetails[2], value:( doc.data().phoneNumber==""||doc.data().phoneNumber==undefined)?"Not Provided":doc.data().phoneNumber},
                        { ...personalDetails[3], value:( doc.data().dob==""||doc.data().dob==undefined)?"Not Provided":doc.data().dob},
                        { ...personalDetails[4], value: (doc.data().address==""||doc.data().address==undefined)?"Not Provided":doc.data().address}
                    ])
                })
        } catch (error) {
            console.log(error);
        }
    },[isFocused,isModalVisible]);

    function RenderList() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: COLORS.BluishBalance
                }}
            >
                <View
                    style={styles.headingStyle}
                >
                    <Text
                        style={{
                            color: COLORS.gray,
                            fontSize: 25,
                            fontFamily: "Ubuntu-Regular"
                        }}
                    >Profile Settings:</Text>
                </View>
                <View
                    style={{
                        flex: 0.9,
                    }}>
                    <FlatList
                        style={{
                            flex: 1,
                        }}
                        data={personalDetails}
                        keyExtractor={item => item.name}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        setSentOption(item.id)
                                        setModalVisible(true)
                                    }}
                                >
                                    <ProfileCard option={item} />
                                </Pressable>
                            )
                        }}
                    />
                </View>
            </View >
        )
    }
    return (
        <View style={{
            flex: 1
        }}>
            {RenderList()}
            <PersonalInformationModal modalVisible={isModalVisible} setModalVisible={setModalVisible} option={sentOption} />
        </View>
    )
}

export default ProfileSettingScreen

const styles = StyleSheet.create({
    headingStyle: {
        flex: 0.1,
        color: COLORS.gray,
        fontSize: 25,
        fontFamily: "Ubuntu-Bold",
        paddingLeft: 25,
        justifyContent: 'center'
    }
})