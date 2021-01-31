import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Overlay, Text} from 'react-native-elements';
import Location from './Location';
import BluetoothSerial from 'react-native-bluetooth-serial';
import {useDispatch} from 'react-redux';
import {getBTpercent} from '../redux/actions';
const BLE = () => {
  useEffect(() => {
    BluetoothSerial.isEnabled()
      .then((res) => setBstate(res))
      .catch((err) => console.log(err));
  }, []);
  const [device, setDevice] = useState('');
  const [bstate, setBstate] = useState(false);
  const dispatch = useDispatch();
  const macid = '45:54:13:04:09:B0';
  BluetoothSerial.list()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  BluetoothSerial.discoverUnpairedDevices()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  const connect = async (id) => {
    await BluetoothSerial.connect(id)
      .then((res) => {
        setDevice(res.message);
        Location.startService();
      })
      .catch((err) => console.log(err.message));
  };

  console.log(bstate);
  BluetoothSerial.list()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  return (
    <View>
      {bstate ? (
        <Button
          style={styles.button}
          onPress={() =>
            connect(macid)
              .then((res) => console.log(res))
              .catch((err) => console.log(err))
          }
          title="Connect"
        />
      ) : (
        <Overlay style={styles.modal} isVisible={true}>
          <Text h4>Enable Bluetooth to continue !</Text>
          <Button
            title="Enable"
            onPress={() =>
              BluetoothSerial.enable()
                .then((res) => {
                  setBstate(true);
                  console.log(res);
                })
                .catch((err) => console.error(err))
            }
          />
        </Overlay>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 400,
  },
  modal: {
    width: '80%',
    height: '40%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});

export default BLE;
