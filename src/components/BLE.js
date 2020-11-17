import React, {useEffect} from 'react';
import {View, Text, PermissionsAndroid} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import {BleManager} from 'react-native-ble-plx';

const BLE = () => {
  const manager = new BleManager();
  useEffect(() => {
    try {
      manager.enable().then((res) => console.log(res.devices));
    } catch (error) {}
  });
  // function getAlldevices() {
  //   manager.connectToDevice().then((res) => console.log(res));
  // }
  // getAlldevices();
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default BLE;
