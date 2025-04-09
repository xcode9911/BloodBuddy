import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { userType } = useLocalSearchParams();

  if (!userType) {
    Alert.alert('Error', 'User type is missing. Please select Donor or Gainer.');
    return null;
  }

  const subtitle = userType === 'Donor' ? 'Donor Login' : 'Gainer Login';

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://192.168.98.124:8000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token in AsyncStorage
        await AsyncStorage.setItem('userToken', data.token);
        router.push('/ChatList');
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while logging in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.bigCircle]} />
      <View style={[styles.circle, styles.mediumCircle]} />
      <View style={[styles.circle, styles.smallCircle]} />
      
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/BloodbuddyLogo.png')} style={styles.logo} />
        <Text style={styles.title}>BloodBuddy</Text>
      </View>

      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.infoText}>Enter your credentials to get logged in as a {userType}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your email" 
          placeholderTextColor="#000" 
          value={email} 
          onChangeText={setEmail} 
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your password" 
          secureTextEntry 
          placeholderTextColor="#000" 
          value={password} 
          onChangeText={setPassword} 
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Login</Text>}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D11B31',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#7C7C7C',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  input: {
    height: 43,
    borderColor: '#F8C8CE',
    backgroundColor: '#F8C8CE',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#D11B31',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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