import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';

import iconeCarne from '../assets/categorias/beef.png';
import iconePeixe from '../assets/categorias/clown-fish.png';
import iconePetiscos from '../assets/categorias/taco.png';
import iconePrato from '../assets/categorias/plate.png';
import iconeSobremesa from '../assets/categorias/ice-cream.png';
import iconeSopa from '../assets/categorias/ramen.png';
import iconeTorta from '../assets/categorias/cake.png';

import * as firebase from 'firebase/app';
import 'firebase/database';

let db = firebase.database();

export default class Categorias extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            receitas: [],
        }

        this.getReceitas = this.getReceitas.bind(this);
        this.buscaReceitasPorCategoria = this.buscaReceitasPorCategoria.bind(this);
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

    buscaReceitasPorCategoria(categoria, nomeCategoria){
        let todaReceitas = this.state.receitas;

        let receitasCategoriaSelecionada = todaReceitas.filter((receita) => receita.categoria == categoria);
        this.props.navigation.navigate('Categoria', {receitas: receitasCategoriaSelecionada, nomeCategoria})
    }

    render(){
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.row}>

                        <TouchableOpacity style={styles.contornoCategoria} onPress={() => this.buscaReceitasPorCategoria(3, 'Carnes')}>
                            <View style={styles.categoria}>
                                <Image source={iconeCarne}/>
                            </View>
                            <Text style={styles.negrito}>Carnes</Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.contornoCategoria} onPress={() => this.buscaReceitasPorCategoria(4, 'Peixes')}>
                            <View style={styles.categoria}>
                                <Image source={iconePeixe}/>
                            </View>
                            <Text style={styles.negrito}>Peixes</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity style={styles.contornoCategoria} onPress={() => this.buscaReceitasPorCategoria(8, 'Petiscos')}>
                            <View style={styles.categoria}>
                                <Image source={iconePetiscos}/>
                            </View>
                            <Text style={styles.negrito}>Petiscos</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.contornoCategoria} onPress={() => this.buscaReceitasPorCategoria(1, 'Pratos Principais')}>
                            <View style={styles.categoria}>
                                <Image source={iconePrato}/>
                            </View>
                            <Text style={styles.negrito}>Pratos principais</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity style={styles.contornoCategoria} onPress={() => this.buscaReceitasPorCategoria(7, 'Sobremesas')}>
                            <View style={styles.categoria}>
                                <Image source={iconeSobremesa}/>
                            </View>
                            <Text style={styles.negrito}>Sobremesas</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.contornoCategoria} onPress={() => this.buscaReceitasPorCategoria(2, 'Sopas')}>
                            <View style={styles.categoria}>
                                <Image source={iconeSopa}/>
                            </View>
                            <Text style={styles.negrito}>Sopas</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.contornoCategoria} onPress={() => this.buscaReceitasPorCategoria(6, 'Tortas')}>
                            <View style={styles.categoria}>
                                <Image source={iconeTorta}/>
                            </View>
                        <Text style={styles.negrito}>Tortas</Text>
                    </TouchableOpacity>
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
  row: {
    flexDirection: 'row',
  },
  contornoCategoria: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  categoria: {
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC107',
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  negrito: {
    fontWeight: 'bold',
  }
});
