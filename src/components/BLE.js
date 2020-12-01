import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {ListItem} from 'react-native-elements';
import BluetoothSerial from 'react-native-bluetooth-serial';
const BLE = () => {
  const [device, setDevice] = useState([]);
  const [bstate, setBstate] = useState(false);
  const connect = async (id) => {
    await BluetoothSerial.connect(id)
      .then((res) => console.log(res, 'connected'))
      .catch((err) => console.log(err));
  };
  const readDevice = async () => {
    const response = await BluetoothSerial.readFromDevice();
    return response;
  };
  readDevice()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  return (
    <View>
      <Button
        onPress={() =>
          connect(macid)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        }
        title="Connected"
      />
    </View>
  );
};

export default BLE;
