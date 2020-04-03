import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';

import Receita from './Receita';

import { firebaseConfig } from '../firebase/Config';
import * as firebase from 'firebase/app';
import 'firebase/database';

firebase.initializeApp(firebaseConfig);
let db = firebase.database();

export default class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      receitas: [],
    }
    this.getReceitas = this.getReceitas.bind(this);
    this.mostrarReceitasColuna = this.mostrarReceitasColuna.bind(this);
  }

  componentDidMount(){
    this.getReceitas();
    this.render();
  }

  async getReceitas() {
    await db.ref('Receitas/').once('value').then(
      (snapshot) => {
        let receitas = [];
        snapshot.forEach((receita) => {
          receitas.push(receita.val());
        });
        this.setState({receitas});
      }
    );
  }

  mostrarReceitasColuna(i){
    let todasReceitas = this.state.receitas;
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
      let linkYoutube = receita.linkYoutube;
      return(
        <TouchableOpacity key={key} style={styles.item} onPress={() => this.props.navigation.navigate('ReceitaCompleta', {
          nome, ingredientes, modoPreparo, rendimento, tempo_preparo, imagem, linkYoutube
        })}>
          <Receita nome={nome} imagem={imagem}/>
        </TouchableOpacity>
      );
    });
  }

  render(){
    return (
      <View style={styles.container}>
          <ScrollView>
            <View style={styles.row}>
              <View style={styles.col}>{this.mostrarReceitasColuna(0)}</View>
              <View style={styles.col}>{this.mostrarReceitasColuna(1)}</View>
            </View>
          </ScrollView>
      </View>
    );
  }
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
