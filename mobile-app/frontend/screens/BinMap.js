import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon, AntDesign } from 'react-native-vector-icons';




const BinMap = ({ navigation }) => {

    const [markersList, setMarkersList] = useState([
        {
            id: 1,
            latitude: 7.255826,
            longitude: 80.594843,
            Location: "Gymnasium",
            level: 50,
            temperature: 32
        },
        {
            id: 2,
            latitude: 7.252774987876031,
            longitude: 80.5924139933361,
            Location: "Engineering Faculty Canteen",
            level: 75,
            temperature: 37
        },
        {
            id: 3,
            latitude: 7.260135853713896,
            longitude: 80.59645809253395,
            Location: "Sarasavi Uyana Railway Station",
            level: 30,
            temperature: 33
        }
    ])

    const handleNavigation = () => {
        navigation.navigate("PublicHomeScreen")
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