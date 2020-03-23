import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function Receita(props) {
  return (
    <View style={styles.container}>
        <View style={styles.titulo}>
            <Text style={styles.textTitulo}>{props.nome}</Text>
        </View>
        <Image source={{uri: "https://firebasestorage.googleapis.com/v0/b/receitas-pantaneiras.appspot.com/o/"+props.imagem+"?alt=media&"}}
             style={{width: 160, height: 150, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
  },
  titulo: {
      backgroundColor: '#F8BBD0',
      width: 160,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
  },
  textTitulo: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  }
});
