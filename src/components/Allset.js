import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {useDispatch} from 'react-redux';
import {loggedIN} from '../redux/actions';
import {Button} from 'react-native-elements';

const Allset = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <LottieView
        autoPlay={true}
        source={require('../assets/8527-success-mark.json')}
        loop={false}
        style={styles.success}
      />
      <Button title="Done" onPress={() => dispatch(loggedIN)} />
    </View>
  );
};

const styles = StyleSheet.create({
  success: {
    margin: 'auto',
    padding: 'auto',
    width: 'auto',
    height: 'auto',
    justifyContent: 'center',
    display: 'flex',
    alignContent: 'center',
  },
});

export default Allset;
