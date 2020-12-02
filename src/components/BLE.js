import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {ListItem} from 'react-native-elements';
import BluetoothSerial from 'react-native-bluetooth-serial';
const BLE = () => {
  const [device, setDevice] = useState('00:15:83:31:6A:08');
  const [bstate, setBstate] = useState(false);
  const macid = '45:54:13:04:09:B0';
  const connect = async (id) => {
    await BluetoothSerial.connect(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.message));
  };
  BluetoothSerial.readFromDevice()
    .then((res) => {
      if (res.includes('EMERGENCY')) {
        console.log('Signal recieved');
      } else {
        console.log(res);
      }
      // console.log(res);
    })
    .catch((err) => console.log(err));

  return (
    <View>
      <Button
        onPress={() =>
          connect(macid)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        }
        title="Connect"
      />
    </View>
  );
};

export default BLE;
