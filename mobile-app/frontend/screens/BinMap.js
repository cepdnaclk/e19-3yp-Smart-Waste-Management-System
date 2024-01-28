import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from 'react-native-vector-icons';
import client from '../api/client';




const BinMap = ({ navigation }) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await client.get('/iot/subscribe');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                Alert.alert('Error in getting data', 'The reason may be connectivity issues');
            }
        };

        fetchData(); // Call the function to fetch data
    }, []);

    const markersList = data
        ? [
            {
                id: data.binId,
                latitude: data.latitude,
                longitude: data.longitude,
                level: data.filledLevel,
                temperature: data.temperature,
            },
        ]
        : [];

    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.icon} >
                    <AntDesign name="left" size={30} color="green" />
                </TouchableOpacity>
                <Text style={styles.headingText}>Tap markers to view bin details</Text>
            </View>


            <View style={styles.container}>

                <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: 7.254242328585139,
                            longitude: 80.59246574710086,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1
                        }}>
                        {markersList.map((marker) => (
                            
                            <Marker
                                key={marker.id}
                                coordinate={{
                                    latitude: marker.latitude,
                                    longitude: marker.longitude
                                }}
                                title={"Filled Level = " + Math.floor(100 * (38 - marker.level + 3.1) / 38)+"%"}
                                description={"Temperature = " + marker.temperature+ ' C'}
                                onPress={() => Alert.alert('Bin ID : ' + marker.id, 'Bin Filled Level: ' + Math.floor(100 * (38 - marker.level + 3.1) / 38) + '%\nBin Temperature : ' + marker.temperature+' C')}
                            />
                            
                        ))}

                    </MapView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BinMap

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 10
    },
    icon: {
        alignSelf: 'flex-start',
        paddingLeft: 10,
    },
    headingText: {
        fontSize: 20,
        color: '#105716',
        fontWeight: '500',
        marginLeft: 20
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10
    },
    mapContainer: {
        height: 730,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopWidth: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },


})