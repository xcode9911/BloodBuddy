import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function DonarDetails() {

  return (
    <View style={styles.container}>
      {/* Background circles */}
      <View style={[styles.circle, styles.bigCircle]} />
      <View style={[styles.circle, styles.mediumCircle]} />
      <View style={[styles.circle, styles.smallCircle]} />
    <view>
      <Image source={require('../assets/images/BloodbuddyLogo.png')} style={styles.logo} />
      <Text style={styles.subtitle}>Donar Details</Text>
      <Text style={styles.subtitle}>Donar Details</Text>
      <Text style={styles.subtitle}>Donar Details</Text>
      <Text style={styles.subtitle}>Donar Details</Text>
      <Text style={styles.subtitle}>Donar Details</Text>
    </view>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  circle: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: '#FF495F', 
  },
  bigCircle: {
    width: 300,
    height: 300,
    top: 20, 
    left: -220,
    borderRadius: 150,
  },
  mediumCircle: {
    width: 150,
    height: 150,
    top: 120,
    right: -75,
  },
  smallCircle: {
    width: 80,
    height: 80,
    bottom: 20,
    left: -40,
  },
});
