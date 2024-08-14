import React,{useState} from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LINK_API } from '../AppConfig';
import * as Location from 'expo-location';
import axios from 'axios';
const sendLocation = (data)=>{
    // const axios = require('axios');

// Définir les données sous forme d'objet JavaScript
// const data = {
//   longitude: 80,
//   latitude: 100,
//   user_id: 1
// };

// Configurer les paramètres de la requête
const config = {
  method: 'post',
  url: `${LINK_API}/alert`, // Remplacez {{BASE_API}} par l'URL de votre API
  headers: {
    'Content-Type': 'application/json' // Assurez-vous que le serveur attend du JSON
  },
  data: data // Envoyer les données comme un objet JavaScript
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


function HomeScreen() {
    const [user,setUser] = React.useState(null)
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [tracking, setTracking] = useState(false); // State to control tracking
    const [subscription, setSubscription] = useState(null); 
    const navigation = useNavigation()
    const handleAlert = async ()=>{
      navigation.navigate('OnAlert')
    }

    const getData = async (key) => {
        try {
          const jsonValue = await AsyncStorage.getItem(key);
        //   const jsonValueObjet = JSON.parse(jsonValue)
        //   console.log('Debug'+jsonValue);
          setUser(jsonValue);
        } catch (e) {
          // error reading value
          console.error(e);
          alert('erreur stockage get')

        }
      };
    getData('Users')
    console.log(user);
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
          <Text style={styles.alertText}>{user && JSON.parse(user).user.name}</Text>
          <Text style={styles.alertText}>{user && JSON.parse(user).user.email}</Text>
        <View style={styles.body}>
          <TouchableOpacity style={styles.alertButton}
            onPress={handleAlert}
          >
            <Image source={require('../assets/alert.png')} style={styles.alertIcon} />
          </TouchableOpacity>
          <Text style={styles.alertText}>Alerter la police</Text>
        </View>
      </View>
    );
  }

  export default HomeScreen

  const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
    // paddingRight: 12
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
    color: '#0057B8',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: width * 0.04,
    color: '#0057B8',
    textAlign: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003E78',
    borderRadius: width * 0.5,
    width: width * 0.5,
    height: width * 0.5,
  },
  alertIcon: {
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: 'contain',
  },
  alertText: {
    marginTop: 10,
    fontSize: width * 0.05,
    color: '#0057B8',
    textAlign: 'center',
  },
});
