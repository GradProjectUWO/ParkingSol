import React, { useState, createRef } from "react";
import { SafeAreaView, Dimensions, View, ScrollView, TouchableOpacity, StatusBar, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Input } from '@rneui/themed';

const { width } = Dimensions.get('window');

const Signup = ({ navigation }) => {

    const [state, setState] = useState({
        name: null,
        email: null,
        mobileNo: null,
        password: null,
        passwordSecure: true,
        confirmPassword: null,
        confirmPasswordSecure: true,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        name,
        email,
        mobileNo,
        password,
        passwordSecure,
        confirmPassword,
        confirmPasswordSecure,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: Sizes.fixPadding, }}
                >
                    {registerTitle()}
                    {nameTextField()}
                    {emailTextField()}
                    {mobileNumberTextField()}
                    {passwordTextField()}
                    {confirmPasswordTextField()}
                    {registerButton()}
                    {alreadyAccountInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function header() {
        return (
            <MaterialIcons
                name="arrow-back-ios"
                color={Colors.blackColor}
                size={22}
                onPress={() => navigation.pop()}
                style={{ margin: Sizes.fixPadding * 2.0, }}
            />
        )
    }

    function alreadyAccountInfo() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ ...Fonts.grayColor16Regular }}>
                    Already have account?
                </Text>
                <Text
                    onPress={() => navigation.push('Login')}
                    style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.primaryColor16Medium }}
                >
                    Login Now
                </Text>
            </View>
        )
    }

    function registerButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Mainpage')}
                style={styles.registerButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Register
                </Text>
            </TouchableOpacity>
        )
    }

    function confirmPasswordTextField() {
        const input = createRef();
        return (
            <Input
                ref={input}
                value={confirmPassword}
                onChangeText={(text) => updateState({ confirmPassword: text })}
                selectionColor={Colors.primaryColor}
                placeholder='Confirm Password'
                placeholderTextColor={Colors.grayColor}
                leftIcon={{
                    type: 'material',
                    color: Colors.grayColor,
                    name: 'lock-outline',
                    size: 16,
                    onPress: () => { input.current.focus() }
                }}
                secureTextEntry={confirmPasswordSecure}
                rightIcon={{
                    type: 'material-community',
                    color: Colors.grayColor,
                    name: confirmPasswordSecure ? 'eye-off-outline' : 'eye-outline',
                    size: 12,
                    onPress: () => { updateState({ confirmPasswordSecure: !confirmPasswordSecure }) }
                }}
                style={{ ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding - 2.0 }}
                inputContainerStyle={{ ...styles.textFieldWrapStyle }}
                containerStyle={{ marginBottom: Sizes.fixPadding * 3.0, ...styles.textFieldStyle }}
            />
        )
    }

    function passwordTextField() {
        const input = createRef();
        return (
            <Input
                ref={input}
                value={password}
                onChangeText={(text) => updateState({ password: text })}
                selectionColor={Colors.primaryColor}
                placeholder='Create Password'
                placeholderTextColor={Colors.grayColor}
                leftIcon={{
                    type: 'material',
                    color: Colors.grayColor,
                    name: 'lock-outline',
                    size: 16,
                    onPress: () => { input.current.focus() }
                }}
                secureTextEntry={passwordSecure}
                rightIcon={{
                    type: 'material-community',
                    color: Colors.grayColor,
                    name: passwordSecure ? 'eye-off-outline' : 'eye-outline',
                    size: 12,
                    onPress: () => { updateState({ passwordSecure: !passwordSecure }) }
                }}
                style={{ ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding - 2.0 }}
                inputContainerStyle={{ ...styles.textFieldWrapStyle }}
                containerStyle={{ marginBottom: Sizes.fixPadding * 3.0, ...styles.textFieldStyle }}
            />
        )
    }

    function mobileNumberTextField() {
        const input = createRef();
        return (
            <Input
                ref={input}
                value={mobileNo}
                onChangeText={(text) => updateState({ mobileNo: text })}
                selectionColor={Colors.primaryColor}
                placeholder='Mobile Number'
                placeholderTextColor={Colors.grayColor}
                keyboardType="numeric"
                leftIcon={{
                    type: 'material-community',
                    color: Colors.grayColor,
                    name: 'cellphone-information',
                    size: 16,
                    onPress: () => { input.current.focus() }
                }}
                style={{ ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding - 2.0 }}
                inputContainerStyle={{ ...styles.textFieldWrapStyle }}
                containerStyle={{ marginBottom: Sizes.fixPadding * 3.0, ...styles.textFieldStyle }}
            />
        )
    }

    function emailTextField() {
        const input = createRef();
        return (
            <Input
                ref={input}
                value={email}
                onChangeText={(text) => updateState({ email: text })}
                selectionColor={Colors.primaryColor}
                placeholder='Email Address'
                placeholderTextColor={Colors.grayColor}
                leftIcon={{
                    type: 'material-community',
                    color: Colors.grayColor,
                    name: 'email-outline',
                    size: 16,
                    onPress: () => { input.current.focus() }
                }}
                style={{ ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding - 2.0 }}
                inputContainerStyle={{ ...styles.textFieldWrapStyle }}
                containerStyle={{ marginBottom: Sizes.fixPadding * 3.0, ...styles.textFieldStyle }}
                keyboardType="email-address"
            />
        )
    }

    function nameTextField() {
        const input = createRef();
        return (
            <Input
                ref={input}
                value={name}
                onChangeText={(text) => updateState({ name: text })}
                selectionColor={Colors.primaryColor}
                placeholder='Name'
                placeholderTextColor={Colors.grayColor}
                leftIcon={{
                    type: 'ant-design',
                    color: Colors.grayColor,
                    name: 'user',
                    size: 16,
                    onPress: () => { input.current.focus() }
                }}
                style={{ ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding - 2.0 }}
                inputContainerStyle={{ ...styles.textFieldWrapStyle }}
                containerStyle={{ marginBottom: Sizes.fixPadding * 3.0, marginTop: Sizes.fixPadding * 2.0, ...styles.textFieldStyle }}
            />
        )
    }

    function registerTitle() {
        return (
            <Text style={styles.registerTitleStyle}>
                Register
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    registerTitleStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
        textAlign: 'center',
        ...Fonts.blackColor20Medium,
    },
    textFieldStyle: {
        height: 40.0,
        width: width - 25.0,
        alignSelf: 'center',
    },
    textFieldWrapStyle: {
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 7.0,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding,
        borderColor: '#ececec',
        borderWidth: 1.0,
        backgroundColor: Colors.whiteColor,
        borderBottomColor: Colors.whiteColor,
        borderBottomWidth: 1.0,
    },
    forgetPasswordTextStyle: {
        marginTop: Sizes.fixPadding + 10.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignSelf: 'flex-end',
        ...Fonts.grayColor12Medium,
    },
    registerButtonStyle: {
        backgroundColor: Colors.greenColor,
        shadowColor: Colors.greenColor,
        elevation: 2.0,
        borderColor: 'rgba(251, 192, 45, 0.2)',
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 6.0,
        marginBottom: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
    },
});

export default Signup;

