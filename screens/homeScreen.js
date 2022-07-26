import { StyleSheet, Text, View,Image } from 'react-native'
//import MapView from 'react-native-maps'; 
import React from 'react'
import { dummy, COLORS, SIZES, FONTS, icons, images } from "../constants";
import MapView from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';


const HomeScreen = ({ navigation }) => {

  function renderHeader() {
    return (
      <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.padding,
            alignItems: 'center',

        }}>
          <TouchableOpacity
            style={{
              width: 45,
              height: 45, 
              alignContent: 'center',
              justifyContent: 'center',
            }}
            onPress = {()=>{console.log("Side Drawer")}}
          >
            <Image 
              source = {icons.side_drawer}
              resizeMode = "contain"
              style = {{
                width: 25, 
                height:25,
                tintColor: COLORS.white
              }}
            
            />
          </TouchableOpacity>
          <View
            style= {{flex:1,alignItems: 'center',justifyContent:'center'}}
          >
            <Text style= {{color: COLORS.white, ...FONTS.h3}}>Asia</Text>
          </View>
          <TouchableOpacity 
            onPress={()=>{console.log("Profile")}} 
          >
          </TouchableOpacity>
      </View>
    )
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}
    >
    {renderHeader()}

    </SafeAreaView>
  )
}

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontFamily: "Ubuntu-Regular",
    fontSize: 30,
    lineHeight: 36
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
