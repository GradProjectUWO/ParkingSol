import React, { useState, createRef, useCallback } from 'react'
import { BackHandler, SafeAreaView, Dimensions, View, ScrollView, TouchableOpacity, StatusBar, StyleSheet, Text } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Input } from '@rneui/themed';
import { Colors, Fonts, Sizes, } from "../constants/styles";

const { width } = Dimensions.get('window');

const Login = ({ navigation }) => {
    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        userName: null,
        password: null,
        passwordSecure: true,
        backClickCount: 0
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        userName,
        password,
        passwordSecure,
        backClickCount,
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
                    {userNameTextField()}
                    {passwordTextField()}
                    {forgetPasswordText()}
                    {loginButton()}
                    {dontAccountInfo()}
                </ScrollView>
            </View>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor12Medium }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    )

    function dontAccountInfo() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ ...Fonts.grayColor16Regular }}>
                    Don’t have account?
                </Text>
                <Text
                    onPress={() => navigation.push('Signup')}
                    style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.primaryColor16Medium }}
                >
                    Register Now
                </Text>
            </View>
        )
    }

    function loginButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Signup')}
                style={styles.loginButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Login
                </Text>
            </TouchableOpacity>
        )
    }

    function forgetPasswordText() {
        return (
            <Text style={styles.forgetPasswordTextStyle}>
                Forget Password?
            </Text>
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
                placeholder='Password'
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
                    size: 14,
                    onPress: () => { updateState({ passwordSecure: !passwordSecure }) }
                }}
                style={{ ...Fonts.blackColor14Regular, marginLeft: Sizes.fixPadding - 2.0 }}
                inputContainerStyle={{ ...styles.textFieldWrapStyle }}
                containerStyle={styles.textFieldStyle}
            />
        )
    }

    function userNameTextField() {
        const input = createRef();
        return (
            <Input
                ref={input}
                value={userName}
                onChangeText={(text) => updateState({ userName: text })}
                selectionColor={Colors.primaryColor}
                placeholder='User Name'
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

    function header() {
        return (
            <Text style={styles.loginTitleStyle}>
                Login
            </Text>
        )
    }

}

const styles = StyleSheet.create({
    loginTitleStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 6.0,
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
    loginButtonStyle: {
        backgroundColor: Colors.primaryColor,
        shadowColor: Colors.primaryColor,
        elevation: 2.0,
        borderColor: 'rgba(251, 192, 45, 0.2)',
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 6.0,
        marginBottom: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 4.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    }
});


export default Login;