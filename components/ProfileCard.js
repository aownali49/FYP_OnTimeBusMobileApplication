import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { COLORS, icons, SIZES } from '../constants'
import { Card } from 'react-native-shadow-cards';
// import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const ProfileCard = ({ option }) => {

    const optionData = option;
    return (
        <Card
            style={styles.cardStyle}
        >
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 12,
                }}
            >
                <View
                    style={styles.roundImageStyle}
                >
                    <Image
                        style={{
                            height: 25,
                            width: 25,
                            tintColor: COLORS.RupeesPink,
                        }}
                        source={optionData.icon}
                    />
                </View>
                <View
                    style={{
                        flex: 0.6,
                        paddingLeft: 10,
                        paddingTop: 10
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.gray,
                            fontSize: 17,
                            fontFamily: "Ubuntu-Regular"
                        }}
                    >
                        {optionData.option}
                    </Text>
                    <Text
                        style={{
                            maxHeight:40,
                            minWidth:optionData.id === "2"?220:180,
                            color: COLORS.lightGray,
                            fontSize: 15,
                            fontFamily: "Ubuntu-Regular"
                        }}
                    >
                        {optionData.value}
                    </Text>
                </View>
                <View
                    style={{
                        flex: 0.2,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {
                        optionData.id !== "2" &&
                        <Image
                            style={{
                                height: 15,
                                width: 15,
                            }}
                            source={
                                icons.rightarrow
                            }
                        />
                    }
                </View>
            </View>
        </Card>
    )
}

export default ProfileCard

const styles = StyleSheet.create({
    cardStyle: {
        borderRadius: 15,
        marginBottom: 7.5,
        marginTop: 7.5,
        elevation: 5,
        height: 90,
        alignSelf: 'center',
        backgroundColor: COLORS.TransactionCardBeige,
    },
    roundImageStyle: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: COLORS.mailaWhite,
        margin: 2
    }
})