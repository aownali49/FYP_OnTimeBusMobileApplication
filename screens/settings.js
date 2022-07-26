import { StyleSheet, Text, View, Image, ImageBackground, FlatList, Pressable } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { COLORS, images, SIZES, icons } from '../constants'
import { Card } from 'react-native-shadow-cards';



const Settings = ({ navigation }) => {

  const [userInfo, setUserInfo] = useState({
    image: icons.accSettings,
    fullName: 'Usman Karamat',
    email:'muhammed.usman77@gmail.com'
  })

  const [settingsList, setSettingsList] = useState([
    {
      settingName: "Profile Settings",
      targetAddress: "Profile",
      icon: icons.accSettings
    },
    {
      settingName: "Notifications",
      targetAddress: "",
      icon: icons.notification
    },
    {
      settingName: "Help",
      targetAddress: "",
      icon: icons.help
    },
    {
      settingName: "Balance",
      targetAddress: 'Balance',
      icon: icons.balance
    },
    {
      settingName: "About",
      targetAddress: "",
      icon: icons.about
    },

  ])
  return (
    <View
      style={styles.containerStyle}
    >
      <FlatList
        style={styles.listStyle}
        data={settingsList}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            <Card
              style={{
                flexDirection: 'row',
                marginBottom: 20,
                borderRadius: 20,
                height: 120,
                alignSelf: 'center',
              }}
            >
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <View
                  style={{
                    height: 70,
                    width: 70,
                    backgroundColor: COLORS.mailaWhite,
                    borderRadius: 70,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Image
                    style={{
                      height: 35,
                      width: 35,
                      tintColor: COLORS.RupeesPink
                    }}
                    source={icons.accSettings}
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 0.7,
                  justifyContent:'center'
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    fontFamily: 'Ubuntu-Bold',
                    color: COLORS.gray
                  }}
                >{userInfo.fullName}</Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Ubuntu-Regular',
                    color: COLORS.gray
                  }}
                >{userInfo.email}</Text>
              </View>

            </Card>

          )
        }}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => { navigation.navigate(item.targetAddress) }}>
              <Card
                style={styles.cardStyle}
              >
                <Image
                  source={item.icon}
                  resizeMode="cover"
                  style={styles.iconStyle}

                />
                <Text
                  style={styles.settingsTextStyle}
                >{item.settingName}</Text>
              </Card>
            </Pressable>
          )
        }}
      />
    </View >

  )
}

export default Settings

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: COLORS.BluishBalance,
  },
  listStyle: {
    top: 30,
    alignSelf: 'center',
    marginBottom: 70,
    width: SIZES.width,
    // borderColor: COLORS.black,
    // borderWidth: 1,
  },
  headingTextStyle:
  {
    color: COLORS.gray,
    paddingLeft: 15,
    fontSize: 25,
    fontWeight: '600',
    fontFamily: 'Ubuntu-Regular',
    marginBottom: 15
  },
  cardStyle:
  {
    height: 70,
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: 20,
    elevation: 6,
    marginBottom: 10
  },
  iconStyle: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginLeft: 10,
    tintColor: COLORS.RupeesPink

  },
  settingsTextStyle: {
    // borderColor:COLORS.black,
    // borderWidth:1,
    color: COLORS.gray,
    paddingLeft: 15,
    fontSize: 25,
    fontWeight: '600',
    fontFamily: 'Ubuntu-Regular',
    alignSelf: 'center'
  }
})