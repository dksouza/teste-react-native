import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//Screens
import Home from './src/screens/Home';
import Issues from './src/screens/Issues';

const stack = {
  Home: {
    screen: Home,
    navigationOptions: () => ({
      title: 'GitIssues',
    }),
  },
  Issues: {
    screen: Issues,
    navigationOptions: () => ({
      title: 'Issues',
    }),
  },
};

const StackNavigator = createAppContainer(
  createStackNavigator(
    {
      ...stack,
    },
    {
      defaultNavigationOptions: {
        headerBackTitle: null,
        headerBackImage: (
          <MaterialIcons name="keyboard-arrow-left" size={40} color="#333" />
        ),
      },
    },
  ),
);

export default StackNavigator;
