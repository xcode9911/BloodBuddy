import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function index() {
  return (
    <View style={styles.container}>
      {/* Big Circle */}
      <View style={[styles.circle, styles.bigCircle]} />
      <View style={styles.TitleContainer}>
        <Text style={styles.title}>Privacy Policy</Text>
      </View>
      <View style={styles.divider} />
      
      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text>
          Your privacy is important to us at BloodBuddy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. By using BloodBuddy, you agree to the collection and use of information in accordance with this policy.
        </Text>
        
        <Text style={styles.TitleText}>Information We Collect</Text>
        <Text>
          - <Text style={styles.ImportantText}>Personal Information: </Text>When you register on our app, we may collect personal details such as your name, blood type, location, and contact number.{'\n'}
          - <Text style={styles.ImportantText}>User Credentials: </Text>We collect email addresses and passwords to secure user accounts.{'\n'}
          - <Text style={styles.ImportantText}>Usage Data: </Text>We may collect information on how the app is accessed and used, including your device's Internet Protocol (IP) address, browser type, and timestamps.
        </Text>
        
        <Text style={styles.TitleText}>How We Use Your Information?</Text>
        <Text>
          We use the information we collect in the following ways:
          {'\n'}
          - To facilitate user registration and account management.{'\n'}
          - To connect donors with recipients efficiently.{'\n'}
          - To communicate with users regarding updates, promotions, and relevant information.{'\n'}
          - To enhance the functionality and user experience of our app.
        </Text>
        
        <Text style={styles.TitleText}>Disclosure of Your Information</Text>
        <Text>
          We do not sell, trade, or otherwise transfer your personal information to outside parties except to comply with the law, protect our rights, or ensure the safety of our users.
        </Text>
        
        <Text style={styles.TitleText}>Data Security</Text>
        <Text>
          We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.
        </Text>
        
        <Text style={styles.TitleText}>User Rights</Text>
        <Text>
          - <Text style={styles.ImportantText}>Account Management: </Text>Users can access, update, or delete their personal information within the app settings.{'\n'}
          - <Text style={styles.ImportantText}>Account Deletion: </Text>Users can delete their accounts at any time, which will remove their personal information from our database.
        </Text>
        
        <Text>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
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
