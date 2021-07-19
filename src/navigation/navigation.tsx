import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from '../screen/StartScreen';
import HomeScreen from '../screen/Home';

const RootStack = createStackNavigator();

const RootStackScreen = () => (
  <RootStack.Navigator
    mode="modal"
    headerMode="none"
    initialRouteName="Tab"
    screenOptions={() => ({
      headerShown: false,
      gestureEnabled: true,
      // Activate iOS style modal presentation (could be adapted for Android)
    })}>
    <RootStack.Screen name="start" component={StartScreen} />
    <RootStack.Screen name="home" component={HomeScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
