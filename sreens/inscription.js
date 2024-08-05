import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Dimensions,KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import axios from 'axios';
import { LINK_API } from '../AppConfig';
import { useNavigation } from '@react-navigation/native';

export default function Inscription() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [numberElect, setNumberElect] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
   const navigation = useNavigation()
    const handleRegister = () => {
      if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas");
        return;
      }
  
      const data = {
        "email": numberElect+'@gmail.com',
        "name": name,
        "password": password,
        "account_type_id": 1,
        "sexe": "m",
        "phone": phone
      };
  
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${LINK_API}/register`,
        headers: {},
        data: data
      };
  
      axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data));
          alert('Inscription success ☺')
          navigation.replace('Connexion')
          
        })
        .catch(error => {
            console.log(error.response);
            alert("Une erreur s'est produit \n Verifier vos données \n 8 Character dans le mot de passe ☺")
        });
    };
  
    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

      <ScrollView style={styles.container}>
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
          <Text style={styles.formTitle}>Inscription</Text>
          <TextInput
            style={styles.input}
            placeholder="Nom complet"
            placeholderTextColor="#aaaaaa"
            value={name}
            onChangeText={setName}
          />
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
            placeholder="Numéro carte d'electeur"
            placeholderTextColor="#aaaaaa"
            keyboardType="numeric"
            value={numberElect}
            onChangeText={setNumberElect}
            />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            />
          <TextInput
            style={styles.input}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
          <Text style={styles.footer}>Cette application est un produit de la PNC</Text>
        </View>
      </ScrollView>
            </KeyboardAvoidingView>
    );
  }
  

const { width, height } = Dimensions.get('window');

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
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'contain',
  },
  headerTextContainer: {
    alignItems: 'flex-start',
    marginLeft: width * 0.03
    // justifyContent:'center',
    // marginTop: 10,
    // backgroundColor:'yellow'
  },
  title: {
    fontSize: width * 0.04,
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
    marginHorizontal: 10,
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
    marginBottom: height * 0.02,
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
    fontSize: width * 0.05,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    bottom: height * 0.02,
    color: '#fff',
    fontSize: width * 0.035,
  },
});
