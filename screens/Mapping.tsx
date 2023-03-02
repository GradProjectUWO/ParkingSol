import React, {useState, useRef} from 'react'
import MapView , {LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native'
import { Key } from "../constants/key";
import { GooglePlacesAutocomplete, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import MapViewDirections from 'react-native-maps-directions';
import {Colors} from "../constants/styles";
import {MaterialIcons} from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const INTIAL_POSITION = {
    latitude: 42.983612,
    longitude: -81.249725,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
}

type InputAutoCompleteProps = {
    label: string;
    placeholder?: string;
    onPlaceSelected: (details: GooglePlaceDetail | null) => void;
};

function InputAutoComplete({
    label,
    placeholder,
    onPlaceSelected,
}: InputAutoCompleteProps) {
    return (
        <>
            <Text>{label}</Text>

            <GooglePlacesAutocomplete
                styles={{ textInput: styles.Input }}
                placeholder={placeholder || ""}
                fetchDetails
                onPress={(data, details = null) => {
                    onPlaceSelected(details);
                }}
                query={{
                    key: Key.apiKey,
                    language: 'en',
                }}
            />
        </>
    );
}


const Mapping = ({navigation}) => {
    const[origin, setOrigin] = useState<LatLng | null>();
    const[destination, setDestination] = useState<LatLng | null>();
    const[showDirections, setShowDirections] = useState(false);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);

    const mapRef = useRef<MapView>(null);

    const moveTo = async (position: LatLng) => {
        const camera = await mapRef.current?.getCamera()
        if (camera) {
            camera.center = position;
            mapRef.current?.animateCamera(camera, { duration: 1000 });
        }
    };
    const edgePaddingValue  = 70;
    const edgePadding = {
        top: edgePaddingValue,
        right: edgePaddingValue,
        bottom: edgePaddingValue,
        left: edgePaddingValue,
    }

    const traceRouteOnReady = (result: any) => {
        if (result) {
            setDistance(result.distance);
            setDuration(result.duration);
        }
    } 
    const traceRoute = () => {
        if (origin && destination) {
            setShowDirections(true);
            mapRef.current?.fitToCoordinates([origin, destination], {edgePadding})
        }
    }

    const onPlaceSelected = (details: GooglePlaceDetail | null, flag: "origin" | "destination") => {
        const set = flag === "origin" ? setOrigin : setDestination
        const position = {
            latitude: details?.geometry.location.lat || 0,
            longitude: details?.geometry.location.lng || 0
        }
        set(position);
        moveTo(position);
    }
    return (
        <View style={styles.container}>
            {/*<MaterialIcons*/}
            {/*    name="arrow-back-ios"*/}
            {/*    color={Colors.blackColor}*/}
            {/*    size={22}*/}
            {/*    onPress={() => navigation.pop()}*/}
            {/*/>*/}
            <MapView
                ref={mapRef} 
                style={styles.map} 
                provider={PROVIDER_GOOGLE} 
                initialRegion ={INTIAL_POSITION} 
            >

                {origin && <Marker coordinate={origin} />}
                {destination && <Marker coordinate={destination} />}
                {showDirections && origin && destination && (
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={Key.apiKey}
                        strokeColor = "#6644ff"
                        strokeWidth = {4}
                        onReady = {traceRouteOnReady}
                    />
                )}

            </MapView>
            <View style= {styles.searchContainer}>
                <InputAutoComplete label= "Origin" onPlaceSelected={(details) => {
                    onPlaceSelected(details, "origin");
                }} />
                <InputAutoComplete label= "Destination" onPlaceSelected={(details) => {
                    onPlaceSelected(details, "destination");
                }} />
                <TouchableOpacity style = {styles.button} onPress = {()=>navigation.pop()} >
                    <Text style = {styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.button} onPress = {traceRoute} >

                    <Text style = {styles.buttonText}>Get Direction</Text>
                </TouchableOpacity>

                { distance && duration ? (
                    <View> 
                        <Text>Distance: {distance.toFixed(2)} km</Text>
                        <Text>Duration: {Math.ceil(duration)} min</Text>
                    </View>
                ) : null}
            </View>
        </View>
    );
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: '100%',
        height: '100%',
    },
    searchContainer: {
        flex : 1,
        justifyContent : "flex-start",
        position: 'absolute',
        width: '90%',
        backgroundColor: 'white',
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        padding: 8,
        borderRadius: 8,
        top: Constants.statusBarHeight,
    },
    Input: {
        borderColor: "#888",
        borderWidth: 1,
    },
    button: {
        backgroundColor: '#FFF',
        paddingVertical: 12,
        marginTop: 16,
        borderRadius: 4,
    },
    buttonText: {
        textAlign: 'center',
    },
});

export default Mapping