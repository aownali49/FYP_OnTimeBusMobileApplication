import { Modal, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { COLORS, SIZES, icons } from '../constants'

const PersonalInformationModal = ({
    modalVisible, setModalVisible,
    option
}) => {

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

                </Animatable.View >
            </View>
        </Modal>
    )
}

export default PersonalInformationModal


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BluishBalance
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        // borderWidth: 1,
        // borderColor: COLORS.black,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
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
    }
});