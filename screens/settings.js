import { StyleSheet, Text, View, Image, ImageBackground, FlatList, Pressable } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { COLORS, images, SIZES, icons } from '../constants'
import { Card } from 'react-native-shadow-cards';

const Settings = ({ navigation }) => {
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
            <View>
              <Text
                style={styles.headingTextStyle}
              >
                App Settings:
              </Text>
            </View>

          )
        }}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={()=>{navigation.navigate(item.targetAddress)}}>
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
    color: COLORS.black,
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

  },
  settingsTextStyle: {
    // borderColor:COLORS.black,
    // borderWidth:1,
    color: COLORS.black,
    paddingLeft: 15,
    fontSize: 25,
    fontWeight: '600',
    fontFamily: 'Ubuntu-Regular',
    alignSelf: 'center'
  }
})