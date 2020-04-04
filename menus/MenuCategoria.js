import React from 'react';

import { StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Categorias from '../screens/Categorias';
import Categoria from '../screens/Categoria';
import ReceitaCompleta from '../screens/ReceitaCompleta';

const MainNavigator = createStackNavigator({
    Categorias,
    Categoria,
    ReceitaCompleta,
},{
    initialRouteName: 'Categorias',
});

const AppContainer = createAppContainer(MainNavigator);

export default function MenuCategoria({navigation}) {
    Categorias.navigationOptions = {
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
});
