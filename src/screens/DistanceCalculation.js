import React, {useState} from 'react';
import {Pressable, ScrollView, Text} from 'react-native';

import {useSelector} from 'react-redux';
import styles from '../styles';

export default function DistanceCalculation({navigation}) {
  // distance computation
  const savedCoords = useSelector(state => state.coords);

  const [distance, setDistance] = useState('Distance not computed yet');

  const lat1 = savedCoords[0].lat;
  const lon1 = savedCoords[0].lon;
  const lat2 = savedCoords[1].lat;
  const lon2 = savedCoords[1].lon;

  const source1 = savedCoords[0].source;
  const source2 = savedCoords[1].source;

  // calculates straight line distance using Haversine formula
  const computeDistance = () => {
    function toRad(x) {
      return (x * Math.PI) / 180;
    }

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2);

    var R = 3958.76; // mi

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    setDistance(R * c);
  };

  return (
    <ScrollView style={styles.outerBox}>
      <Text style={styles.h1}>
        Calculate distance between first location and second location{'\n'}
      </Text>

      <Text style={styles.p}>
        First coordinate: {lat1}, {lon1} ({source1}){'\n'}Second coordinate:{' '}
        {lat2}, {lon2} ({source2}){'\n'}
      </Text>
      <Pressable
        style={styles.buttonStandard}
        onPress={() => computeDistance()}>
        <Text style={styles.buttonText}>Calculate Distance</Text>
      </Pressable>
      {isNaN(distance) ? (
        <Text>{distance}</Text>
      ) : (
        <Text>
          Distance: {distance} miles{'\n'}
        </Text>
      )}

      <Pressable
        style={styles.buttonStandard}
        onPress={() => navigation.popToTop()}>
        <Text style={styles.buttonText}>Return to start</Text>
      </Pressable>
    </ScrollView>
  );
}
