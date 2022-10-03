import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';

import {useDispatch} from 'react-redux';

import {saveCoords} from '../screens/coordsSlice';
import {useGetCoordsQuery} from './apiSlice';
import styles from '../styles';

export const ApiUi = props => {
  const dispatch = useDispatch();
  const [text, setText] = useState(''); // text input
  const [apiCallPressed, setApiCallPressed] = useState(false);

  // renders only when API call button is pressed
  const ApiResponse = () => {
    const {data, isFetching, isSuccess, isError, error} =
      useGetCoordsQuery(text);

    if (isFetching) {
      return <Text style={styles.p}>Currently Querying API</Text>;
    } else if (isSuccess) {
      if (data.results.length === 1) {
        return (
          <View>
            <Text style={styles.p}>
              Interpreted address: {data.results[0].formatted_address}
              {'\n'}Lat: {data.results[0].location.lat}
              {'\n'}Lon: {data.results[0].location.lng}
              {'\n'}
            </Text>
            <Pressable
              style={styles.buttonStandard}
              onPress={() => apiCoordsSave(data)}>
              <Text style={styles.buttonText}>Save coordinates</Text>
            </Pressable>
            <Pressable
              style={styles.buttonStandard}
              onPress={() => setApiCallPressed(false)}>
              <Text style={styles.buttonText}>Change address</Text>
            </Pressable>
          </View>
        );
      } else if (data.results.length >= 2) {
        const MultiResults = () => {
          let temp = [];
          for (let i = 0; i < data.results.length; i++) {
            temp.push(
              <View key={i}>
                <Text style={styles.p}>
                  Match #{i + 1}: {data.results[i].formatted_address}
                  {'\n'}Lat: {data.results[i].location.lat}, Lon:{' '}
                  {data.results[i].location.lng}
                </Text>
                <Pressable
                  style={styles.buttonStandard}
                  onPress={() => apiCoordsSave(data, i)}>
                  <Text style={styles.buttonText}>Save coordinates</Text>
                </Pressable>
              </View>,
            );
          }
          return temp;
        };

        return (
          <View>
            <Text style={styles.p}>
              Multiple results returned!{'\n'}Interpreted input:{' '}
              {data.input.formatted_address}{' '}
            </Text>
            <Pressable
              style={styles.buttonStandard}
              onPress={() => setApiCallPressed(false)}>
              <Text style={styles.buttonText}>change address</Text>
            </Pressable>
            <Text style={styles.p}>
              Choose one of the results below to save.
            </Text>
            <MultiResults />
          </View>
        );
      }
    } else if (isError) {
      console.log(error);
      return (
        <View>
          <Text style={styles.p}>
            Status code {error.status}: {JSON.stringify(error.data)}
          </Text>
          <Pressable
            style={styles.buttonStandard}
            onPress={() => setApiCallPressed(false)}>
            <Text style={styles.buttonText}>Change address</Text>
          </Pressable>
        </View>
      );
    }
  };

  const apiCoordsSave = (data, i) => {
    dispatch(
      saveCoords({
        index: props.screenIndex,
        lat: data.results[i].location.lat,
        lon: data.results[i].location.lng,
        source: data.results[i].formatted_address,
      }),
    );
  };

  return (
    <View style={styles.componentBox}>
      <Text style={styles.p}>
        Get latitude and longitude of user input address via Geocod.io API
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type an address in here!"
          onChangeText={newText => setText(newText)}
          defaultValue={text}
          style={styles.inputBox}
          editable={!apiCallPressed}
        />
        <Pressable
          style={
            apiCallPressed || /[\da-z]/i.test(text) === false
              ? styles.buttonDisabled
              : styles.buttonStandard
          }
          disabled={apiCallPressed || /[\da-z]/i.test(text) === false}
          onPress={() => setApiCallPressed(true)}>
          <Text style={styles.buttonText}>
            {apiCallPressed ? 'API already called' : 'Call API'}
          </Text>
        </Pressable>
      </View>
      {apiCallPressed ? (
        <ApiResponse />
      ) : (
        <Text style={styles.p}>API not called yet.</Text>
      )}
    </View>
  );
};
