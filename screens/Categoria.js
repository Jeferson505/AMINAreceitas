import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';

import Receita from './Receita';

export default function Categoria(props) {

  Categoria.navigationOptions = {
    title: props.navigation.getParam("nomeCategoria"),
    headerStyle: {
      backgroundColor: '#E91E63',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white',
  }

  function mostrarReceitasColuna(i) {
    let todasReceitas = props.navigation.getParam("receitas");
    let receitas = [];
  
    for(; i < todasReceitas.length; i+=2){
      receitas.push(todasReceitas[i]);
    }
  
    return receitas.map((receita, key) => {
      let nome = receita.nome;
      let ingredientes = receita.ingredientes;
      let modoPreparo = receita.modoPreparo;
      let rendimento = receita.rendimento;
      let tempo_preparo = receita.tempo_preparo;
      let imagem = receita.url;
      return(
        <TouchableOpacity key={key} style={styles.item} onPress={() => props.navigation.navigate('ReceitaCompleta', {
          nome, ingredientes, modoPreparo, rendimento, tempo_preparo, imagem
        })}>
          <Receita nome={nome} imagem={imagem}/>
        </TouchableOpacity>
      );
    });
  }

  return (
    <View style={styles.container}>
        <ScrollView>
          <View style={styles.row}>
            <View style={styles.col}>{mostrarReceitasColuna(0)}</View>
            <View style={styles.col}>{mostrarReceitasColuna(1)}</View>
          </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centralizado: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
  },
  item: {
    padding: 10,
  }
});
