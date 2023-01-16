import React, { useState } from "react";
import { SafeAreaView, View, Dimensions, StatusBar, Image, TouchableOpacity, ScrollView, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { SharedElement } from 'react-navigation-shared-element';

const { width } = Dimensions.get('window');

const Profile = ({ navigation }) => {

    const [state, setState] = useState({
        showLogoutDialog: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        showLogoutDialog,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0, }}
                >
                    {accountInfo()}
                    {profileOptions()}
                    {logoutOption()}
                </ScrollView>
                {logoutDialog()}
            </View>
        </SafeAreaView>
    )

    function logoutDialog() {
        return (
            <Dialog.Container
                visible={showLogoutDialog}
                contentStyle={styles.logoutDialogStyle}
                headerStyle={{ margin: 0.0 }}
                onRequestClose={() => updateState({ showLogoutDialog: false })}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor18Medium, }}>
                        Sure you want to Logout?
                    </Text>
                    <View style={{ marginTop: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ showLogoutDialog: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.primaryColor18Bold }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                updateState({ showLogoutDialog: false })
                                navigation.push('Login')
                            }}
                            style={styles.logoutButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor18Bold }}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container>
        )
    }

    function logoutOption() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ showLogoutDialog: true })}
                style={styles.profileOptionWrapStyle}
            >
                <Text style={{ flex: 1, ...Fonts.primaryColor16Regular }}>
                    Logout
                </Text>
                <MaterialIcons
                    name="arrow-forward-ios"
                    color={Colors.primaryColor}
                    size={12}
                />
            </TouchableOpacity>
        )
    }

    function profileOptions() {
        return (
            <View>
                {profileOptionsSort({ option: 'Wallet', navigateTo: 'Wallet' })}
                {profileOptionsSort({ option: 'My Vehicles Type', navigateTo: 'Vehicles' })}
            </View>
        )
    }

    function profileOptionsSort({ option, navigateTo }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push(navigateTo)}
                style={styles.profileOptionWrapStyle}
            >
                <Text style={{ flex: 1, ...Fonts.blackColor16Regular }}>
                    {option}
                </Text>
                <MaterialIcons
                    name="arrow-forward-ios"
                    color={Colors.blackColor}
                    size={12}
                />
            </TouchableOpacity>
        )
    }

    function accountInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('EditProfile', { id: 'photo' })}
                style={styles.accountInfoWrapStyle}
            >
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <SharedElement id={'photo'}>
                        <Image
                            source={require('../assets/user.jpg')}
                            style={{ width: 60.0, height: 60.0, borderRadius: 30.0, }}
                        />
                    </SharedElement>
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                        <Text style={{ ...Fonts.blackColor18Medium }}>
                            Ziye Zhao
                        </Text>
                        <Text style={{ ...Fonts.grayColor16Regular }}>
                            +1 587xxxxxxx
                        </Text>
                    </View>
                </View>
                <View style={styles.editButtonStyle}>
                    <Image
                        source={require('../assets/favicon.png')}
                        style={{ width: 18.0, height: 18.0, resizeMode: 'contain' }}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor20Medium }}>
                    Account
                </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    headerWrapStyle: {
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.lightWhiteColor,
        elevation: 3.0,
    },
    editButtonStyle: {
        backgroundColor: Colors.primaryColor,
        elevation: 3.0,
        shadowColor: Colors.primaryColor,
        width: 40.0, height: 40.0,
        borderRadius: 20.0,
        alignItems: 'center', justifyContent: 'center'
    },
    accountInfoWrapStyle: {
        margin: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileOptionWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding,
        borderColor: '#E6E6E6',
        borderRadius: Sizes.fixPadding,
        borderWidth: 1.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logoutDialogStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 40,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingBottom: Sizes.fixPadding * 2.5,
    },
    cancelButtonStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderColor: '#ececec',
        borderWidth: 1.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Sizes.fixPadding,
    },
    logoutButtonStyle: {
        backgroundColor: Colors.primaryColor,
        elevation: 3.0,
        borderColor: 'rgba(251, 192, 45, 0.2)',
        borderWidth: 1.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primaryColor,
        marginLeft: Sizes.fixPadding,
    }
});

export default Profile;