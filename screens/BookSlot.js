import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, ScrollView, TouchableOpacity, FlatList, Dimensions, Image, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import DashedLine from 'react-native-dashed-line';

const { width } = Dimensions.get('window');

const durationsList = [
    {
        id: '1',
        time: '30 min',
        amount: 3.00,
    },
    {
        id: '2',
        time: '1 hour',
        amount: 6.00,
    },
    {
        id: '3',
        time: '2 hour',
        amount: 8.00,
    },
    {
        id: '4',
        time: '4 hour',
        amount: 10.00,
    },
    {
        id: '5',
        time: '6 hour',
        amount: 14.00,
    },
    {
        id: '6',
        time: '8 hour',
        amount: 16.00,
    },
    {
        id: '7',
        time: '12 hour',
        amount: 20.00,
    },
];

const parkingslotsList = [
    {
        entryRight1: [
            {
                slotNo: 'C101',
                isAvailable: true,
            },
            {
                slotNo: 'C102',
                isAvailable: true,
            },
            {
                slotNo: 'C103',
                isAvailable: true,
            },
            {
                slotNo: 'C104',
                isAvailable: false,
            },
            {
                slotNo: 'C105',
                isAvailable: false,
            },
            {
                slotNo: 'C106',
                isAvailable: true,
            },
            {
                slotNo: 'C107',
                isAvailable: false,
            },
            {
                slotNo: 'C108',
                isAvailable: true,
            },
            {
                slotNo: 'C109',
                isAvailable: true,
            },
        ],
        entryLeft1: [
            {
                slotNo: 'B101',
                isAvailable: true,
            },
            {
                slotNo: 'B102',
                isAvailable: false,
            },
            {
                slotNo: 'B103',
                isAvailable: true,
            },
            {
                slotNo: 'B104',
                isAvailable: false,
            },
            {
                slotNo: 'B105',
                isAvailable: true,
            },
            {
                slotNo: 'B106',
                isAvailable: true,
            },
            {
                slotNo: 'B107',
                isAvailable: false,
            },
            {
                slotNo: 'B108',
                isAvailable: false,
            },
            {
                slotNo: 'B109',
                isAvailable: false,
            },
        ],
        entryLeft2: [
            {
                slotNo: 'B201',
                isAvailable: true,
            },
            {
                slotNo: 'B202',
                isAvailable: true,
            },
            {
                slotNo: 'B203',
                isAvailable: false,
            },
            {
                slotNo: 'B204',
                isAvailable: true,
            },
            {
                slotNo: 'B205',
                isAvailable: false,
            },
            {
                slotNo: 'B206',
                isAvailable: false,
            },
            {
                slotNo: 'B207',
                isAvailable: true,
            },
            {
                slotNo: 'B208',
                isAvailable: true,
            },
            {
                slotNo: 'B209',
                isAvailable: true,
            },
        ],
    }
];

