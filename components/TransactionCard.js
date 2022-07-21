import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS, icons, SIZES } from '../constants'
import { Card } from 'react-native-shadow-cards';

const TransactionCard = () => {
    return (
        <Card
            style={{
                marginTop: 5,
                marginBottom: 5,
                elevation: 10,
                height: 180,
                alignSelf: 'center',

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
                        borderColor: COLORS.black,
                        borderWidth: 1,
                    }}
                >
                    <Image
                        source={icons.bus3}
                        style={{
                            height: 40,
                            width: 40,
                            left:10,
                        }}
                    />
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "flex-end",
                            borderColor: COLORS.black,
                            borderWidth: 1,
                        }}
                    >
                        <Image
                            source={icons.balance}
                            style={{
                                left:10,
                                height: 40,
                                width: 40
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        flex: 0.7,
                        // borderColor: COLORS.black,
                        // borderWidth: 1,
                    }}
                >

                </View>

            </View>
        </Card>
    )
}

export default TransactionCard

const styles = StyleSheet.create({})