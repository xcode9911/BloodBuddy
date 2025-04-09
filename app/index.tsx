import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router, useRouter } from 'expo-router'; 

const handleUserReg = (userType: 'Donor' | 'Gainer') => {
  router.push({ pathname: '/Registration', params: { userType } });
};

export default function index() {
  return (
    <View style={styles.container}>
      {/* Big Circle */}
      <View style={[styles.circle, styles.bigCircle]} />
      {/* Medium Circle */}
      <View style={[styles.circle, styles.mediumCircle]} />
      {/* Small Circle */}
      <View style={[styles.circle, styles.smallCircle]} />
      {/* Extra Small Circle */}
      <View style={[styles.circle, styles.extraSmallCircle]} />
      <View style={styles.logoContainer}>
        {/* Load the logo from the assets folder */}
        <Image source={require('../assets/images/BloodbuddyLogo.png')} style={styles.logo} />
        <Text style={styles.title}>BloodBuddy</Text>
      </View>
      <Text style={styles.subtitle}>What you are ?</Text>
      <Text style={styles.infoText}>Please select your requirement</Text>

      {/* Use the router.push method to navigate to the DonorRegistration page */}
      <TouchableOpacity style={styles.button} onPress={() => handleUserReg('Donor')}>
        <Image source={require('../assets/images/BloodbuddyLogo.png')} style={styles.logo} />
        <Text style={styles.buttonText}>Donor</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleUserReg('Gainer')}>
        <Image source={require('../assets/images/BloodbuddyLogo.png')} style={styles.logo} />
        <Text style={styles.buttonText}>Gainer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D11B31',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#7C7C7C',
    marginBottom: 20,
    width: 250,
    textAlign: 'center',
  },
  button: {
    width: 200,
    height: 200,
    padding: 15,
    backgroundColor: '#F8C8CE',
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#D11B31',
    fontWeight: 'bold',
    fontSize: 29,
  },
  circle: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: '#FF495F', 
  },
  bigCircle: {
    width: 300,
    height: 300,
    top: 50, 
    left: -220,
    borderRadius: 800,
  },
  mediumCircle: {
    width: 150,
    height: 150,
    top: 100,
    right: -100,
  },
  smallCircle: {
    width: 80,
    height: 80,
    bottom: 50,
    left: -50,
  },
  extraSmallCircle: {
    width: 40,
    height: 40,
    bottom: 20,
    right: 10,
  },
});