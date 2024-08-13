import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
// import MapView, { Marker } from 'expo-maps';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Maps() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

const [location, setLocation] = useState({"coords": {"accuracy": 113.03132446946891, "altitude": 137.16547894477844, "altitudeAccuracy": 14.5051851272583, "heading": -1, 
    "latitude": -5.841370910059474, "longitude": 13.44791752241941, "speed": -1}, "timestamp": 1722967055315.711});
const [errorMsg, setErrorMsg] = useState(null);
useEffect(() => {
  (async () => {
    
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

  //   let location = await Location.getCurrentPositionAsync(
  //     {
  //         accuracy: Location.Accuracy.BestForNavigation,
  //         maximumAge: 100,
  //         timeout: 200,
  //       }
  //   );
  // let locations = await Location.watchPositionAsync(
  //     {accuracy:Location.Accuracy.BestForNavigation},
  //     (loc) => {console.log(loc)}
  //   );

  subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (newLocation) => {
          console.log('Debug',newLocation);
        setLocation(newLocation);
      }
    );
  //   location()
  //   setLocation(locations);
  })();
  return () => {
      if (subscription) {
        subscription.remove();
      }
    };
}, []);

  return (
    <View style={styles.container}>
      
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location && location.coords.latitude,
            longitude: location && location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude:'-5.838153359999997' ,
              longitude: '13.440525999999995',
            }}
            title="Your Location"
            description="This is where you are"
          />
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
