import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

export default class Mainpage extends React.Component {
    render() {
        return (
            <View style={styles.container}>

                <Text>This is a Mainpage Screen where you can make selections!</Text>
                
                <View style={[{ width: "90%", margin: 20, backgroundColor: "black" }]}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Booking')}
                        title="Go to Booking"
                        color="#000000"
                        
                    />
                </View> 

                <View style={[{ width: "90%", margin: 20, backgroundColor: "red" }]}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Mapping')}
                        title="Go to Mapping"
                        color="#000000"
                    />  
                </View>

                <View style={[{ width: "90%", margin: 20, backgroundColor: "red" }]}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Profile')}
                        title="Go to Profile"
                        color="#000000"
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

