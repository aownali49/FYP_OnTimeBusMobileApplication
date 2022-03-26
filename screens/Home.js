import { StyleSheet, Text, View, Animated, Image, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import SlidingUpPanel from 'rn-sliding-up-panel';



const Home = () => {

    let _panel = useRef(null);

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
    const _draggedValue = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        _draggedValue.addListener((valueObject) => {
            if (valueObject.value > SIZES.height) { setDragging(false); }

        })

        return () => {
            _draggedValue.removeAllListeners();
        }

    }, []);


    function renderMap() {
        return (
            <View style={styles.MAP}>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
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
                        top: SIZES.height-120,
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
                           
                            renderItem={({ item, index }) => {
                                return (
                                    <View 
                                        style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                            paddingTop:SIZES.padding,
                                            paddingLeft:SIZES.padding*0.3,
                                        }}
                                    >
                                        <View
                                            style={{
                                                width:35,
                                                height:35
                                            }}
                                        >
                                            <Image 
                                                source={icons.bus}
                                                resizeMode="cover"
                                                style={{
                                                    width:25,
                                                    height:25
                                                }}
                                            />
                                        </View>
                                        <View 
                                            style={{
                                                flex:1
                                            }}
                                        >
                                            <Text 
                                                style={{
                                                    color:COLORS.black,
                                                    ...FONTS.body3
                                                }}
                                            >{item?.name}</Text>
                                            <Text
                                                style={{
                                                    color:COLORS.black,
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
                    onPress={() => { }}
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

    return (
        <View style={styles.HOME}>
            {renderMap()}
            {renderSwipeUpModal()}
            {renderSearchBar()}
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
    },
})