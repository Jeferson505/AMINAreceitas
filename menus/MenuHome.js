import React from 'react';

import { StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from '../screens/Home';
import ReceitaCompleta from '../screens/ReceitaCompleta';

const MainNavigator = createStackNavigator({
  Home,
  ReceitaCompleta,
},{
  initialRouteName: 'Home',
});

const AppContainer = createAppContainer(MainNavigator);

export default function MenuHome({navigation}) {
  Home.navigationOptions = {
    headerStyle: {
      backgroundColor: '#E91E63',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerLeft: () => (
      <Entypo
        size={32}
        onPress={() => navigation.toggleDrawer() }
        name="menu"
        style={styles.botaoMenu}
      />
    ),
  };

  return (
    <AppContainer/>
  );
}

const styles = StyleSheet.create({
  botaoMenu: {
    paddingLeft: 10,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  botaoPesquisa: {
    marginLeft: 5,
    marginRight: 20,
    color: 'white',
  },
  barraPesquisa: {
    paddingLeft: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 140,
  }
});
