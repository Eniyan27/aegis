import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {ListItem} from 'react-native-elements';
import BluetoothSerial from 'react-native-bluetooth-serial';
const BLE = () => {
  const [device, setDevice] = useState([]);
  const [bstate, setBstate] = useState(false);
  const connect = (id) => {
    BluetoothSerial.connect(id)
      .then((res) => console.log(res, 'connected'))
      .catch((err) => console.log(err));
  };
  /*BluetoothSerial.list()
    .then((res) => setDevice(res))
    .catch((err) => console.error(err));
  BluetoothSerial.isEnabled()
    .then((res) => setBstate(res))
    .catch((err) => console.error(err));
  BluetoothSerial.discoverUnpairedDevices()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));*/
  const macid ="FC:A8:9A:00:12:2E"
  BluetoothSerial.connect(macid)
    .then((res) => console.log(res, 'connected'))
    .catch((err) => console.log(err));
  // const readDevice = async () => {
  //   const response = await BluetoothSerial.readFromDevice();
  //   return response;
  // };
  // readDevice()
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));
  BluetoothSerial.readFromDevice()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  return (
    <View>
      {/* {bstate ? (
        <Text>Bluetooth is enabled</Text>
      ) : (
        <Text>Enable bluetooth to continue</Text>
      )}
      {device.map((dev) => (
        <ListItem key={dev.id}>
          <Text>{dev.name}</Text>
          <Text>{dev.address}</Text>
        </ListItem>
      ))} */}
      <Button onPress={() => connect(macid)} title="Click to Connect" />
    </View>
  );
};

export default BLE;