const BookSlotScreen = ({ navigation }) => {

    const [state, setState] = useState({
        selectedDurationIndex: 1,
        selectedPaymentModeIndex: 1,
        selectedParkingSlotNo: parkingslotsList[0].entryLeft2[0].slotNo,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        selectedDurationIndex,
        selectedPaymentModeIndex,
        selectedParkingSlotNo,
    } = state;

    const slorRowsBeforeExit = 6;
    const isExitMiddle = true;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {selectVehicalInfo()}
                    {selectDurationInfo()}
                    {selectPaymentMethodInfo()}
                    {selectParkingSlotInfo()}
                </ScrollView>
            </View>
            {payButton()}
        </SafeAreaView>
    )

    function payButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('BookingSuccessfull')}
                style={styles.payButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Pay $6.00
                </Text>
            </TouchableOpacity>
        )
    }

    function selectParkingSlotInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Regular }}>
                    Select Parking Slot
                </Text>
                {
                    isExitMiddle
                        ?
                        <>
                            {beforeExitSlots()}
                            {exitInfo()}
                            {afterExitSlots()}
                        </>
                        :
                        <>
                            {beforeExitSlots()}
                            {exitInfo()}
                        </>
                }
            </View>
        )
    }

    function afterExitSlots() {
        return (
            <View style={{ flexDirection: 'row', }}>
                {
                    parkingslotsList[0].entryRight1
                        ?
                        parkingSlotSort({
                            slotArray: parkingslotsList[0].entryRight1,
                            style: { borderBottomWidth: 1.0 },
                            afterExit: true,
                        })
                        :
                        null
                }
                <View style={{ width: 41.0, alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <View style={{ flex: 1, marginBottom: Sizes.fixPadding - 5.0, }}>
                        <DashedLine
                            axis='vertical'
                            dashLength={25}
                            dashThickness={1.5}
                            dashColor={Colors.blackColor}
                            dashGap={12}
                            style={{ width: '100%', height: '100%', }}
                        />
                    </View>
                </View>
                {
                    parkingslotsList[0].entryLeft2
                        ?
                        parkingSlotSort({
                            slotArray: parkingslotsList[0].entryLeft2,
                            style: { borderRightWidth: 1.0, borderBottomWidth: 1.0, borderLeftWidth: 0.0, borderBottomWidth: 1.0 },
                            afterExit: true,
                        })
                        :
                        null
                }
                {
                    parkingslotsList[0].entryLeft1
                        ?
                        parkingSlotSort({
                            slotArray: parkingslotsList[0].entryLeft1,
                            style: { borderBottomWidth: 1.0, },
                            afterExit: true,
                        })
                        :
                        null
                }
            </View>
        )
    }

    function beforeExitSlots() {
        return (
            <View style={{ flexDirection: 'row', }}>
                {
                    parkingslotsList[0].entryRight1
                        ?
                        parkingSlotSort({
                            slotArray: parkingslotsList[0].entryRight1,
                            style: { borderBottomWidth: 1.0 }
                        })
                        :
                        null
                }
                {entryInfo()}
                {
                    parkingslotsList[0].entryLeft2
                        ?
                        parkingSlotSort({
                            slotArray: parkingslotsList[0].entryLeft2,
                            style: { borderRightWidth: 1.0, borderBottomWidth: 1.0, borderLeftWidth: 0.0, çborderBottomWidth: 1.0 }
                        })
                        :
                        null
                }
                {
                    parkingslotsList[0].entryLeft1
                        ?
                        parkingSlotSort({
                            slotArray: parkingslotsList[0].entryLeft1,
                            style: { borderBottomWidth: 1.0, }
                        })
                        :
                        null
                }
            </View>
        )
    }

    function entryInfo() {
        return (
            <View style={{ alignItems: 'center', marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Regular }}>
                    Entry
                </Text>
                <View
                    style={{ backgroundColor: Colors.blackColor, height: 50.0, width: 1.5, }}
                />
                <MaterialIcons
                    name="keyboard-arrow-down"
                    size={24}
                    color={Colors.blackColor}
                    style={{ marginTop: Sizes.fixPadding - 25.0, }}
                />
                <View style={{ flex: 1, marginTop: Sizes.fixPadding, marginBottom: Sizes.fixPadding - 5.0, }}>
                    <DashedLine
                        axis='vertical'
                        dashLength={25}
                        dashThickness={1.5}
                        dashColor={Colors.blackColor}
                        dashGap={12}
                        style={{ width: '100%', height: '100%', }}
                    />
                </View>
            </View>
        )
    }

    function exitInfo() {
        return (
            <View style={{ marginLeft: Sizes.fixPadding * 4.0, marginVertical: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                <MaterialIcons
                    name="keyboard-arrow-left"
                    size={24}
                    color={Colors.blackColor}
                    style={{ marginRight: Sizes.fixPadding - 25.0, }}
                />
                <View style={{ width: 50.0, backgroundColor: Colors.blackColor, height: 1.5 }} />
                <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.blackColor18Regular }}>
                    Exit
                </Text>
                <View style={{ width: 50.0, backgroundColor: Colors.blackColor, height: 1.5 }} />
                <MaterialIcons
                    name="keyboard-arrow-right"
                    size={22}
                    color={Colors.blackColor}
                    style={{ marginLeft: Sizes.fixPadding - 25.0, }}
                />
            </View>
        )
    }

    function parkingSlotSort({ slotArray, style, afterExit, }) {
        var arrayStart = afterExit ? slorRowsBeforeExit : 0;
        var arrayEnd = afterExit ? slotArray.length : slorRowsBeforeExit;
        return (
            <View style={{ flex: 1, }}>
                {
                    afterExit
                        ?
                        null :
                        <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor16Regular, textAlign: 'center' }}>
                            {slotArray[0].slotNo.charAt(0)}{slotArray[0].slotNo.charAt(1)}
                        </Text>
                }
                {
                    slotArray.slice(arrayStart, arrayEnd).map((item, index) => (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                item.isAvailable
                                    ?
                                    updateState({ selectedParkingSlotNo: item.slotNo })
                                    :
                                    null
                            }}
                            key={`${item.slotNo}`}
                            style={{
                                ...style,
                                ...styles.parkingSlotStyle,
                                backgroundColor: selectedParkingSlotNo == item.slotNo ? Colors.primaryColor : Colors.whiteColor,
                                justifyContent: item.isAvailable ? 'flex-end' : 'center',
                                paddingHorizontal: item.isAvailable ? 0.0 : Sizes.fixPadding - 5.0,
                                paddingBottom: item.isAvailable ? Sizes.fixPadding - 3.0 : 0.0,
                            }}
                        >
                            {
                                item.isAvailable
                                    ?
                                    <Text style={selectedParkingSlotNo == item.slotNo ? { ...Fonts.whiteColor14Regular } : { ...Fonts.grayColor14Regular }}>
                                        {item.slotNo}
                                    </Text>
                                    :
                                    <Image
                                        source={require('../assets/images/cars/car4.png')}
                                        style={{ width: '100%', resizeMode: 'contain' }}
                                    />
                            }
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    function selectPaymentMethodInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Regular }}>
                    Select Payment Mode
                </Text>
                <View style={styles.paymentAcceptedOptionsWrapStyle}>
                    {paymentOptionsShort({
                        paymentIcon: require('../assets/images/paymentIcons/wallet.png'),
                        paymentMethod: 'Wallet',
                        index: 1,
                    })}
                    {paymentOptionsShort({
                        paymentIcon: require('../assets/images/paymentIcons/payOnSpot.png'),
                        paymentMethod: 'Pay on Spot',
                        index: 2,
                    })}
                    {paymentOptionsShort({
                        paymentIcon: require('../assets/images/paymentIcons/creditCard.png'),
                        paymentMethod: 'Credit Card',
                        index: 3,
                    })}
                    {paymentOptionsShort({
                        paymentIcon: require('../assets/images/paymentIcons/paypal.png'),
                        paymentMethod: 'Paypal',
                        index: 4,
                    })}
                </View>
            </View>
        )
    }

    function paymentOptionsShort({ paymentIcon, paymentMethod, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedPaymentModeIndex: index })}
                style={{
                    backgroundColor: selectedPaymentModeIndex == index ? Colors.primaryColor : Colors.whiteColor,
                    ...styles.paymentOptionWrapStyle,
                    borderColor: selectedPaymentModeIndex == index ? 'rgba(251, 192, 45, 0.2)' : '#fcfcfc',
                }}
            >
                <Image
                    source={paymentIcon}
                    style={{ width: 25.0, height: 25.0, resizeMode: 'contain' }}
                />
                <Text numberOfLines={1} style={selectedPaymentModeIndex == index ? { ...Fonts.whiteColor14Regular } : { ...Fonts.grayColor14Regular }}>
                    {paymentMethod}
                </Text>
            </TouchableOpacity>
        )
    }

    function selectDurationInfo() {
        const renderItem = ({ item, index }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => updateState({ selectedDurationIndex: index })}
                style={{
                    borderColor: selectedDurationIndex == index ? 'rgba(251, 192, 45, 0.2)' : '#fcfcfc',
                    backgroundColor: selectedDurationIndex == index ? Colors.primaryColor : Colors.whiteColor,
                    ...styles.durationInfoWrapStyle
                }}
            >
                <Text style={selectedDurationIndex == index ? { ...Fonts.whiteColor16Medium } : { ...Fonts.blackColor16Medium }}>
                    {item.time}
                </Text>
                <Text style={selectedDurationIndex == index ? { ...Fonts.whiteColor14Regular } : { ...Fonts.grayColor14Regular }}>
                    {`$`}{item.amount.toFixed(2)}
                </Text>
            </TouchableOpacity>
        )
        return (
            <View>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor16Regular }}>
                    Select Duration
                </Text>
                <FlatList
                    data={durationsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: Sizes.fixPadding, paddingLeft: Sizes.fixPadding * 2.0, paddingVertical: Sizes.fixPadding - 5.0, }}
                />
            </View>
        )
    }

    function selectVehicalInfo() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <View style={styles.selectVehicalTitleWrapStyle}>
                    <Text style={{ ...Fonts.blackColor16Regular }}>
                        Select Vehicle
                    </Text>
                    <Text
                        onPress={() => navigation.push('Vehicles')}
                        style={{ ...Fonts.primaryColor16Medium }}
                    >
                        Change
                    </Text>
                </View>
                <View style={styles.carDetailWrapStyle}>
                    <View style={{ flex: 1, }}>
                        <Text style={{ ...Fonts.blackColor14Regular }}>
                            Toyota Matrix
                        </Text>
                        <Text style={{ ...Fonts.grayColor12Medium }}>
                            Hatchback | GJ05NC1710
                        </Text>
                    </View>
                    <View style={{ width: width / 3.0, }}>
                        <Image
                            source={require('../assets/images/cars/car1.png')}
                            style={{ width: '100%', resizeMode: 'contain' }}
                        />
                    </View>
                </View>
            </View>
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
                    Book Slot
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
    carDetailWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        borderRadius: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingRight: Sizes.fixPadding - 5.0,
    },
    selectVehicalTitleWrapStyle: {
        marginBottom: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    durationInfoWrapStyle: {
        borderRadius: Sizes.fixPadding,
        elevation: 3.0,
        paddingHorizontal: Sizes.fixPadding + 10.0,
        paddingVertical: Sizes.fixPadding - 6.0,
        marginRight: Sizes.fixPadding,
        borderWidth: 1.0,
    },
    paymentAcceptedOptionsWrapStyle: {
        marginHorizontal: Sizes.fixPadding + 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    paymentOptionWrapStyle: {
        elevation: 3.0,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: Sizes.fixPadding - 5.0,
        paddingTop: Sizes.fixPadding - 5.0,
        paddingBottom: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding - 5.0,
    },
    parkingSlotStyle: {
        alignItems: 'center',
        borderColor: Colors.grayColor,
        height: 55.0,
    },
    payButtonStyle: {
        backgroundColor: Colors.primaryColor,
        shadowColor: Colors.primaryColor,
        elevation: 2.0,
        borderColor: 'rgba(251, 192, 45, 0.2)',
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 6.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
    },
});

export default BookSlotScreen;