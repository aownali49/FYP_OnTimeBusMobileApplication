import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen, SettingScreen, ProfileScreen, Home, Login, Signup,Splash } from "../screens";
import { StyleSheet, Text, View, Image } from 'react-native';
import { COLORS, FONTS, icons } from "../constants/index"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const BottomTab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const BaseStack = createNativeStackNavigator();

const BottomTabShow = () => {

    return (
        <BottomTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: COLORS.black,
                    borderTopColor: "transparent",
                    height: 50
                }
            }}
        >
            <BottomTab.Screen name="Profile" component={ProfileScreen}

                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.profile}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? COLORS.blue : COLORS.white

                                }}
                            />
                        </View>
                    )
                }}
            />
            <BottomTab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.bus}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? COLORS.blue : COLORS.white
                                }}
                            />
                        </View>
                    )
                }}
            />
            <BottomTab.Screen name="Settings" component={SettingScreen}

                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={icons.settings}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: focused ? COLORS.blue : COLORS.white
                                }}
                            />
                        </View>
                    )
                }}
            />
        </BottomTab.Navigator>
    )

}

const AuthStackShow = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="Signup" component={Signup} />
            <AuthStack.Screen name="Splash" component={Splash} />
        </AuthStack.Navigator>
    )
}

const Index = () => {
    return (
        <NavigationContainer>
            <BaseStack.Navigator screenOptions={{ headerShown: false }}>
                <BaseStack.Screen name="Authentication" component={AuthStackShow} />
                <BaseStack.Screen name="Home" component={BottomTabShow} />
            </BaseStack.Navigator>
        </NavigationContainer>
    )
}
const styles = StyleSheet.create({
    myView: {
        alignItems: 'center',
        justifyContent: 'center',
    },


    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        backgroundColor: COLORS.black,
        borderTopColor: "transparent",
        height: 100
    }



});


export default Index