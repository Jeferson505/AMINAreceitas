import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, ToastAndroid, Picker, ActivityIndicator } from 'react-native';

import { Entypo } from '@expo/vector-icons';

import * as DocumentPicker from 'expo-document-picker';
import { TextInput } from 'react-native-gesture-handler';

import * as firebase from 'firebase/app';
import 'firebase/storage';

export default class AdicionarReceita extends React.Component {

  constructor(props){
      super(props);
      this.state = {
          nomeImagem: '',
          uriImagem: 'https://media.istockphoto.com/vectors/black-linear-photo-camera-like-no-image-available-vector-id1055079680',
          nome: '',
          ingredientes: [''],
          modoPreparo: '',
          linkYoutube: '',
          rendimento: '',
          tempo_preparo: '',
          categoria: '1',
      }
      this.selecionarImagem = this.selecionarImagem.bind(this);
      this.mostrarIgredientes = this.mostrarIgredientes.bind(this);
      this.adicionarIngredientes = this.adicionarIngredientes.bind(this);
      this.removerIngredientes = this.removerIngredientes.bind(this);
      this.salvarReceita = this.salvarReceita.bind(this);
  }

  selecionarImagem(){
      DocumentPicker.getDocumentAsync({type: 'image/*', copyToCacheDirectory:false })
          .then((res) => res.uri != undefined ? this.setState({uriImagem: res.uri, nomeImagem: res.name}) : null);
  }

  mostrarIgredientes(){
      let { ingredientes } = this.state;
      return ingredientes.map((ingrediente, key) => {
          return (
              <View key={key} style={styles.listaIngredientes}>
                  <View style={styles.itemIngrediente}>
                      <TextInput style={styles.input} onChangeText={(texto) => this.alterarIngrediente(texto, key)} value={ingrediente}/>
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

  async salvarReceita(){
    let { nomeImagem } = this.state;
    let { uriImagem } = this.state;
    let { nome } = this.state;
    let { categoria } = this.state;
    let { ingredientes } = this.state;
    let { modoPreparo } = this.state;
    let { linkYoutube } = this.state;
    let { rendimento } = this.state;
    let { tempo_preparo } = this.state;

    if( nomeImagem === '' ) return ToastAndroid.show("Insira a imagem da receita.", ToastAndroid.SHORT);
    if( nome === '' ) return ToastAndroid.show("Preencha o nome da receita corretamente.", ToastAndroid.SHORT);
    if( ingredientes[0] === '' ) return ToastAndroid.show("Preencha os ingredientes corretamente.", ToastAndroid.SHORT);
    if( modoPreparo === '' ) return ToastAndroid.show("Preencha o modo de preparo corretamente.", ToastAndroid.SHORT);
    if( rendimento === '' ) return ToastAndroid.show("Preencha o rendimento corretamente.", ToastAndroid.SHORT);
    if( tempo_preparo === '' ) return ToastAndroid.show("Preencha o tempo de preparo corretamente.", ToastAndroid.SHORT);

    let url = nomeImagem;

    let receita = {
      url,
      nome,
      categoria,
      ingredientes,
      modoPreparo,
      linkYoutube,
      rendimento,
      tempo_preparo,
    };

    const response = await fetch(uriImagem);
    const file = await response.blob();

    firebase.storage().ref(url).put(file);

    firebase.database().ref("Receitas/").child(nome).set(receita)
      .then((res) => {
        this.setState({url: '', uriImagem: 'https://media.istockphoto.com/vectors/black-linear-photo-camera-like-no-image-available-vector-id1055079680', nome: '', ingredientes: [''], modoPreparo: '', linkYoutube: '', rendimento: '', tempo_preparo: ''});
        ToastAndroid.show("Receita adicionada com sucesso.", ToastAndroid.SHORT);
      });
  }

  render(){

    return (
      <View style={styles.container}>
          <ScrollView>

            <TouchableOpacity onPress={() => this.selecionarImagem()}>
                <Image source={{uri: this.state.uriImagem}} style={styles.imagemReceita}/>
            </TouchableOpacity>

            <Text style={styles.texto}>* Nome da Receita:</Text>
            <TextInput style={styles.input} value={this.state.nome} onChangeText={(nome) => this.setState({nome})}/>

            <Text style={styles.texto}>* Categoria:</Text>
            <Picker
              selectedValue={this.state.categoria}
              onValueChange={(categoria, itemIndex) => this.setState({categoria})}>
              <Picker.Item label="Carnes" value="3" />
              <Picker.Item label="Doces" value="7" />
              <Picker.Item label="Peixes" value="4" />
              <Picker.Item label="Petiscos" value="8" />
              <Picker.Item label="Pratos Principais" value="1" />
              <Picker.Item label="Sopas" value="2" />
              <Picker.Item label="Tortas" value="6" />
            </Picker>

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
                    <TextInput placeholder="Ex.: 12 Porções" style={styles.inputDetalhesReceita} value={this.state.rendimento} onChangeText={(rendimento) => this.setState({rendimento})}/>
                </View>

                <View style={styles.col}>
                    <Text style={styles.texto}>* Tempo de Preparo:</Text>
                    <TextInput placeholder="Ex.: 1hora e 40 minutos" style={styles.inputDetalhesReceita} value={this.state.tempo_preparo} onChangeText={(tempo_preparo) => this.setState({tempo_preparo})}/>
                </View>
            </View>

            <TouchableOpacity onPress={() => this.salvarReceita()} style={styles.botaoSalvarReceitas}>
                <Entypo
                    size={32}
                    name="save"
                    color='red'
                />
            </TouchableOpacity>
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
    color: 'white',
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
  botaoSalvarReceitas: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC107',
    margin: 20,
    padding: 10,
    borderRadius: 10,
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
