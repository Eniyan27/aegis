import React, {useState} from 'react';
import {Button, TextInput} from 'react-native';
import {Input} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

export var CodeConfirmation;

export default function PhoneSignIn({props}) {
  const navigation = useNavigation();

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [number, setNumber] = useState('');
  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log(error + 'Invalid code.');
    }
  }

  CodeConfirmation = () => {
    return (
      <>
        <TextInput value={code} onChangeText={(text) => setCode(text)} />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </>
    );
  };

  if (!confirm) {
    return (
      <>
        <Input
          placeholder="Enter your phone number"
          onChange={setNumber}
          autoCompleteType="tel"
        />
        <Button
          title="Send Code"
          onPress={() => {
            signInWithPhoneNumber(props);
            // navigation.navigate('Confirm Code');
          }}
        />
      </>
    );
  }
}
