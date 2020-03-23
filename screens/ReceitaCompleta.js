import React from 'react';
import { StyleSheet, View, Image, ScrollView, Text } from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';

export default function ReceitaCompleta(props) {
  
  const nomeReceita = props.navigation.getParam("nome");
  let tituloReceita = '';
  
  if(nomeReceita.length > 21){
    for(let i = 0; i < 21; i++){
      tituloReceita += nomeReceita[i];
    }
    tituloReceita += '...';
  }else{
    tituloReceita = nomeReceita;
  }

  const ingredientes = props.navigation.getParam("ingredientes");
  const modoPreparo = props.navigation.getParam("modoPreparo");
  const rendimento = props.navigation.getParam("rendimento");
  const tempo_preparo = props.navigation.getParam("tempo_preparo");
  const imagem = props.navigation.getParam("imagem");

  ReceitaCompleta.navigationOptions = {
    title: tituloReceita,
    headerStyle: {
      backgroundColor: '#E91E63',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white',
  }

  return (
    <View style={styles.container}>
        <Image source={{uri: "https://firebasestorage.googleapis.com/v0/b/receitas-pantaneiras.appspot.com/o/"+imagem+"?alt=media&"}}
             style={{width: '100%', height: 150, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}/>

        <ScrollView style={styles.infoReceita}>
            <Text style={styles.negrito}>Ingredientes:</Text>
            <Text style={styles.detalhes}>{ingredientes}</Text>

            <Text style={styles.negrito}>Modo de Preparo:</Text>
            <Text style={styles.detalhes}>{modoPreparo}</Text>
        </ScrollView>

        <View style={styles.detalhesReceita}>
          <View style={styles.divisao}>
            <AntDesign name="piechart" size={20} color='white'/>
            <Text style={styles.textDetalhesReceita}>{rendimento}</Text>
          </View>

          <View style={styles.divisao}>
            <Entypo name="time-slot" size={20} color='white'/>
            <Text style={styles.textDetalhesReceita}>{tempo_preparo}</Text>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titulo: {
    backgroundColor: '#00cccc',
  },
  textTitulo: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoReceita: {
    padding: 10,
  },
  negrito: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#757575',
  },
  detalhes: {
    textAlign: 'justify',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    color: '#757575',
  },
  detalhesReceita: {
    flexDirection: 'row',
    backgroundColor: '#E91E63',
    padding: 5,
  },
  divisao: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDetalhesReceita: {
    color: 'white',
    fontWeight: 'bold',
  }
});
