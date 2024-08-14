import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { LINK_API } from '../AppConfig';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function Connexion() {
    const [phone, setPhone] = useState('0000');
    const [password, setPassword] = useState('00000000');
   const navigation =  useNavigation()
   const storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      alert('enregistre')
    } catch (e) {
      // saving error
      console.log(e);
      alert('erreur de stockage')
    }
  };
    const handleLogin = () => {
      const data = {
        "email": phone+'@gmail.com',
        "password": password
      };
  
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${LINK_API}/login`,
        headers: {},
        data: data
      };
  
      axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data));
          storeData('Users',response.data)
          alert('Bienvenu '+response.data.user.name)
          navigation.replace('TabsHome')
        })
        .catch(error => {
          console.log(error);
        });
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/police.png')} style={styles.logo} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Le service d'urgence policière</Text>
            <Text style={styles.subtitle}>L'application d'alerte</Text>
            <Text style={styles.subtitle}>Alert Track</Text>
          </View>
        </View>
        <View style={styles.stars}>
          <Text style={[styles.star, {color: '#F7D618'}]}>★</Text>
          <Text style={[styles.star, {color: '#9E0000'}]}>★</Text>
          <Text style={[styles.star, {color: '#020A62'}]}>★</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.formTitle}>Connexion</Text>
          <TextInput
            style={styles.input}
            placeholder="Numéro de téléphone"
            placeholderTextColor="#aaaaaa"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={()=>{
                navigation.navigate('Inscription')
            }}
          >
            <Text style={styles.forgotPassword}>Mot de passe oublié</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{
                navigation.navigate('Inscription')
            }}
          >
            <Text style={styles.forgotPassword}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footer}>Cette application est un produit de la PNC</Text>
      </View>
    );
  }
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width:width,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
   // alignItems: 'center',
   marginTop: height * 0.07,
   flexDirection:'row',
   justifyContent:'flex-start',
   width:width,
   paddingHorizontal:15,
   // backgroundColor:'red'
  },
  logo: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: 'contain',
    marginBottom: height * 0.02,
  },
  headerTextContainer: {
    alignItems: 'flex-start',
    marginLeft: width * 0.03
    // justifyContent:'center',
    // marginTop: 10,
    // backgroundColor:'yellow'
  },
  title: {
    fontSize: width * 0.05,
    color: '#020A62',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: width * 0.04,
    color: '#020A62',
    textAlign: 'center',
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: height * 0.02,
  },
  star: {
    fontSize: width * 0.08,
    marginHorizontal: width * 0.02,
  },
  form: {
    width: width,
    backgroundColor: '#0039A5',
    borderTopLeftRadius : width * 0.08,
    borderTopRightRadius : width * 0.08,
    padding: 20,
    alignItems: 'center',
    flex:1
  },
  formTitle: {
    fontSize: width * 0.06,
    color: '#fff',
    marginBottom: height * 0.03,
  },
  input: {
    width: '100%',
    height: height * 0.06,
    backgroundColor: '#020A62',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: '#fff',
  },
  forgotPassword: {
    color: 'yellow',
    marginVertical: height * 0.02,
    alignSelf:'flex-end',
    textAlign:'right'
  },
  button: {
    width: '80%',
    backgroundColor: '#020A62',
    borderRadius: 5,
    padding: 16,
    alignItems: 'center',
    marginVertical: 20,
    borderRadius:12
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
  },
  footer: {
    position: 'absolute',
    bottom: height * 0.02,
    color: '#fff',
    fontSize: width * 0.035,
  },
});
