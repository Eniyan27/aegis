import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  StyleSheet,
  NativeModules,
} from 'react-native';

const {Location} = NativeModules;

export default Location;
