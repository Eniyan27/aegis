import React, {useEffect} from 'react';
import Allset from './Allset';
import {View, StyleSheet, PermissionsAndroid, Text} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoidGFydW5raXNob3JlIiwiYSI6ImNraHFnajU4ajAwanMycW9zY3lzeXR3NDkifQ.7z81DfX1zS1rsCiodpow8w',
);

MapboxGL.setConnected(true);

const Maps = ({coordinates}) => {
  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  }, []);
  const permissions = async () => {
    const data = await PermissionsAndroid.request(
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    );
    if (data === 'granted') {
      return true;
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          zoomEnabled={true}
          scrollEnabled={true}>
          {permissions().then((res) => res) ? (
            <MapboxGL.UserLocation visible={true} />
          ) : (
            <Text>Need your permissions</Text>
          )}
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 300,
  },
  container: {
    height: 500,
    width: 500,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Maps;
