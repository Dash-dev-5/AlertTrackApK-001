import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function Splash() {
    const navigation = useNavigation()
    setTimeout( async() => {
            // AsyncStorage.clear()
            try {
              const jsonValue = await AsyncStorage.getItem('Users');
            //   const jsonValueObjet = JSON.parse(jsonValue)
            //   console.log('Debug'+jsonValue);
             if (jsonValue !== null){

                 navigation.replace('TabsHome')
             }else{

                 navigation.replace('Connexion')
             }

            } catch (e) {
              // error reading value
              console.error(e);
              alert('erreur stockage get')
            }
     
    }, 3000);
  return (
    <View style={styles.container}>
      <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>
        <Image source={require('../assets/police.png')} style={styles.image} />                           
      </Animatable.Text>
      <Text style={styles.title}>Alert Track</Text>
      <Text style={styles.footer}>Cette application est un produit de la PNC</Text>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0057B8',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%'
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: 'contain',
    marginBottom: height * 0.05,
  },
  title: {
    fontSize: width * 0.08,
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: height * 0.05,
    color: '#fff',
    fontSize: width * 0.04,
  },
});
