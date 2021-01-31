/* eslint-disable react-native/no-inline-styles */
import {Icon} from 'react-native-elements';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {icons, SIZES, COLORS, FONTS} from '../constants';
import {loggedIn} from '../utils/helpers';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const Home = () => {
  const navigation = useNavigation();
  const battery = useSelector((state) => state.user.batteryPercentage);
  return (
    <ScrollView>
      <View style={{flexDirection: 'row', height: 50}}>
        <TouchableOpacity
          onPress={() => console.log('pressed')}
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: COLORS.lightGray3,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZES.radius,
            }}>
            <Text style={{...FONTS.h3}}>Aegis</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('Edit Profile')}>
          <Image
            source={icons.user}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{marginBottom: SIZES.padding * 2}}
        onPress={() => navigation.navigate('Maps')}>
        {/* Image */}
        <View
          style={{
            marginBottom: SIZES.padding,
            paddingTop: 30,
            elevation: 2,
            borderColor: 'red',
          }}>
          <Image
            source={{
              uri:
                'https://firebasestorage.googleapis.com/v0/b/aegis-fbe56.appspot.com/o/undraw_my_location_f9pr.png?alt=media&token=ee7f0163-706e-4220-9b52-db6ce10f462e',
            }}
            resizeMode="contain"
            style={{
              width: '100%',
              height: 200,
              borderRadius: SIZES.radius,
              marginBottom: 50,
            }}
          />

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: 50,
              width: SIZES.width * 0.3,
              backgroundColor: COLORS.white,
              borderTopRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius,
              alignItems: 'center',
              justifyContent: 'center',
              ...styles.shadow,
            }}>
            <Text style={{...FONTS.h4}}>Track me</Text>
          </View>
        </View>

        <View
          style={{
            marginBottom: SIZES.padding,
            paddingTop: 20,
            borderColor: 'red',
            elevation: 1,
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          <Icon
            type="material"
            name="battery-full"
            size={70}
            style={{marginLeft: 80, marginTop: 40, flex: 1}}
          />
          <Text
            style={{
              width: '100%',
              height: 200,
              borderRadius: SIZES.radius,
              fontSize: 60,
              textAlign: 'center',
              justifyContent: 'center',
              marginTop: 55,
              marginRight: 80,
              flex: 1,
            }}>
            {battery}%
          </Text>

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: 50,
              width: SIZES.width * 0.3,
              backgroundColor: COLORS.white,
              borderTopRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius,
              alignItems: 'center',
              justifyContent: 'center',
              ...styles.shadow,
            }}>
            <Text style={{...FONTS.h4}}>Battery</Text>
          </View>
        </View>

        {/* Restaurant Info */}

        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: 'row',
          }}>
          {/* Rating */}
          {/* Categories */}
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
            }}></View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginBottom: SIZES.padding * 2}}
        onPress={() => navigation.navigate('BLE')}>
        {/* Image */}
        <View
          style={{
            marginBottom: SIZES.padding,
            paddingTop: 30,
            elevation: 2,
            borderColor: 'red',
          }}>
          <Image
            source={{
              uri:
                'https://www.bluetooth.com/wp-content/uploads/2019/04/Bluetooth_FM_Color.png',
            }}
            resizeMode="contain"
            style={{
              width: '100%',
              height: 200,
              borderRadius: SIZES.radius,
              marginBottom: 50,
            }}
          />

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: 50,
              width: SIZES.width * 0.3,
              backgroundColor: COLORS.white,
              borderTopRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius,
              alignItems: 'center',
              justifyContent: 'center',
              ...styles.shadow,
            }}>
            <Text style={{...FONTS.h4}}>Bluetooth</Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default Home;
