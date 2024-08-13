import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Dimensions,KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import axios from 'axios';
import { LINK_API } from '../AppConfig';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as Location from 'expo-location';

// import axios from 'axios';
const sendLocation = (data)=>{
    // const axios = require('axios');

// Définir les données sous forme d'objet JavaScript
const dataSend = JSON.stringify(data)

// Configurer les paramètres de la requête
const config = {
  method: 'post',
  url: `${LINK_API}/alert`, // Remplacez {{BASE_API}} par l'URL de votre API
  headers: {
    'Content-Type': 'application/json' // Assurez-vous que le serveur attend du JSON
  },
  data: dataSend // Envoyer les données comme un objet JavaScript
};

// Envoyer la requête
axios(config)
  .then(function (response) {
    console.log('Réponse du serveur:', JSON.stringify(response.data, null, 2));
  })
  .catch(function (error) {
    console.error('Erreur lors de l\'envoi de la requête:', error.response);
  });

}
export default function Profile() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [numberElect, setNumberElect] = useState('');
    const [urgency1, setUrgency1] = useState('');
    const [urgency2, setUrgency2] = useState('');
    const [addresse, setAddresse] = useState('');

    const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

    //   let location = await Location.getCurrentPositionAsync(
    //     {
    //         accuracy: Location.Accuracy.BestForNavigation,
    //         maximumAge: 100,
    //         timeout: 200,
    //       }
    //   );
    // let locations = await Location.watchPositionAsync(
    //     {accuracy:Location.Accuracy.BestForNavigation},
    //     (loc) => {console.log(loc)}
    //   );

    subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (newLocation) => {
            // console.log('Debug',newLocation);
          setLocation(newLocation);
          sendLocation({
            longitude: `${newLocation.coords.longitude}`,
            latitude: `${newLocation.coords.latitude}`,
            user_id: 4
        })
        latitude
: 
"-5.8413577000214230"
longitude
: 
"13.4479780094753070"
        }
      );
    //   location()
    //   setLocation(locations);
    })();
    return () => {
        if (subscription) {
          subscription.remove();
        }
      };
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log(location);
  }
  const hendeleeSetPosition = () => {
    setAddresse(location !== null ? location.coords.latitude+'|'+location.coords.longitude : '')
    navigation.navigate("Maps")
  }
   const navigation = useNavigation()
    const handleRegister = () => {
    
  
      const data = JSON.stringify({
        "name": name,
        "phone": phone,
        "card_id": numberElect,
        "num_urgence_1": urgency1,
        "num_urgence_2": urgency2,
        "user_id": 1
      });
      
  
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${LINK_API}/users/complete-profil`,
        headers: {},
        data: data
      };
  
      axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data));
          alert('Profil complete success ☺')
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
         
      <ScrollView style={styles.container} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image source={require('../assets/police.png')} style={styles.logo} />
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Le service d'urgence policière</Text>
            <Text style={styles.subtitle}>L'application d'alerte</Text>
            <Text style={styles.subtitle}>Alert Track </Text>
          </View>
        </View>
        <View style={styles.stars}>
          <Text style={[styles.star, {color: '#F7D618'}]}>★</Text>
          <Text style={[styles.star, {color: '#9E0000'}]}>★</Text>
          <Text style={[styles.star, {color: '#020A62'}]}>★</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.formTitle}>Complete profil</Text>
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
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input,{width:'80%'}]}
              placeholder="Adresse"
              placeholderTextColor="#aaaaaa"
              value={addresse}
              onChangeText={setAddresse}
            />
            <TouchableOpacity style={[styles.input,{width:'15%',justifyContent:'center',alignItems:'center',marginLeft:0}]} onPress={hendeleeSetPosition}>
            <FontAwesome5 name="map-marker-alt" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Numero d'urgence 1"
            placeholderTextColor="#aaaaaa"
            // secureTextEntry
            value={urgency1}
            onChangeText={setUrgency1}
            />
          <TextInput
            style={styles.input}
            placeholder="Numero d'urgence 2"
            placeholderTextColor="#aaaaaa"
            // secureTextEntry
            value={urgency2}
            onChangeText={setUrgency2}
          />
          <TouchableOpacity style={styles.button} onPress={()=>handleRegister()}>
            <Text style={styles.buttonText}>Valider</Text>
          </TouchableOpacity>
          {/* <Text style={styles.footer}>Cette application est un produit de la PNC</Text> */}
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
    // alignItems: 'center',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
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
