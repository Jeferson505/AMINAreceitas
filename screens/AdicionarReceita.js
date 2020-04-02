import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, ToastAndroid, Button } from 'react-native';

import { Entypo } from '@expo/vector-icons';

import * as DocumentPicker from 'expo-document-picker';
import { TextInput } from 'react-native-gesture-handler';

export default class AdicionarReceita extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            uriImagem: 'https://media.istockphoto.com/vectors/black-linear-photo-camera-like-no-image-available-vector-id1055079680',
            nomeReceita: '',
            ingredientes: [''],
            modoPreparo: '',
            linkYoutube: '',
            rendimeno: '',
            tempoPreparo: '',
        }
        this.selecionarImagem = this.selecionarImagem.bind(this);
        this.mostrarIgredientes = this.mostrarIgredientes.bind(this);
        this.adicionarIngredientes = this.adicionarIngredientes.bind(this);
        this.removerIngredientes = this.removerIngredientes.bind(this);
    }

    selecionarImagem(){
        DocumentPicker.getDocumentAsync({type: 'image/*', copyToCacheDirectory:false })
            .then((res) => res.uri != undefined ? this.setState({uriImagem: res.uri}) : null);
    }

    mostrarIgredientes(){
        let { ingredientes } = this.state;
        return ingredientes.map((ingrediente, key) => {
            return (
                <View style={styles.listaIngredientes}>
                    <View style={styles.itemIngrediente}>
                        <TextInput key={key} style={styles.input} onChangeText={(texto) => this.alterarIngrediente(texto, key)} value={ingrediente}/>
                    </View>

                    <TouchableOpacity onPress={() => this.removerIngredientes(key)} style={styles.itemRemover}>
                        <Entypo
                            size={20}
                            name="trash"
                            color='red'
                        />
                    </TouchableOpacity>
                </View>
            );
        });
    }

    adicionarIngredientes(){
        let { ingredientes } = this.state;
        ingredientes.push('');
        this.setState({ingredientes});
    }

    removerIngredientes(key){
        let { ingredientes } = this.state;
        ingredientes.length > 1 ? ingredientes.splice(key, 1) : ToastAndroid.show("É necessário ao menos 1 ingrediente.", ToastAndroid.SHORT);
        this.setState({ingredientes});
    }

    alterarIngrediente(texto, key){
        let { ingredientes } = this.state;
        ingredientes[key] = texto;
        this.setState({ingredientes});
    }

  render(){
    return (
      <View style={styles.container}>
          <ScrollView>

            <TouchableOpacity onPress={() => this.selecionarImagem()}>
                <Image source={{uri: this.state.uriImagem}} style={styles.imagemReceita}/>
            </TouchableOpacity>

            <Text style={styles.texto}>* Nome da Receita:</Text>
            <TextInput style={styles.input} value={this.state.nomeReceita} onChangeText={(nomeReceita) => this.setState({nomeReceita})}/>

            <Text style={styles.texto}>* Ingredientes:</Text>
            
            {this.mostrarIgredientes()}
            

            <TouchableOpacity onPress={() => this.adicionarIngredientes()} style={styles.botaoAdicionarIngredientes}>
                <Entypo
                    size={32}
                    name="plus"
                    color='red'
                />
            </TouchableOpacity>

            <Text style={styles.texto}>* Modo de Preparo:</Text>
            <TextInput multiline textAlignVertical="top" numberOfLines={10} style={styles.input} value={this.state.modoPreparo} onChangeText={(modoPreparo) => this.setState({modoPreparo})}/>

            <Text style={styles.texto}>Link para vídeo no YouTube:</Text>
            <TextInput style={styles.input} value={this.state.linkYoutube} onChangeText={(linkYoutube) => this.setState({linkYoutube})}/>

            <View style={styles.detalhesReceita}>
                <View style={styles.col}>
                    <Text style={styles.texto}>* Rendimento:</Text>
                    <TextInput placeholder="Ex.: 12 Porções" style={styles.inputDetalhesReceita} value={this.state.rendimeno} onChangeText={(rendimeno) => this.setState({rendimeno})}/>
                </View>

                <View style={styles.col}>
                    <Text style={styles.texto}>* Tempo de Preparo:</Text>
                    <TextInput placeholder="Ex.: 1hora e 40 minutos" style={styles.inputDetalhesReceita} value={this.state.tempoPreparo} onChangeText={(tempoPreparo) => this.setState({tempoPreparo})}/>
                </View>
            </View>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: '5%',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  texto: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    color: 'white',
    padding: 5,
    marginBottom: 5,
    backgroundColor: '#E91E63',
    borderRadius: 10,
  },
  inputDetalhesReceita: {
    padding: 5,
    backgroundColor: '#E91E63',
    borderRadius: 10,
    width: '80%',
    textAlign: 'center',
  },
  listaIngredientes: {
    flexDirection: 'row',
  },
  itemIngrediente: {
    flex: 4,
  },
  itemRemover: {
    marginLeft: 5,
    marginBottom: 5,
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#FFC107',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoAdicionarIngredientes: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFC107',
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detalhesReceita: {
    flexDirection: 'row',
  },
  imagemReceita: {
    borderWidth: 5,
    borderColor: '#E91E63',
    marginTop: 10,
    borderRadius: 10,
    alignSelf: 'center',
    width: '100%',
    height: 200,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  }
});
