import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import {useDispatch, useSelector} from 'react-redux';

import {saveCoords} from '../screens/coordsSlice';
import {startWaiting, stopWaiting} from '../screens/statusSlice';
import styles from '../styles';

export const GpsInterface = props => {
  const dispatch = useDispatch();
  const isGranted = useSelector(state => state.status.LocationPermission);
  const isWaiting = useSelector(state => state.status.awaitingResponse);

  // states for current location section
  const [statusMessage, setStatusMessage] = useState(
    'Waiting for user action.',
  ); // message
  const [currentPosition, setCurrentPosition] = useState({
    latitude: null,
    longitude: null,
  }); // store coords
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // gets device location
  const getOneTimeLocation = () => {
    setIsError(false);
    setStatusMessage('Getting location.');
    dispatch(startWaiting());
    Geolocation.getCurrentPosition(
      position => {
        dispatch(stopWaiting());
        setIsSuccess(true);
        setStatusMessage('Successfully obtained location.');

        // gets lat and lon from response object
        setCurrentPosition({
          latitude: JSON.stringify(position.coords.latitude),
          longitude: JSON.stringify(position.coords.longitude),
        });
      },
      error => {
        dispatch(stopWaiting());
        setStatusMessage(error.message);
        setIsError(true);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 1000,
      },
    );
  };

  // override timeout
  const backupCoords = () => {
    setCurrentPosition({latitude: 27.77, longitude: -82.63});
    setIsError(false);
    setIsSuccess(true);
    setStatusMessage('Successfully obtained location.');
  };

  const gpsCoordsSave = () => {
    dispatch(
      saveCoords({
        index: props.screenIndex,
        lat: currentPosition.latitude,
        lon: currentPosition.longitude,
        source: 'Device GPS',
      }),
    );
  };

  return (
    <View style={styles.componentBox}>
      <Text style={styles.p}>
        Access Device's GPS and show current latitude and longitude
      </Text>
      {isGranted ? (
        <Pressable
          style={isWaiting ? styles.buttonDisabled : styles.buttonStandard}
          disabled={isWaiting}
          onPress={getOneTimeLocation}>
          <Text style={styles.buttonText}>
            {isWaiting ? 'getting coordinates' : 'get coordinates'}
          </Text>
        </Pressable>
      ) : (
        <Text style={styles.p}>
          Please request location permission first.{'\n'}
        </Text>
      )}
      {isSuccess ? (
        <View>
          <Text style={styles.p}>
            Lat: {currentPosition.latitude}
            {'\n'}Lon: {currentPosition.longitude}
            {'\n'}
          </Text>
          <Pressable
            style={
              isNaN(currentPosition.latitude)
                ? styles.buttonDisabled
                : styles.buttonStandard
            }
            disabled={isNaN(currentPosition.latitude)}
            onPress={() => gpsCoordsSave()}>
            <Text style={styles.buttonText}>Save coordinates</Text>
          </Pressable>
        </View>
      ) : (
        <Text style={styles.p}>
          {statusMessage}
          {'\n'}
        </Text>
      )}
      {isError ? (
        <Pressable style={styles.buttonStandard} onPress={backupCoords}>
          <Text style={styles.buttonText}>Use placeholder coordinates</Text>
        </Pressable>
      ) : null}
    </View>
  );
};
