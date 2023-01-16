import React, { useState } from "react";
import { SafeAreaView, View, Image, ScrollView, StatusBar, TextInput, TouchableOpacity, StyleSheet, Text, } from "react-native";
import { Colors, Fonts, Sizes, } from "../constants/styles";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';
import { SharedElement } from 'react-navigation-shared-element';

const EditProfile = ({ navigation, route }) => {

    const id = route.params.id;

    const [state, setState] = useState({
        name: 'Ziye Zhao',
        email: 'zhaoziyewxy@gmail.com',
        mobileNo: '+1 548xxxxxx',
        password: '123456789',
        showBottomSheet: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        name,
        email,
        mobileNo,
        password,
        showBottomSheet,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {changeProfilePic()}
                    {nameInfo()}
                    {emailInfo()}
                    {mobileNumberInfo()}
                    {passwordInfo()}
                    {updateProfileButton()}
                </ScrollView>
                {changeProfilePicOptionsSheet()}
            </View>
        </SafeAreaView>
    )

    function changeProfilePicOptionsSheet() {
        return (
            <BottomSheet
                isVisible={showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => { updateState({ showBottomSheet: false }) }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => updateState({ showBottomSheet: false })}
                    style={styles.changeProfilePicBottomSheetStyle}
                >
                    <View style={styles.bottomSheetIndicatorStyle} />
                    <Text style={{ ...Fonts.blackColor18Medium, textAlign: 'center' }}>
                        Choose Option
                    </Text>
                    <View style={{ marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <Text style={{ ...Fonts.blackColor14Regular, }}>
                            Take a picture
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                        <Text style={{ ...Fonts.blackColor14Regular, }}>
                            Select from gallery
                        </Text>
                    </View>
                </TouchableOpacity>
            </BottomSheet>
        )
    }

    function updateProfileButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.updateProfileButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Update Profile
                </Text>
            </TouchableOpacity>
        )
    }

    function passwordInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 10.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Password
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        value={password}
                        onChangeText={(value) => updateState({ password: value })}
                        style={{ ...Fonts.blackColor14Medium, height: 20.0 }}
                        secureTextEntry={true}
                        selectionColor={Colors.primaryColor}
                    />
                </View>
            </View>
        )
    }

    function mobileNumberInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 10.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Mobile Number
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        value={mobileNo}
                        onChangeText={(value) => updateState({ mobileNo: value })}
                        style={{ ...Fonts.blackColor14Medium, height: 20.0 }}
                        keyboardType="numeric"
                    />
                </View>
            </View>
        )
    }

    function emailInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 10.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Email Address
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        value={email}
                        onChangeText={(value) => updateState({ email: value })}
                        style={{ ...Fonts.blackColor14Medium, height: 20.0 }}
                        selectionColor={Colors.primaryColor}
                        keyboardType="email-address"
                    />
                </View>
            </View>
        )
    }

    function nameInfo() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding + 10.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Name
                </Text>
                <View style={styles.textFieldWrapStyle}>
                    <TextInput
                        value={name}
                        onChangeText={(value) => updateState({ name: value })}
                        style={{ ...Fonts.blackColor14Medium, height: 20.0 }}
                        selectionColor={Colors.primaryColor}
                    />
                </View>
            </View>
        )
    }

    function changeProfilePic() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ showBottomSheet: true })}
                style={{ margin: Sizes.fixPadding * 2.0, alignItems: 'center' }}
            >
                <SharedElement id={id}>
                    <Image
                        source={require('../assets/user.jpg')}
                        style={{ width: 100.0, height: 100.0, borderRadius: 50.0, }}
                    />
                </SharedElement>
                <View style={styles.changeOptionWrapStyle}>
                    <Ionicons
                        name="camera-outline"
                        color={Colors.whiteColor}
                        size={16}
                    />
                    <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.whiteColor12Medium }}>
                        Change
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.blackColor}
                    size={22}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding, flex: 1, ...Fonts.blackColor20Medium }}>
                    Edit Profile
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightWhiteColor,
        elevation: 3.0,
    },
    changeOptionWrapStyle: {
        position: 'absolute',
        bottom: -5.0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        borderColor: Colors.whiteColor,
        borderWidth: 1.0,
        elevation: 8.0,
        shadowColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding - 8.0,
    },
    textFieldWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 5.0,
    },
    updateProfileButtonStyle: {
        backgroundColor: Colors.primaryColor,
        shadowColor: Colors.primaryColor,
        elevation: 2.0,
        borderColor: 'rgba(251, 192, 45, 0.2)',
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 6.0,
        marginVertical: Sizes.fixPadding + 10.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
    },
    changeProfilePicBottomSheetStyle: {
        backgroundColor: Colors.whiteColor,
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding + 5.0,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
    },
    bottomSheetIndicatorStyle: {
        backgroundColor: Colors.primaryColor,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding - 5.0, height: 2.0,
        width: 120.0,
        marginVertical: Sizes.fixPadding,
    }
});

export default EditProfile;