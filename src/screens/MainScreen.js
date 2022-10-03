import React from 'react';
import {PermissionsAndroid, Pressable, ScrollView, Text} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {PermissionGranted, startWaiting, stopWaiting} from './statusSlice';
import styles from '../styles';

export default function MainScreen({navigation}) {
  const dispatch = useDispatch();
  const isGranted = useSelector(state => state.status.LocationPermission);
  const isWaiting = useSelector(state => state.status.awaitingResponse);

  // checks location permission
  const requestLocationPermission = async () => {
    try {
      dispatch(startWaiting());
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Services Permission',
          message: "This app needs access to your phone's location services.",
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        dispatch(stopWaiting());
        dispatch(PermissionGranted());
      } else {
        console.log('Permission denied');
        dispatch(stopWaiting());
      }
    } catch (err) {
      console.warn(err);
      dispatch(stopWaiting());
    }
  };

  return (
    <ScrollView style={styles.outerBox}>
      <Text style={styles.h1}>
        Geocode API, GPS, and Distance Calculation App{'\n'}
      </Text>
      <Text style={styles.p}>
        This app will allow you to enter two locations - either from addresses
        you enter or your device's GPS. The app will then calculate the distance
        between the two locations.{'\n'}
      </Text>
      <Text style={styles.p}>
        If you want this app to be able to use the GPS, please make sure
        location permission is granted.{'\n'}
      </Text>
      <Pressable
        style={isGranted ? styles.buttonDisabled : styles.buttonStandard}
        disabled={isGranted}
        onPress={requestLocationPermission}>
        <Text style={styles.buttonText}>
          {isGranted
            ? 'Location permission granted'
            : 'Request location permission'}
        </Text>
      </Pressable>
      <Text style={styles.p}>
        When you're ready, press the button below to input the first location.
        {'\n'}
      </Text>
      <Pressable
        style={isWaiting ? styles.buttonDisabled : styles.buttonStandard}
        disabled={isWaiting}
        onPress={() => navigation.navigate('FirstLocation')}>
        <Text style={styles.buttonText}>Input first location</Text>
      </Pressable>
    </ScrollView>
  );
}
