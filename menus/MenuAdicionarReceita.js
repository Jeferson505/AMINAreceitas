import React from 'react';

import { StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import AdicionarReceita from '../screens/AdicionarReceita';

const MainNavigator = createStackNavigator({
    AdicionarReceita,
},{
    initialRouteName: 'AdicionarReceita',
});

const AppContainer = createAppContainer(MainNavigator);

export default function MenuCategoria({navigation}) {

    AdicionarReceita.navigationOptions = {
        title: 'Adicionar Receita',
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
