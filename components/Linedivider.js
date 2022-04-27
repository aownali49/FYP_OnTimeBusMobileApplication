import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const Linedivider = () => {
    return (
        <View style={
            {
                width: "100%",
                height: 1,
                backgroundColor: COLORS.lightGray,
            }
        }>

        </View>
    )
}

export default Linedivider

const styles = StyleSheet.create({})