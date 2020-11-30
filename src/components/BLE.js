import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {
  BleManager,
  Device,
  Service,
  Characteristic,
} from 'react-native-ble-plx';

const BLE = () => {
  const manager = new BleManager();
  const [device, setDevice] = useState([]);
  const service = new Service();
  const characteristic = new Characteristic();
  console.log(characteristic.isReadable);
  manager
    .discoverAllServicesAndCharacteristicsForDevice(device.id)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  function getAlldevices() {
    const devices = [];
    manager.startDeviceScan(null, null, (err, dev) => {
      if (err) {
        console.log(err);
      } else {
        devices.push(dev);
        setDevice(devices);
      }
    });
    setTimeout(() => {
      manager.stopDeviceScan();
    }, 2000);
  }

  const deviceID = getAlldevices();
  console.log(deviceID);
  return (
    <View>
      {device.map((dev) => (
        <Text>
          ID : {dev.id} Name:{dev.name}
        </Text>
      ))}
    </View>
  );
};

export default BLE;
