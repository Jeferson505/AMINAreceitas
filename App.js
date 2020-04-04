import React from 'react';

import { View, Image, StyleSheet } from 'react-native';
import logo from './assets/cook.png';

import MenuHome from './menus/MenuHome';
import MenuCategoria from './menus/MenuCategoria';
import MenuAdicionarReceita from './menus/MenuAdicionarReceita';

import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const DrawerComponent = (props) => (
  <View style={styles.drawerContent}>
    <View style={styles.header}>
      <Image style={styles.logoHeader} source={logo}/>
    </View>
    <DrawerItemList {...props}/>
  </View>
);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  header: {
    backgroundColor: '#F8BBD0',
    width: '100%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoHeader: {
    height: 130,
    width: 130,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator edgeWidth={0} initialRouteName='Home' backBehavior='initialRoute' drawerContent={DrawerComponent}>
        <Drawer.Screen name="Home" component={MenuHome} />
        <Drawer.Screen name="Categorias" component={MenuCategoria} />
        <Drawer.Screen name="Adicionar Receita" component={MenuAdicionarReceita}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
