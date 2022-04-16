import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const Thumb = () => {
    return (
        <View
            style={{
                paddingTop: 5,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}

        >
            <View
                style={{

                    width: "20%",
                    height: 3,
                    borderRadius: 10,
                    backgroundColor: COLORS.gray,
                }}
            >

            </View>

        </View>
    )
}

export default Thumb

const styles = StyleSheet.create({})