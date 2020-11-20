import React, {useState, useEffect} from 'react';
import {View, Text, PermissionsAndroid, Button} from 'react-native';
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
          {
            title: 'Need to access your location',
            buttonPositive: 'Intha vachuko !',
            buttonNegative: 'Unaku elam kedayathu',
            buttonNeutral: 'Pona poguthu !',
            message: 'Unga location venum',
          },
        );

        // if (granted === PermissionsAndroid.RESULTS) {
        //   Geolocation.getCurrentPosition((info) => setLocation(info));
        // }
      } catch (error) {
        console.log(error);
      }
    };
  }, [location]);
  const array = [];
  const onClick = () => {
    // Geolocation.watchPosition((position) => console.log(position));
    Geolocation.getCurrentPosition((info) => {
      array.push(info.coords.latitude, info.coords.longitude);
      setLocation(info);
    });
  };
  return (
    <View>
      <Text>{JSON.stringify(location)}</Text>
      {/* <Button title="Location" onPress={() => onClick()} /> */}
      <Maps coordinates={array} />
    </View>
  );
};

export default Locations;
