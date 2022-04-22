import { StyleSheet, Text, View, Button, Animated, Image, TouchableOpacity, TextInput, FlatList, Modal } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import SlidingUpPanel from 'rn-sliding-up-panel';
import { LineDivider, Thumb } from '../components';
import SearchResultCard from '../components/SearchResultCard';

const Home = () => {

    let _panel = useRef(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isResultVisible, setResultVisible] = useState(false);
    const [dragging, setDragging] = useState(true);
    const [stopsInfo, setStopInfo] = useState([
        {
            id: 1,
            name: "Block A",
            address: "losar Sharfoo"
        },
        {
            id: 2,
            name: "Block B",
            address: "losar Sharfoo"
        },
        {
            id: 3,
            name: "Block C",
            address: "losar Sharfoo"
        },
        {
            id: 1,
            name: "Block A",
            address: "losar Sharfoo"
        },
        {
            id: 2,
            name: "Block B",
            address: "losar Sharfoo"
        },
        {
            id: 3,
            name: "Block C",
            address: "losar Sharfoo"
        },

    ])
    const [searchResult, setSearchResult] = useState([
        {
            id: 1,
            name: "Block A",
            address: "losar Sharfoo"
        },
        {
            id: 1,
            name: "Block A",
            address: "losar Sharfoo"
        },


    ])



    const _draggedValue = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        _draggedValue.addListener((valueObject) => {
            if (valueObject.value > SIZES.height) { setDragging(false); }

        })

        return () => {
            _draggedValue.removeAllListeners();
        }

    }, []);

    function renderSearchResultModal() {
        return (
            <Modal
                style = {{ flex:1
                  }
                  }
                transparent
                visible={isResultVisible}
                animationType='fade'
                onRequestClose={() => { setResultVisible(!isResultVisible) }}
            >
                <View 
                    style = {{
                        backgroundColor:COLORS.white,
                        height:"100%",
                        width:"100%"
                    }}
                
                >
                    <Text style = {{
                        color:COLORS.black,
                        height:"100%",
                        width:"100%"
                    }}>
                        Result Modal works!
                    </Text>
                </View>
            </Modal>
        )
    }




    function renderMap() {
        return (

            <View style={styles.MAP}>
                <RenderCenterLocation />
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 33.504013,
                        longitude: 73.102201,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >

                    <Marker
                        coordinate={{ latitude: 33.504013, longitude: 73.102201 }}

                    />
                    <Marker
                        coordinate={{ latitude: 33.503686, longitude: 73.100291 }}

                    />
                    <Marker
                        coordinate={{ latitude: 33.505569, longitude: 73.092765 }}

                    />

                </MapView>
            </View>
        )
    }

    function renderSwipeUpModal() {
        return (
            <View style={styles.MODAL}>
                <SlidingUpPanel
                    ref={c => { _panel = c; }}
                    allowDragging={dragging}
                    draggableRange={{
                        top: SIZES.height - 120,
                        bottom: SIZES.height / 3,
                    }}
                    animatedValue={_draggedValue}
                    snappingPoints={[SIZES.height]}
                    height={SIZES.height}
                    friction={0.7}

                    onBottomReached={() => { setDragging(true) }}



                >

                    <View style={{
                        flex: 1, backgroundColor: COLORS.white, borderTopLeftRadius: SIZES.radius * 2,
                        borderTopRightRadius: SIZES.radius * 2
                    }}>

                        <FlatList
                            data={stopsInfo}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponent={() => {
                                return (
                                    <Thumb />
                                )
                            }}
                            ItemSeparatorComponent={() => {
                                return (
                                    <LineDivider />
                                )
                            }}

                            renderItem={({ item, index }) => {
                                return (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingTop: SIZES.padding,
                                            paddingLeft: SIZES.padding * 0.3,
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: 35,
                                                height: 35
                                            }}
                                        >
                                            <Image
                                                source={icons.bus}
                                                resizeMode="cover"
                                                style={{
                                                    width: 25,
                                                    height: 25
                                                }}
                                            />
                                        </View>
                                        <View
                                            style={{
                                                flex: 1
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: COLORS.black,
                                                    ...FONTS.body3
                                                }}
                                            >{item?.name}</Text>
                                            <Text
                                                style={{
                                                    color: COLORS.black,
                                                    ...FONTS.body4
                                                }}
                                            >{item?.address}</Text>
                                        </View>
                                    </View>
                                )
                            }}
                        />

                    </View>


                </SlidingUpPanel>
            </View>
        )
    }

    function renderSearchBar() {
        return (
            <View style={styles.SEARCHBAR}>
                <TouchableOpacity style={styles.SEARCHBARIN}
                    onPress={() => {
                        setModalVisible(!isModalVisible);
                        console.warn("search pressed")
                    }}
                >

                    <View style={{
                        width: 40,
                        height: 40,
                        backgroundColor: COLORS.black,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image

                            source={icons.search}
                            resizeMode="cover"
                            style={{ width: 25, height: 25, tintColor: COLORS.white }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            height: "100%",
                        }}
                    >
                        <TextInput
                            placeholder='Search'
                            placeholderTextColor={COLORS.gray}
                            style={{
                                color: COLORS.black
                            }}
                        />
                    </View>

                </TouchableOpacity>
            </View>
        )
    }
    function RenderCenterLocation() {

        return (
            <TouchableOpacity
                onPress={() => {
                    console.warn("Center Location")
                }}
                style={{
                    position: "absolute",
                    right: 25,
                    bottom: 50,
                    zIndex: 1
                }}
            >
                <Image
                    style={{
                        height: 35,
                        width: 35,
                    }}
                    source={icons.locationcenter}
                ></Image>
            </TouchableOpacity>
        )
    }
    function renderSearchModal() {
        return (
            <Modal
                transparent
                visible={isModalVisible}
                animationType='slide'
                onRequestClose={() => { setModalVisible(!isModalVisible) }}
            >
                <View style={{
                    flex: 0.3,
                    backgroundColor: "rgba(0,0,0,0.8)"
                }}>
                    <View
                        style={{

                            width: "100%",
                            height: 30,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => { setModalVisible(!isModalVisible) }}
                        >
                            <Image
                                style={{
                                    position: 'absolute',
                                    height: 25,
                                    width: 25,
                                    left: 15,
                                    top: 10,
                                    tintColor: COLORS.white,
                                }}
                                source={icons.back}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            paddingTop: 50,
                            alignItems: 'center',
                            borderColor: COLORS.black,
                            borderWidth: 1
                        }}
                    >
                        <View
                            style={
                                {
                                    width: '95%',
                                    height: 50,
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.white,
                                    marginBottom: 5,
                                    borderRadius: SIZES.radius
                                }

                            }
                        >
                            <View
                                style={{
                                    flex: 2,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <View
                                    style={{
                                        padding: SIZES.base,
                                        backgroundColor: COLORS.lightGray,
                                        borderRadius: 25
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 20,
                                            height: 20,
                                            borderRadius: 20,
                                            backgroundColor: COLORS.blue
                                        }}
                                    />
                                </View>

                            </View>

                            <TextInput
                                placeholder='From'
                                placeholderTextColor={COLORS.gray}
                                style={
                                    {
                                        flex: 10,
                                        paddingHorizontal: SIZES.base,
                                    }

                                }
                            />

                        </View>
                        <View
                            style={
                                {
                                    width: "95%",
                                    height: 50,
                                    flexDirection: 'row',
                                    backgroundColor: COLORS.white,
                                    borderRadius: SIZES.radius
                                }

                            }
                        >
                            <View
                                style={{
                                    flex: 2,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <View
                                    style={{
                                        padding: 5,
                                        borderRadius: SIZES.radius,
                                        backgroundColor: COLORS.blue
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: COLORS.white
                                        }}
                                    />
                                </View>

                            </View>
                            <TextInput
                                placeholder='To'

                                placeholderTextColor={COLORS.gray}
                                style={
                                    {
                                        flex: 10,
                                        paddingHorizontal: SIZES.base,
                                    }
                                }
                            />
                        </View>
                        <View
                            style={{
                                width: 4,
                                height: 45,
                                backgroundColor: COLORS.blue,
                                position: 'absolute',
                                top: 80,
                                left: 39.5,
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            height: 30,
                            marginTop: SIZES.radius,
                            alignItems: 'flex-end',

                        }}
                    >
                        <Image
                            style={{
                                height: 25,
                                width: 25,
                                tintColor: COLORS.white,
                                marginRight: SIZES.padding
                            }}
                            source={icons.go}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 0.7,
                    backgroundColor: COLORS.gray
                }}>
                    <FlatList


                        data={searchResult}
                        renderItem={({ item, index }) => {
                            return (
                                <SearchResultCard handlePress = { ()=>{setResultVisible(!isResultVisible)}} />
                            )
                        }}

                    >



                    </FlatList>

                </View>
            </Modal>
        )
    }

    return (
        <View style={styles.HOME}>
            {renderSearchResultModal()}
            {renderMap()}
            {renderSwipeUpModal()}
            {renderSearchBar()}
            {renderSearchModal()}
            
        </View>
    )
}

export default Home

const styles = StyleSheet.create({

    SEARCHBAR:
    {
        height: 50,
        position: 'absolute',
        top: SIZES.padding * 2,
        left: SIZES.padding,
        right: SIZES.padding,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        paddingHorizontal: SIZES.padding * .25,

    },

    SEARCHBARIN: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

    HOME: {
        flex: 1,
        backgroundColor: COLORS.gray
    },

    MAP: {
        flex: 0.7,
    },
    MODAL: {
        flex: 0.3,
        zIndex: 2
    },
})