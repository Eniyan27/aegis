import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Badge, Icon} from 'react-native-elements';
const ChooseContacts = ({props, styles}) => {
  return (
    <View style={styles}>
      <Icon raised name="contacts" type="material" />
      <Badge value={props.length} containerStyle={newStyles.container} />
    </View>
  );
};

const newStyles = StyleSheet.create({
  container: {position: 'absolute', top: -4, right: -4},
});

export default ChooseContacts;
