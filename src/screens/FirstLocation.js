import React, {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

import {useSelector} from 'react-redux';

import {GpsInterface} from '../components/GpsInterface';
import {ApiUi} from '../components/ApiUi';
import styles from '../styles';

export default function FirstLocation({navigation}) {
  const [switchLeft, setSwitchLeft] = useState(true); // switch to select gps or api

  const GpsApiSwitch = () => {
    const isWaiting = useSelector(state => state.status.awaitingResponse);
    return (
      <View style={styles.switchWrapper}>
        <Pressable
          style={switchLeft ? styles.buttonOn : styles.buttonOff}
          disabled={isWaiting}
          onPress={() => setSwitchLeft(true)}>
          <Text style={styles.p}>Use location on device</Text>
        </Pressable>
        <Pressable
          style={switchLeft ? styles.buttonOff : styles.buttonOn}
          disabled={isWaiting}
          onPress={() => setSwitchLeft(false)}>
          <Text style={styles.p}>Input target address</Text>
        </Pressable>
      </View>
    );
  };

  const NavFooter = () => {
    const savedCoords = useSelector(state => state.coords[0]);
    const isWaiting = useSelector(state => state.status.awaitingResponse);
    return (
      <View>
        {savedCoords.lat ? (
          <Text style={styles.p}>
            Currently saved source: {savedCoords.source}
            {'\n'}Saved Lat: {savedCoords.lat}, Saved Lon: {savedCoords.lon}
          </Text>
        ) : null}
        <Pressable
          style={
            !savedCoords.lat || isWaiting
              ? styles.buttonDisabled
              : styles.buttonStandard
          }
          disabled={!savedCoords.lat || isWaiting}
          onPress={() => navigation.navigate('SecondLocation')}>
          <Text style={styles.buttonText}>Input second location</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <ScrollView style={styles.outerBox}>
      <Text style={styles.h1}>Input First Location{'\n'}</Text>
      <Text style={styles.h2}>Select method</Text>
      <GpsApiSwitch />
      {switchLeft ? (
        <GpsInterface screenIndex={0} />
      ) : (
        <ApiUi screenIndex={0} />
      )}
      <NavFooter />
    </ScrollView>
  );
}
