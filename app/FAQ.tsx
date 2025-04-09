import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function index() {
  return (
    <View style={styles.container}>
      {/* Big Circle */}
      <View style={[styles.circle, styles.bigCircle]} />
      <View style={styles.TitleContainer}>
        <Text style={styles.title}>FAQ</Text>
      </View>
      <View style={styles.divider} />
      
      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.TitleText}>1. What is BloodBuddy?</Text>
        <Text>
        BloodBuddy is a mobile application that connects blood donors with recipients in need of urgent blood transfusions.
        </Text>
        
        <Text style={styles.TitleText}>2. How do I register?</Text>
        <Text>
        To register, download the app and fill in your details, including your name, blood type, location, and contact number. You'll receive an OTP for verification.
        </Text>
        
        <Text style={styles.TitleText}>3. How can I find a blood donor?</Text>
        <Text>
        You can search for blood donors by filtering the options based on your location and the required blood type.
        </Text>
        
        <Text style={styles.TitleText}>4. Can I communicate with donors?</Text>
        <Text>
        Yes, our app features a chat function that allows real-time communication between users and donors.
        </Text>
        
        <Text style={styles.TitleText}>5. How do I delete my account?</Text>
        <Text>
        You can delete your account at any time through the app settings, which will ensure your information is removed from our database.
        </Text>
        <Text style={styles.TitleText}>6. Is my personal information secure?</Text>
        <Text>
        Yes, we implement various security measures to protect your personal information. However, no method of transmission or storage is completely secure.
        </Text>
        <Text style={styles.TitleText}>7. Can I use the app for someone else in need?</Text>
        <Text>
        Yes, normal users can search for blood donors on behalf of others who need blood.
        </Text>
        <View style={styles.logoContainer}>
        {/* Load the logo from the assets folder */}
        <Image source={require('../assets/images/BloodbuddyLogo.png')} style={styles.logo} />
        <Text style={styles.title}>BloodBuddy</Text>
      </View>
      </ScrollView>
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
  TitleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  TitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D11B31',
  },
  ImportantText:{
    fontWeight: 'bold',
    color: '#D11B31',
  },
  divider: {
    height: 1,
    backgroundColor: '#D11B31',
    marginTop: -10,
  },
  logo: {
    marginLeft: 160,
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D11B31',
  },
  circle: {
    position: 'absolute',
    borderRadius: 150,
    backgroundColor: '#FF495F',
  },
  bigCircle: {
    width: 300,
    height: 300,
    bottom: -180,
    right: -180,
  },
  scrollContainer: {
    padding: 20, 
  },
});
