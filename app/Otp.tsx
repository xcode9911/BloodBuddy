import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function Otp() {
  const router = useRouter();
  const { userType } = useLocalSearchParams();
  const [otp, setOtp] = useState<string[]>(new Array(5).fill(""));
  const [email, setEmail] = useState<string>("");
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("email");
        if (storedEmail && userType) {
          setEmail(storedEmail);
        } else {
          Alert.alert("Error", "User data not found. Please log in again.");
          router.push("/Registration");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to retrieve user data.");
      }
    };

    fetchStoredData();
  }, [userType]);

  const handleInputChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const verifyOtp = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 5) {
      Alert.alert("Error", "Please enter the complete 5-digit OTP.");
      return;
    }

    try {
      const response = await fetch("http://192.168.98.124:8000/api/users/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: otpCode,
          email,
          userType,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert("Success", "OTP verified successfully!");
        router.push("/");
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to verify OTP.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.bigCircle]} />
      <View style={[styles.circle, styles.mediumCircle]} />
      <View style={[styles.circle, styles.smallCircle]} />
      <View style={[styles.circle, styles.extraSmallCircle]} />

      <View style={styles.logoContainer}>
        <Image source={require("../assets/images/BloodbuddyLogo.png")} style={styles.logo} />
        <Text style={styles.title}>BloodBuddy</Text>
      </View>

      <Text style={styles.subtitle}>Check your Email !!</Text>
      <Text style={styles.infoText}>Please enter the 5 digit code to get verified.</Text>

      <View style={styles.pinContainer}>
        {Array.from({ length: 5 }, (_, index) => (
          <TextInput
            key={index}
            style={styles.pinInput}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
            value={otp[index]}
            onChangeText={(value) => handleInputChange(value, index)}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.otpButton} onPress={verifyOtp}>
        <Text style={styles.otpButtonText}>Verify OTP</Text>
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
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  pinInput: {
    width: 50,
    height: 50,
    borderColor: '#F8C8CE',
    borderWidth: 1,
    backgroundColor: '#F8C8CE',
    borderRadius: 5,
    marginHorizontal: 5,
    fontSize: 24,
    color: '#000',
  },
  otpButton: {
    width: '100%',
    backgroundColor: '#D11B31',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  otpButtonText: {
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
  extraSmallCircle: {
    width: 40,
    height: 40,
    bottom: 20,
    right: 10,
  },
});
