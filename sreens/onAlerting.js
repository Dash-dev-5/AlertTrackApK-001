import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Dimensions,KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import axios from 'axios';
import { LINK_API } from '../AppConfig';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from './moment';
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
export default function OnAlert() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [numberElect, setNumberElect] = useState('');
    const [urgency1, setUrgency1] = useState('');
    const [urgency2, setUrgency2] = useState('');
    const [addresse, setAddresse] = useState('');
    const [date, setDate] = useState(new Date());
    const [user,setUser] = React.useState(null)
    const handleAlert = () =>{
        navigation.replace('TabsHome')
    }
    const getData = async (key) => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
      //   const jsonValueObjet = JSON.parse(jsonValue)
      //   console.log('Debug'+jsonValue);
        setUser(jsonValue)
      } catch (e) {
        // error reading value
        console.error(e);
        alert('erreur stockage get')

      }
    };
    getData('Users')
   
  console.log('Debut'+user);
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
              user_id: user !== null ? JSON.parse(user).user.id : 4
          })
        
 
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
        "user_id": JSON.parse(user).user.id
      });
      
  
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${LINK_API}/users/complete-profil`,
        headers: {
          'Accept': 'application/json',
          'Authorization':'Bearer '+JSON.parse(user).access_token,
          "content-type": "application/json"
        },
        data: data
      };
  
      axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data));
          alert('Profil complete success ☺')
          navigation.replace('Home')
          
        })
        .catch(error => {
            console.log(error.response);
            alert("Une erreur s'est produit \n Verifier vos données \n 8 Character dans le mot de passe ☺")
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
          <Text style={styles.alertText}>{user && JSON.parse(user).user.name}</Text>
          <Text style={styles.alertText}>{user && JSON.parse(user).user.email}</Text>
        <View style={styles.body}>
          <TouchableOpacity style={styles.alertButton}
            onPress={handleAlert}
          >
            <Image source={require('../assets/alert.png')} style={styles.alertIcon} />
          </TouchableOpacity>
          <Text style={styles.alertText}>Alerte lancée {moment(date).fromNow()}</Text>
        </View>
      </View>
    );
  }



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
    backgroundColor: 'red',
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
