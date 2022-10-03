import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainScreen from './screens/MainScreen';
import FirstLocation from './screens/FirstLocation';
import SecondLocation from './screens/SecondLocation';
import DistanceCalculation from './screens/DistanceCalculation';

import {useSelector} from 'react-redux';

export default function NavigationWrapper() {
  const Stack = createNativeStackNavigator();
  const isWaiting = useSelector(state => state.status.awaitingResponse);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen
          name="FirstLocation"
          component={FirstLocation}
          options={{headerBackVisible: !isWaiting}}
        />
        <Stack.Screen
          name="SecondLocation"
          component={SecondLocation}
          options={{headerBackVisible: !isWaiting}}
        />
        <Stack.Screen
          name="DistanceCalculation"
          component={DistanceCalculation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
