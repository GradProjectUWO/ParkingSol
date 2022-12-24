import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

export default class Mainpage extends React.Component {
    render() {
        return (
            <View style={styles.container}>

                <Text>This is a Mainpage Screen where you can make selections!</Text>
                
                <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Booking')}
                        title="Go to Booking"
                        color="#FF3D00"
                    />
                </View> 

                <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Mapping')}
                        title="Go to Mapping"
                        color="#FF3D00"
                    />  
                </View>

                <View style={[{ width: "90%", margin: 10, backgroundColor: "red" }]}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Profile')}
                        title="Go to Profile"
                        color="#FF3D00"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

