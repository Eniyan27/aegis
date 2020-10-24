import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Component() {
  return (
    <View style={styles.main}>
      <Text style={styles.txt}> Getting Started </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'flex-start',
    paddingStart: 57,
    paddingTop: 166,
    flex: 1,
  },
  txt: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    fontSize: 40,
    color: '#000000',
  },
});

export default Component;
