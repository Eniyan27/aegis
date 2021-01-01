/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import Allset from './Allset';
import {View, StyleSheet, PermissionsAndroid, Text} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Pubnub from 'pubnub';
import MapView, {PROVIDER_GOOGLE, Polyline, Marker} from 'react-native-maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoidGFydW5raXNob3JlIiwiYSI6ImNraHFnajU4ajAwanMycW9zY3lzeXR3NDkifQ.7z81DfX1zS1rsCiodpow8w',
);

MapboxGL.setConnected(true);

const Maps = ({coordinates}) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [route, setRoute] = useState([]);
  const pubnub = new Pubnub({
    publishKey: 'pub-c-33f09df6-fcbb-4d64-bdf7-5ab27dec7293',
    subscribeKey: 'sub-c-7ffefd60-1116-11eb-a0a1-be9072d3ef6c',
    uuid: 'sec-c-NGZmMDIyMjAtNTQ2OS00ZjAyLWIxNWUtM2ExYmYxYzkzNWNj',
  });
  useEffect(() => {
    Geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    MapboxGL.setTelemetryEnabled(false);
    pubnub.subscribe({
      channels: ['location-tracker'],
      withPresence: true,
    });
  }, []);
  Geolocation.watchPosition(
    (position) => {
      const {latitude, longitude} = position.coords;
      const newCoordinate = {latitude, longitude};
      setRoute(route.concat([newCoordinate]));
      // pubnub.publish(
      //   {
      //     message: {
      //       uuid: pubnub.getUUID(),
      //       latitude: position.coords.latitude,
      //       longitude: position.coords.longitude,
      //     },
      //     channel: 'location-tracker',
      //   },
      //   (status, response) => {
      //     console.log(status);
      //     console.log(response);
      //   },
      // );
    },
    (err) => console.log(err),
    {
      accuracy: {android: 'high'},
      enableHighAccuracy: true,
      timeout: 1000,
      distanceFilter: 0.5,
      fastestInterval: 1000,
      interval: 1000,
    },
  );
  const permissions = async () => {
    const data = await PermissionsAndroid.request(
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    );
    if (data === 'granted') {
      return true;
    }
  };

  const getMapRegion = () => ({
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  // pubnub.addListener({
  //   message: function (m) {
  //     console.log(m.message);
  //   },
  // });

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: 9.9169618,
            longitude: 78.1376334,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          followsUserLocation={true}
          style={styles.map}>
          <Polyline coordinates={route} />
          <Marker coordinate={getMapRegion()} />
        </MapView>
      </View>
    </View>
  );
};

// Styling for maps

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 700,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Maps;
