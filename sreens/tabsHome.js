import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './homeScreen';
import Profile from './profile';
function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function TabsHome() {
  return (
    
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Text style={{backgroundColor : focused ? '#020A62' : 'transparent', borderRadius:15,marginTop:6,overflow:'hidden',paddingHorizontal:35,paddingVertical:12}}>
                <Ionicons icons name={iconName} size={size} color={color} />;
            </Text>
              
          },
          tabBarStyle: { backgroundColor:'#0039A5' },
          tabBarActiveTintColor : '#fff',
          tabBarInactiveTintColor : 'lightgrey',
          tabBarShowLabel:false,
          headerShown:false
        //   tabBarActiveBackgroundColor :'#020A62'
        })}
       
        
        
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
 
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
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  logo: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'contain',
  },
  headerTextContainer: {
    alignItems: 'center',
    marginTop: 10,
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
