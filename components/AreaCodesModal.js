import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, TouchableWithoutFeedback, FlatList  } from 'react-native'
import React from 'react'
import { SIZES, FONTS, COLORS} from '../constants'

const AreaCodesModal = ({
    modalVisible, setModalVisible, setSelectedArea, areas
}) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{
                padding: SIZES.radius,
                flexDirection: "row"
            }}
            onPress={() => {
                setModalVisible(false)
                setSelectedArea(item)
            }}
        >
            <Image
                source={{ uri: item.flag }}
                style={{
                    width: 30,
                    height: 30,
                    marginRight: 10
                }}
            />
            <Text style={{ ...FONTS.body4, color: COLORS.black }}>{item.name}</Text>
        </TouchableOpacity>
    )

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
        >
            <TouchableWithoutFeedback
                onPress={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", marginBottom: SIZES.width * 0.2 }}>
                    <View
                        style={{
                            height: 400,
                            width: SIZES.width * 0.8,
                            backgroundColor: COLORS.lightGray,
                            opacity:.95,
                            borderRadius: SIZES.radius
                        }}
                    >
                        <FlatList
                            data={areas}
                            renderItem={renderItem}
                            keyExtractor={item => item.code}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                marginBottom: SIZES.padding,
                                padding: SIZES.padding
                            }}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </Modal>
    )
}

export default AreaCodesModal

const styles = StyleSheet.create({})