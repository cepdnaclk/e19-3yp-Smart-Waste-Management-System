import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from 'react-native-vector-icons';
import axios from 'axios'; 




const BinMap = ({ navigation }) => {

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://192.168.182.130:8000/iot/subscribe');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
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


    const handleNavigation = () => {
        navigation.goBack();
    }

    

    return(
        <SafeAreaView>
            
                <Pressable onPress={handleNavigation} >
                <View style={styles.buttonContainer}>
                    <AntDesign name="leftcircle" size={24} color="white" style={styles.button} />
                    <Text style={styles.button}>Back</Text>
                </View>
                </Pressable>
            <View style={styles.container}>
                <Text style={styles.headingText}>Tap a marker to view the bin details</Text>
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
                        {markersList.map(marker => {
                            return (
                                <Marker
                                    key={marker.id}
                                    coordinate={{
                                        latitude: marker.latitude,
                                        longitude: marker.longitude
                                    }}
                                    title={"Bin"+marker.id}
                                    description={'Temperature:'+marker.temperature+'C'}
                                />
                            )
                        })

                        }
                    </MapView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BinMap

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom:10
    },
    mapContainer: {
        //...StyleSheet.absoluteFillObject,
        height: 680,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth:1
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    headingText: {
        fontSize: 20,
        color: 'green',
        fontWeight: 'bold',
        marginBottom:10
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems:'center',
        width: 100,
        height: 50,
        backgroundColor: "green",
        borderRadius: 10,
        marginTop: 5,
        marginLeft: 5,
        
    },
    button: {
        textAlign: "center",
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 40,
        marginLeft:5
        
    },
})