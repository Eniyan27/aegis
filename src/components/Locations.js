import MapboxGL from '@react-native-mapbox-gl/maps';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, PermissionsAndroid, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS} from 'react-native-permissions';
import Maps from './Maps';

const Locations = () => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );

        if (granted === 'granted') {
          Geolocation.getCurrentPosition((info) => setLocation(info));
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, [location]);
  // useLayoutEffect(() => {
  //   async () => {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  //       );

  //       if (granted === 'granted') {
  //         Geolocation.getCurrentPosition((info) => setLocation(info));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  // }, [location]);
  const array = [];
  const onClick = () => {
    // Geolocation.watchPosition((position) => console.log(position));
    Geolocation.getCurrentPosition((info) => {
      array.push(info.coords, info.coords.longitude);
      setLocation(info);
    });
  };
  console.log(location);
  return (
    <View>
      <Text>{JSON.stringify(location)}</Text>
      <Button title="Location" onPress={() => onClick()} />
      <Maps coordinates={location} />
    </View>
  );
};

export default Locations;
